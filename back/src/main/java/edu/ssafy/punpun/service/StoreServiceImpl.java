package edu.ssafy.punpun.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import com.nimbusds.jose.shaded.json.JSONObject;
import edu.ssafy.punpun.dto.request.StoreDetailRequestDTO;
import edu.ssafy.punpun.dto.response.MenuChildResponseDTO;
import edu.ssafy.punpun.dto.response.StoreDistResponseDTO;
import edu.ssafy.punpun.entity.*;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.exception.NotDeleteEntityException;
import edu.ssafy.punpun.exception.NotStoreOwnerException;
import edu.ssafy.punpun.exception.SearchStoreException;
import edu.ssafy.punpun.repository.*;
import edu.ssafy.punpun.s3.S3Uploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreRepository storeRepository;
    private final MenuRepository menuRepository;
    private final FavoriteMenuRepository favoriteMenuRepository;
    private final ImageRepository imageRepository;
    private final S3Uploader s3Uploader;
    private final MemberRepository memberRepository;
    private static final int CHILD_DISTANCE_RADIUS = 300;

    @Override
    public Store findById(Long id) {
        return storeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 가게 입니다."));
    }

    public List<MenuChildResponseDTO> getStoreDetailChild(Store store, Child child) {
        // TODO : 추후 변경 예정
        return menuRepository.findByStore(store).stream()
                .map(menu -> {
                    Optional<FavoriteMenu> favoriteMenu = favoriteMenuRepository.findByChildAndMenu(child, menu);
                    if (favoriteMenu.isPresent()) {
                        return new MenuChildResponseDTO(menu, true);
                    } else {
                        return new MenuChildResponseDTO(menu, false);
                    }
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<Store> getStoreDistanceJava(double lon, double lat) {
        // 위도(latitude), 경도(longitude)
        long beforeTime = System.currentTimeMillis();
        List<Store> storeList = storeRepository.findAll().parallelStream()
                .filter(store -> getDistance(lat, lon, store.getLat(), store.getLon()) <= CHILD_DISTANCE_RADIUS)
                .collect(Collectors.toList());
        long afterTime = System.currentTimeMillis();
        long secDiffTime = (afterTime - beforeTime) / 1000; // 초 단위
        log.debug("[StoreService] getStoreDistanceJava 함수 실행 시간 : " + secDiffTime);

        return storeList;
    }

    @Override
    public List<Store> getStoreDistancePostgres(float lon, float lat) {
        long beforeTime = System.currentTimeMillis();
        List<Store> storeList = storeRepository.findByEarthDistancePostgres(lon, lat, CHILD_DISTANCE_RADIUS);
        long afterTime = System.currentTimeMillis();
        long secDiffTime = (afterTime - beforeTime) / 1000; // 초 단위
        log.debug("[StoreService] getStoreDistanceJava 함수 실행 시간 : " + secDiffTime);

        return storeList;
    }

    @Override
    public List<StoreDistResponseDTO> getStoreDistance(float lon, float lat) {
        JsonArray storeJsons = getDistData(lon, lat);

        List<StoreDistResponseDTO> storeDistResponseDTOList = new ArrayList<>();

        for (int i = 0; i < storeJsons.size(); i++) {
            Long id = storeJsons.get(i).getAsJsonArray().get(0).getAsLong();
            Store store = storeRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 가게입니다."));
            List<Menu> menus = menuRepository.findByStore(store);
            boolean isSupport = false;
            for (Menu menu : menus) {
                if (menu.getSponsoredCount() > 0) {
                    isSupport = true;
                    break;
                }
            }
            storeDistResponseDTOList.add(new StoreDistResponseDTO(store, isSupport));
        }

        return storeDistResponseDTOList;
    }

    @Override
    public List<Store> findByNameContaining(String name) {
        return storeRepository.findByNameContaining(name);
    }

    @Override
    public List<Store> findByOwner(Member member) {
        return storeRepository.findByOwner(member);
    }

    @Override
    public void registerStore(Long storeId, Member member) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 가게 입니다."));

        if (store.getOwner() != null) {
            throw new NotStoreOwnerException("이미 등록된 가게 입니다. 관리자에게 문의해주세요");
        }

        // TODO : 이미지에서 사업자 번호 추출 및 관리자 승인

        String licenseNumber = "117-12-12345";
        store.registOwner(member, licenseNumber);

        member = memberRepository.findById(member.getId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
        member.changeRole(UserRole.OWNER);
    }

    @Override
    public void updateStoreDetail(Long storeId, Member member, StoreDetailRequestDTO storeDTO, MultipartFile image) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 가게입니다."));

        if (member.getId() != store.getOwner().getId()) {
            throw new NotStoreOwnerException("존재하지 않는 가게입니다.");
        }

        store.updateStoreDetail(storeDTO.getStoreName(), storeDTO.getStoreOpenTime(), storeDTO.getStoreInfo(), storeDTO.getStoreAddress(), storeDTO.getStorePhoneNumber(), storeDTO.isStoreAlwaysShare());

        // 이미지 변경을 하는 경우
        if (image != null) {
            Map<String, String> map = s3Uploader.upload(image, "storeImage");
            String imgUploadName = map.get("uploadName");
            String imgUploadUrl = map.get("uploadUrl");

            if (store.getImage() == null) {
                // 기존 이미지가 없는 경우
                Image uploadImage = Image.builder()
                        .name(imgUploadName)
                        .url(imgUploadUrl)
                        .build();

                imageRepository.save(uploadImage);
                store.updateImage(uploadImage);
            } else {
                // 기존 이미지가 존재하는 경우
                Image originImage = imageRepository.findById(store.getImage().getId())
                        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이미지 입니다."));

                originImage.updateImage(imgUploadName, imgUploadUrl);
                store.updateImage(originImage);
            }
        }
    }

    @Override
    public void deleteStoreByMember(Long storeId, Member member) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 가게 입니다."));
        if (store.getOwner() == null || member.getId() != store.getOwner().getId()) {
            throw new NotStoreOwnerException("가게의 주인이 아닙니다.");
        }
        if (store.getSupports().size() > 0) {
            throw new NotDeleteEntityException("연관된 내역이 있어 가게 삭제가 불가능합니다. 관리자에게 문의 바랍니다.");
        }

        store.deleteOwner();

        if (member.getStores().size() == 0) {
            // 사장이 소유한 가게가 하나도 없다면, 후원자로 Role 변경
            member.changeRole(UserRole.SUPPORTER);
        }
    }

    private JsonArray getDistData(float lon, float lat) {

        String url = "http://cluster.p.ssafy.io:8999/filter";

        //Spring restTemplate
        HashMap<String, Object> result = new HashMap<String, Object>();
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);
        JSONObject personJsonObject = new JSONObject();
        personJsonObject.put("lon", lon);
        personJsonObject.put("lat", lat);
        HttpEntity<?> entity = new HttpEntity<>(personJsonObject.toString(), header);

        UriComponents uri = UriComponentsBuilder.fromHttpUrl(url).build();

        ResponseEntity<?> resultMap = restTemplate.exchange(uri.toString(), HttpMethod.POST, entity, Object.class);

        result.put("statusCode", resultMap.getStatusCodeValue()); //http status code를 확인
        result.put("header", resultMap.getHeaders()); //헤더 정보 확인
        result.put("body", resultMap.getBody()); //실제 데이터 정보 확인

        String jsonInString = "";
        try {
            jsonInString = new ObjectMapper().writeValueAsString(resultMap.getBody());
        } catch (JsonProcessingException e) {
            log.warn("[StoreService - getDistData] :" + e.getMessage());
            throw new SearchStoreException("주변 가게 탐색 중 오류가 발생하였습니다.");
        }
        JsonArray jsonArray = JsonParser.parseString(jsonInString).getAsJsonArray();

        return jsonArray;
    }

    private static double getDistance(double lat1, double lon1, double lat2, double lon2) {

        double theta = lon1 - lon2;
        double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));

        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515;

        dist = dist * 1609.344;

        return (dist);
    }

    // This function converts decimal degrees to radians
    private static double deg2rad(double deg) {
        return (deg * Math.PI / 180.0);
    }

    // This function converts radians to decimal degrees
    private static double rad2deg(double rad) {
        return (rad * 180 / Math.PI);
    }
}

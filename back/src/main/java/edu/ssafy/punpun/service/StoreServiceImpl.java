package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.request.StoreDetailRequestDTO;
import edu.ssafy.punpun.dto.response.MenuChildResponseDTO;
import edu.ssafy.punpun.entity.*;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.exception.NotDeleteEntityException;
import edu.ssafy.punpun.exception.NotStoreOwnerException;
import edu.ssafy.punpun.repository.*;
import edu.ssafy.punpun.s3.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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

        if (member.getStores() == null) {
            // 사장이 소유한 가게가 하나도 없다면, 후원자로 Role 변경
            member.changeRole(UserRole.SUPPORTER);
        }
    }
}

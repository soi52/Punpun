package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.request.MenuUpdateRequestDTO;
import edu.ssafy.punpun.entity.Image;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.exception.NotDeleteEntityException;
import edu.ssafy.punpun.exception.NotStoreOwnerException;
import edu.ssafy.punpun.repository.ImageRepository;
import edu.ssafy.punpun.repository.MenuRepository;
import edu.ssafy.punpun.repository.StoreRepository;
import edu.ssafy.punpun.s3.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

    private final MenuRepository menuRepository;
    private final StoreRepository storeRepository;
    private final ImageRepository imageRepository;
    private final S3Uploader s3Uploader;

    @Override
    public List<Menu> findByStore(Store store) {
        return menuRepository.findByStore(store);
    }

    @Override
    public void registerMenuDetail(Long storeId, String name, Long price, MultipartFile image, Member member) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new IllegalArgumentException("메뉴에 해당하는 가게가 존재하지 않습니다."));
        if (member.getId() != store.getOwner().getId()) {
            throw new NotStoreOwnerException("가게의 주인이 아닙니다.");
        }

        if (image == null) {
            // 이미지가 없는 경우
            Menu menu = Menu.builder()
                    .name(name)
                    .price(price)
                    .store(store)
                    .build();
            menuRepository.save(menu);
        } else {
            // 이미지가 있는 경우
            Map<String, String> map = s3Uploader.upload(image, "menuImage");
            String imgUploadName = map.get("uploadName");
            String imgUploadUrl = map.get("uploadUrl");

            Image uploadImage = Image.builder()
                    .name(imgUploadName)
                    .url(imgUploadUrl)
                    .build();
            imageRepository.save(uploadImage);

            Menu menu = Menu.builder()
                    .name(name)
                    .price(price)
                    .image(uploadImage)
                    .store(store)
                    .build();
            menuRepository.save(menu);
        }
    }

    @Override
    public void updateMenuDetail(Long menuId, MenuUpdateRequestDTO menuUpdateRequestDTO, MultipartFile image, Member member) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new IllegalArgumentException("해당 메뉴가 존재하지 않습니다."));
        Store store = menu.getStore();
        if (store == null) {
            throw new IllegalArgumentException("해당 가게가 존재하지 않습니다.");
        }
        if (store.getOwner() == null || member.getId() != store.getOwner().getId()) {
            throw new NotStoreOwnerException("가게의 주인이 아닙니다.");
        }

        menu.updateDetail(menuUpdateRequestDTO.getMenuName(), menuUpdateRequestDTO.getMenuPrice());

        // 메뉴 이미지를 변경하는 경우
        if (image != null) {
            Map<String, String> map = s3Uploader.upload(image, "menuImage");
            String imgUploadName = map.get("uploadName");
            String imgUploadUrl = map.get("uploadUrl");

            if (menu.getImage() == null) {
                // 기존 이미지가 없는 경우
                Image uploadImage = Image.builder()
                        .name(imgUploadName)
                        .url(imgUploadUrl)
                        .build();

                imageRepository.save(uploadImage);
                menu.updateImage(uploadImage);
            } else {
                // 기존 이미지가 존재하는 경우
                Image originImage = imageRepository.findById(menu.getImage().getId())
                        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이미지 입니다."));

                originImage.updateImage(imgUploadName, imgUploadUrl);
                menu.updateImage(originImage);
            }
        }
    }

    @Override
    public void deleteMenu(Long menuId, Member member) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new IllegalArgumentException("해당 메뉴가 존재하지 않습니다."));
        Store store = menu.getStore();
        if (store == null) {
            throw new IllegalArgumentException("해당 가게가 존재하지 않습니다.");
        }
        if (store.getOwner() == null || member.getId() != store.getOwner().getId()) {
            throw new NotStoreOwnerException("가게의 주인이 아닙니다.");
        }

        // 후원 내역이 있는 경우, 나눔이 있는 경우
        // 예약이 있는 경우
        // 좋아하는 메뉴로 등록된 경우 처리 결정
        if (menu.getSupports().size() > 0 || menu.getReservations().size() > 0 || menu.getFavoriteMenus().size() > 0) {
            throw new NotDeleteEntityException("연관된 내역이 있어 메뉴 삭제가 불가능합니다. 관리자에게 문의 바랍니다.");
        }

        menuRepository.delete(menu);
    }

    @Override
    public void addSponsoredCount(Long id, Long menuCount) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("없는 메뉴 번호입니다."));
        menu.support(menuCount);
    }
}

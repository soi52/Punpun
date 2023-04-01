package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.response.MenuChildResponseDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.FavoriteMenu;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.exception.NotStoreOwnerException;
import edu.ssafy.punpun.repository.FavoriteMenuRepository;
import edu.ssafy.punpun.repository.MenuRepository;
import edu.ssafy.punpun.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreRepository storeRepository;
    private final MenuRepository menuRepository;
    private final FavoriteMenuRepository favoriteMenuRepository;

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

        String licenseNumber = "117-12-51815";
        store.registOwner(member, licenseNumber);
    }

    @Override
    public void deleteStoreByMember(Member member, Long storeId) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 가게 입니다."));

        if (store.getOwner() == null || member.getId() != store.getOwner().getId()) {
            throw new NotStoreOwnerException("가게의 주인이 아닙니다.");
        }
        store.deleteOwner();
    }
}

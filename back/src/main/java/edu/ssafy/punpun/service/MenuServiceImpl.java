package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

    private final MenuRepository menuRepository;
    @Override
    public List<Menu> findByStore(Store store) {
        return menuRepository.findByStore(store);
    }

    @Override
    public void addSponsoredCount(Long id, Long menuCount) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("없는 메뉴 번호입니다."));
        menu.support(menuCount);
    }
}

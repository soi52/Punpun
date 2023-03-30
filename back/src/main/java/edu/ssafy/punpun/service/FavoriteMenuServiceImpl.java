package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.FavoriteMenu;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.repository.ChildRepository;
import edu.ssafy.punpun.repository.FavoriteMenuRepository;
import edu.ssafy.punpun.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class FavoriteMenuServiceImpl implements FavoriteMenuService {

    private final FavoriteMenuRepository favoriteMenuRepository;
    private final MenuRepository menuRepository;

    @Override
    public List<Menu> getFavoriteMenuChild(Child child) {
        List<Menu> menuList = favoriteMenuRepository.findByChild(child).stream()
                .map(favoriteMenu -> favoriteMenu.getMenu())
                .collect(Collectors.toList());

        return menuList;
    }

    @Override
    public void insertFavoriteMenu(Child child, Long menuId) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(()->new IllegalArgumentException("존재하지 않는 메뉴 입니다."));

        FavoriteMenu favoriteMenu = FavoriteMenu.builder()
                .child(child)
                .menu(menu)
                .build();

        favoriteMenuRepository.save(favoriteMenu);
    }

    @Override
    public void deleteFavoriteMenu(Child child, Long menuId) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(()->new IllegalArgumentException("존재하지 않는 메뉴 입니다."));

        FavoriteMenu favoriteMenu = favoriteMenuRepository.findByChildAndMenu(child, menu)
                .orElseThrow(()->new IllegalArgumentException("좋아하는 메뉴로 등록되어 있지 않습니다."));
        favoriteMenuRepository.delete(favoriteMenu);
    }

}

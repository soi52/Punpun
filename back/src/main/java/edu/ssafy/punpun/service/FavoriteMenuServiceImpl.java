package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.FavoriteMenu;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.repository.ChildRepository;
import edu.ssafy.punpun.repository.FavoriteMenuRepository;
import edu.ssafy.punpun.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteMenuServiceImpl implements FavoriteMenuService {

    private FavoriteMenuRepository favoriteMenuRepository;
    private ChildRepository childRepository;
    private MenuRepository menuRepository;

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

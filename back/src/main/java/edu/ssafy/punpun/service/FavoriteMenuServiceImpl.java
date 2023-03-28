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
    public List<FavoriteMenu> findByChild(Child child) {
        return favoriteMenuRepository.findByChild(child);
    }

    @Override
    public List<FavoriteMenu> findByChildAndMenu_Store(Child child, Store store) {
        return favoriteMenuRepository.findByChildAndMenu_Store(child, store);
    }

    @Override
    public void insertFavoriteMenu(Long childId, Long menuId) {
        Child child = childRepository.findById(childId).orElseThrow(IllegalArgumentException::new);
        Menu menu = menuRepository.findById(menuId).orElseThrow(IllegalArgumentException::new);

        FavoriteMenu favoriteMenu = FavoriteMenu.builder()
                .child(child)
                .menu(menu)
                .build();

        favoriteMenuRepository.save(favoriteMenu);
    }

    @Override
    public void deleteFavoriteMenu(Long childId, Long menuId) {
        Child child = childRepository.findById(childId).orElseThrow(IllegalArgumentException::new);
        Menu menu = menuRepository.findById(menuId).orElseThrow(IllegalArgumentException::new);

//        favoriteMenuRepository.findByChildAndMenu(child, menu)
//                .map(favoriteMenu1 -> favoriteMenuRepository.delete(favoriteMenu1))
//                .orElseThrow(IllegalArgumentException::new);
        FavoriteMenu favoriteMenu = favoriteMenuRepository.findByChildAndMenu(child, menu).orElseThrow(IllegalArgumentException::new);
        favoriteMenuRepository.delete(favoriteMenu);
    }

}

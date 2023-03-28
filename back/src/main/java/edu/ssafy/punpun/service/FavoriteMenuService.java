package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.FavoriteMenu;
import edu.ssafy.punpun.entity.Store;

import java.util.List;

public interface FavoriteMenuService {
    List<FavoriteMenu> findByChild(Child child);

    List<FavoriteMenu> findByChildAndMenu_Store(Child child, Store store);

    void insertFavoriteMenu(Long childId, Long menuId);

    void deleteFavoriteMenu(Long childId, Long menuId);
}

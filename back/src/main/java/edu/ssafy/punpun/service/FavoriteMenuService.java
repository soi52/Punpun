package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Menu;

import java.util.List;

public interface FavoriteMenuService {

    List<Menu> getFavoriteMenuChild(Child child);

    void insertFavoriteMenu(Child child, Long menuId);

    void deleteFavoriteMenu(Child child, Long menuId);

}

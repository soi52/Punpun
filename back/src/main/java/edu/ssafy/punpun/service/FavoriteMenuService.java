package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.FavoriteMenu;
import edu.ssafy.punpun.entity.Store;

import java.util.List;

public interface FavoriteMenuService {

    void insertFavoriteMenu(Child child, Long menuId);

    void deleteFavoriteMenu(Child child, Long menuId);
}

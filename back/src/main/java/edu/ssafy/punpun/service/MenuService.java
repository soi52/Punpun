package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Menu;

import java.util.List;

public interface MenuService {
    List<Menu> findByStore_Id(Long id);
}

package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;

import java.util.List;

public interface MenuService {
    List<Menu> findByStore(Store store);
    void addSponsoredCount(Long id, Long menuCount);
}

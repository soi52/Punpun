package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.FavoriteMenu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.repository.FavoriteMenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteMenuServiceImpl implements FavoriteMenuService {

    private FavoriteMenuRepository favoriteMenuRepository;
    @Override
    public List<FavoriteMenu> findByChild(Child child) {
        return favoriteMenuRepository.findByChild(child);
    }

    @Override
    public List<FavoriteMenu> findByChildAndMenu_Store(Child child, Store store) {
        return favoriteMenuRepository.findByChildAndMenu_Store(child, store);
    }

}

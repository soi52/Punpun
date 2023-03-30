package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.FavoriteMenu;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteMenuRepository extends JpaRepository<FavoriteMenu, Long> {
    List<FavoriteMenu> findByChild(Child child);
    Optional<FavoriteMenu> findByChildAndMenu(Child child, Menu menu);
    List<FavoriteMenu> findByChildAndMenu_Store(Child child, Store store);
}

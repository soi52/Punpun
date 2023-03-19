package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.FavoriteMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteMenuRepository extends JpaRepository<FavoriteMenu, Long> {
}

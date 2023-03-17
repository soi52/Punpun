package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByStore_Id(Long id);
}

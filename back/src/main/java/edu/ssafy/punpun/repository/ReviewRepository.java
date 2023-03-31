package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Review;
import edu.ssafy.punpun.entity.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query(value = "select c from Child c inner join c.favoriteMenus fm inner join fm.menu where c = ?1"
    ,countQuery = "select count(c) from Child c inner join c.favoriteMenus fm inner join fm.menu where c = ?1")
    Page<Review> findAllByChild(Child child, Pageable pageable);

    @Query(value = "select r from Review r " +
            "inner join r.reservation res " +
            "inner join res.supportReservation sr " +
            "inner join sr.support sup where sup.supporter = ?1")
    Page<Review> findAllBySupporter(Member supporter, Pageable pageable);

    Page<Review> findAllByStore(Store store, Pageable pageable);
}

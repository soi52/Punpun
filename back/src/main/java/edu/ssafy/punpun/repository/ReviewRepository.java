package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Review;
import edu.ssafy.punpun.entity.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @EntityGraph(attributePaths = {"reviewKeywords.keyword","store"})
    @Query(value = "select r from Review r where r.child = ?1"
            , countQuery = "select count(r) from Review r where r.child = ?1")
    Page<Review> findAllByChild(Child child, Pageable pageable);

    //TODO : pagenation에 문제가 있음
    @EntityGraph(attributePaths = {"reviewKeywords.keyword","store"})
    @Query(value = "select r from Review r " +
            "inner join r.reservation res " +
            "inner join res.supportReservation sr " +
            "inner join sr.support sup " +
            "where sup.supporter = :supporter",
            countQuery = "select count(r) from Review r " +
                    "inner join r.reservation res " +
                    "inner join res.supportReservation sr " +
                    "inner join sr.support sup " +
                    "where sup.supporter = :supporter")
    Page<Review> findAllBySupporter(@Param("supporter") Member supporter, Pageable pageable);

    @EntityGraph(attributePaths = {"reviewKeywords.keyword","store"})
    @Query(value = "select r from Review r where r.store = ?1")
    Page<Review> findAllByStore(Store store, Pageable pageable);
}

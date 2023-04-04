package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findById(Long id);
//    @Query(value = "SELECT *" +
//            "FROM store s " +
//            "WHERE s.open_state = true and earth_distance(" +
//            "ll_to_earth(CAST(s.lat as float), CAST(s.lon as float))," +
//            "ll_to_earth(:latitude, :longitude)) < :radius",
//            nativeQuery = true)
//    Page<Store> findByEarthDistanceTest(Pageable page, @Param("latitude") Float lon, @Param("longitude") Float lat, @Param("radius") Integer radius);
    List<Store> findByNameContaining(String name);
    List<Store> findByOwner(Member member);
}

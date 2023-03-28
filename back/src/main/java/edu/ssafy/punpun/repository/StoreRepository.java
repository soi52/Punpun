package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findById(Long id);
    List<Store> findByNameContaining(String name);
    List<Store> findByOwner(Member member);
}

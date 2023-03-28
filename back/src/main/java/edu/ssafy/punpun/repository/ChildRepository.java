package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Child;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChildRepository extends JpaRepository<Child, Long> {
    Optional<Child> findById(Long id);
    Optional<Child> findByEmail(String email);
}

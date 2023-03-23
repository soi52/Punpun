package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findAllByChild(Child child, Pageable pageable);
}

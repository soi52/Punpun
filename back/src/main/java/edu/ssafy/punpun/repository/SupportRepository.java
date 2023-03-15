package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Support;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupportRepository extends JpaRepository<Support, Long> {
    List<Support> findBySupporter(Member supporter);
}

package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SupportRepository extends JpaRepository<Support, Long>, SupportCustomRepository {
    List<Support> findBySupporter(Member supporter);
    List<Support> findAllByMenu(Menu menu);
    List<Support> findBySupportTypeAndSupportDate(SupportType type, LocalDate date);
}

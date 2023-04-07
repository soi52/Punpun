package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import edu.ssafy.punpun.entity.enumurate.SupportType;
import edu.ssafy.punpun.repository.MenuRepository;
import edu.ssafy.punpun.repository.SupportRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SchedulerService {
    private final SupportRepository supportRepository;
    private final MenuRepository menuRepository;

    @Scheduled(cron= "0 0 0 * * *")
    public void deleteShare() throws Exception{

        LocalDate date=LocalDate.now();
        List<Support> supports=supportRepository.findBySupportTypeAndSupportDate(SupportType.SHARE, date.minusDays(1));

        for (Support support : supports) {
            Menu menu = menuRepository.findById(support.getMenu().getId())
                    .orElseThrow(() -> new IllegalArgumentException("메뉴가 없습니다."));
            menu.reservationApprove();
            support.SupportStateUnused();
        }
    }
}

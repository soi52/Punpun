package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.response.ShareResponseDTO;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportType;
import edu.ssafy.punpun.repository.SupportRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.awt.print.Pageable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SupportServiceImpl implements SupportService{
    private final SupportRepository supportRepository;

    private final MenuService menuService;

    @Override
    public List<Support> findSupport(Member supporter) {
        return supportRepository.findBySupporter(supporter);
    }

    @Override
    @Transactional
    public void saveSupport(List<Support> supportList, List<Long> menuId , List<Long> menuCount, Member supporter, Long usePoint) {
        // supporter use point
        // TODO: 영속성 확인
        // TODO: 포인트 확인
        supporter.support(usePoint);

        for(int i=0; i<supportList.size(); i++){
            // add menu sponsored count
            menuService.addSponsoredCount(menuId.get(i), menuCount.get(i));
            // save support table
            for(int j=0; j<menuCount.get(i); j++) {
                supportRepository.save(supportList.get(i));
            }
        }
    }

    @Override
    public List<ShareResponseDTO> findShareList(Long storeId, SupportType supportType, Pageable page, LocalDate date) {
//        return supportRepository.findShareList(storeId, supportType, date.atStartOfDay(), date.atTime(LocalTime.MAX) , page );
        return null;
    }
}

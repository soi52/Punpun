package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.repository.SupportRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
    public void supportPayment(List<Support> supportList, List<Long> menuId , List<Long> menuCount, Member supporter, Long usePoint) {
        // supporter use point
        // TODO: 영속성 확인
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
}

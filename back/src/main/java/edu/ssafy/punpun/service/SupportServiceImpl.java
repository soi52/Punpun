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
    public void SupportPayment(Support support, Long menuId, Long menuCount) {
        // add menu sponsored count
        menuService.findMenuId(menuId, menuCount);
        // save support table
        supportRepository.save(support);
    }
}

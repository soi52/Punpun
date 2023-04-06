package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.request.SupportRequestDTO;
import edu.ssafy.punpun.dto.response.ShareResponseDTO;
import edu.ssafy.punpun.dto.response.SupportResponseDTO;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import edu.ssafy.punpun.entity.enumurate.SupportType;
import edu.ssafy.punpun.exception.PointLackException;
import edu.ssafy.punpun.repository.MemberRepository;
import edu.ssafy.punpun.repository.MenuRepository;
import edu.ssafy.punpun.repository.SupportRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SupportServiceImpl implements SupportService{
    private final SupportRepository supportRepository;
    private final MemberRepository memberRepository;
    private final MenuRepository menuRepository;

    private final MenuService menuService;

    @Override
    public List<SupportResponseDTO> findSupport(Member supporter) {
        return supportRepository.findSupport(supporter);
    }

    @Override
    public void saveSupport(Member member, SupportRequestDTO supportRequestDTO, int type) {
        Member supporter=memberRepository.findById(member.getId())
                .orElseThrow(()->new IllegalArgumentException("멤버가 없습니다."));

        for(int i=0; i<supportRequestDTO.getMenuId().size(); i++){
            Menu menu=menuRepository.findById(supportRequestDTO.getMenuId().get(i))
                    .orElseThrow(()->new IllegalArgumentException("없는 메뉴 입니다."));
            for(int j=0; j<supportRequestDTO.getMenuCount().get(i); j++) {
                Support support = Support.builder()
                        .supportState(SupportState.SUPPORT)
                        .supporter(member)
                        .build();
                if(type == 0) {
                    support.setSupportType(SupportType.SUPPORT);
                }
                else{
                    support.setSupportType(SupportType.SHARE);
                }

                support.setMenu(menu);
                support.setStore(menu.getStore());

                // save table
                supportRepository.save(support);

            }
            menuService.addSponsoredCount(supportRequestDTO.getMenuId().get(i), supportRequestDTO.getMenuCount().get(i));
        }

        // supporter use point
        if(supportRequestDTO.getUsePoint()!=0 && supporter.getRemainPoint() < supportRequestDTO.getUsePoint()){
            throw new PointLackException("포인트가 부족합니다.");
        }
        supporter.support(supportRequestDTO.getUsePoint());
    }

    @Override
    public Page<ShareResponseDTO> findShareList(Long storeId, SupportType supportType, int page, LocalDate date) {
        return supportRepository.findShareList(storeId, supportType, page , date );
    }
}

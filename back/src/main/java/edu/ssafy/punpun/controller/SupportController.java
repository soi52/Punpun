package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.request.SupportRequestDTO;
import edu.ssafy.punpun.dto.response.ShareResponseDTO;
import edu.ssafy.punpun.dto.response.SupportResponseDTO;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import edu.ssafy.punpun.entity.enumurate.SupportType;
import edu.ssafy.punpun.security.oauth2.PrincipalMemberDetail;
import edu.ssafy.punpun.service.SupportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/supports")
public class SupportController {
    private final SupportService supportService;

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public List<SupportResponseDTO> findSupport(@AuthenticationPrincipal PrincipalMemberDetail memberDetail){
        List<Support> supportList=supportService.findSupport(memberDetail.getMember());
        return supportList.stream()
                .map(SupportResponseDTO::new)
                .collect(Collectors.toList());
    }

    @PostMapping("/payment")
    @ResponseStatus(code= HttpStatus.OK)
    public void supportPayment (@AuthenticationPrincipal PrincipalMemberDetail memberDetail, @RequestBody SupportRequestDTO supportRequestDTO){
        List<Support> supports=dtoToEntity(memberDetail.getMember(), supportRequestDTO, 0);
        supportService.saveSupport(supports, supportRequestDTO.getMenuId(), supportRequestDTO.getMenuCount(), memberDetail.getMember(), supportRequestDTO.getUsePoint());
    }

    @PostMapping("/share")
    @ResponseStatus(code= HttpStatus.OK)
    public void ownerShare(@AuthenticationPrincipal PrincipalMemberDetail memberDetail, @RequestBody SupportRequestDTO supportRequestDTO){
        List<Support> supports=dtoToEntity(memberDetail.getMember(), supportRequestDTO, 1);
        supportService.saveSupport(supports, supportRequestDTO.getMenuId(), supportRequestDTO.getMenuCount(), memberDetail.getMember(), 0L);
    }

    public List<Support> dtoToEntity(Member member, SupportRequestDTO supportRequestDTO, int type){
        List<Support> supports=new LinkedList<>();
        for(int i=0; i<supportRequestDTO.getMenuId().size(); i++) {
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

            supports.add(support);
        }
        return supports;
    }

    @GetMapping("/{storeId}")
    @ResponseStatus(code= HttpStatus.OK)
    public Page<ShareResponseDTO> findShareList(@PathVariable("storeId") Long storeId ,
                                                  @RequestParam(name="type") SupportType type,
                                                  @RequestParam(name="page", required = false, defaultValue = "0") int page,
                                                  @RequestParam(name="date", required = false)@DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date){
        return supportService.findShareList(storeId, type, page, date);
    }
}

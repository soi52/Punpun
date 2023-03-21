package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.request.SupportRequestDTO;
import edu.ssafy.punpun.dto.response.SupportResponseDTO;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import edu.ssafy.punpun.entity.enumurate.SupportType;
import edu.ssafy.punpun.service.SupportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
    public List<SupportResponseDTO> findSupport(@AuthenticationPrincipal Member supporter){
        List<Support> supportList=supportService.findSupport(supporter);
        return supportList.stream()
                .map(SupportResponseDTO::new)
                .collect(Collectors.toList());
    }

    @PostMapping("/payment")
    @ResponseStatus(code= HttpStatus.OK)
    public void supportPayment (@AuthenticationPrincipal Member supporter, @RequestBody SupportRequestDTO supportRequestDTO){
        List<Support> supports=dtoToEntity(supporter, supportRequestDTO, 0);
        supportService.saveSupport(supports, supportRequestDTO.getMenuId(), supportRequestDTO.getMenuCount(), supporter, supportRequestDTO.getUsePoint());
    }

    @PostMapping("/share")
    @ResponseStatus(code= HttpStatus.OK)
    public void ownerShare(@AuthenticationPrincipal Member owner, @RequestBody SupportRequestDTO supportRequestDTO){
        List<Support> supports=dtoToEntity(owner, supportRequestDTO, 1);
        supportService.saveSupport(supports, supportRequestDTO.getMenuId(), supportRequestDTO.getMenuCount(), owner, 0L);
    }

    public List<Support> dtoToEntity(Member member, SupportRequestDTO supportRequestDTO, int type){
        List<Support> supports=new LinkedList<>();
        for(int i=0; i<supportRequestDTO.getMenuId().size(); i++) {
            Support support = Support.builder()
                    .supportState(SupportState.SUPPORT)
                    .supporter(member)
                    .menu(Menu.builder().id(supportRequestDTO.getMenuId().get(i)).build())
                    .store(Store.builder().id(supportRequestDTO.getStoreId()).build())
                    .build();
            if(type == 0) support.setSupportType(SupportType.SUPPORT);
            else support.setSupportType(SupportType.SHARE);

            supports.add(support);
        }
        return supports;
    }
}

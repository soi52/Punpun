package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.request.SupportRequestDTO;
import edu.ssafy.punpun.dto.response.SupportResponseDTO;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import edu.ssafy.punpun.service.MenuService;
import edu.ssafy.punpun.service.SupportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/supports")
public class SupportController {
    private final SupportService supportService;
    private final MenuService menuService;

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
    public void SupportPayment (@AuthenticationPrincipal Member supporter, @RequestBody SupportRequestDTO SupportDTO){
        // menu sponsored count +1
        menuService.findMenuId(SupportDTO.getMenuId());
        // supporter use point
        supporter.support(SupportDTO.getUsePoint());
        // save support table
        Support support= Support.builder()
                .supportType(SupportDTO.getSupportType())
                .supportState(SupportState.SUPPORT)
                .supporter(supporter)
                .menu(Menu.builder().id(SupportDTO.getMenuId()).build())
                .store(Store.builder().id(SupportDTO.getStoreId()).build())
                .build();
        supportService.saveSupport(support);
    }
}

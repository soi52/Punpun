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
    public void SupportPayment (@AuthenticationPrincipal Member supporter, @RequestBody SupportRequestDTO supportRequestDTO){
        // supporter use point
        supporter.support(supportRequestDTO.getUsePoint());

        // add menu sponsored count and save support table
        for(int i=0; i<supportRequestDTO.getMenuId().size(); i++) {
            Support support = Support.builder()
                    .supportType(supportRequestDTO.getSupportType())
                    .supportState(SupportState.SUPPORT)
                    .supporter(supporter)
                    .menu(Menu.builder().id(supportRequestDTO.getMenuId().get(i)).build())
                    .store(Store.builder().id(supportRequestDTO.getStoreId()).build())
                    .build();
            supportService.SupportPayment(support, supportRequestDTO.getMenuId().get(i), supportRequestDTO.getMenuCount().get(i));
        }
    }
}

package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.response.SupportDTO;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.service.SupportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/supports")
public class SupportController {
    private final SupportService supportService;

    @GetMapping
    public List<SupportDTO> findSupport(@AuthenticationPrincipal Member supporter){
        List<Support> supportList=supportService.findSupport(supporter);
        return supportList.stream()
                .map(SupportDTO::new)
                .collect(Collectors.toList());
    }
}

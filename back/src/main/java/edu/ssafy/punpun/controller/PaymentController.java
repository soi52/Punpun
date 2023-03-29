package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.request.PointRequestDTO;
import edu.ssafy.punpun.dto.response.PointResponseDTO;
import edu.ssafy.punpun.security.oauth2.PrincipalMemberDetail;
import edu.ssafy.punpun.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/payments")
public class PaymentController {
    private final PaymentService paymentService;

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public PointResponseDTO getPoints(@AuthenticationPrincipal PrincipalMemberDetail member){
        return new PointResponseDTO(member.getMember().getId(), member.getMember().getRemainPoint());
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.OK)
    public void savePoints(@AuthenticationPrincipal PrincipalMemberDetail member, @RequestBody PointRequestDTO pointRequestDTO){
        paymentService.updatePoints(member.getMember(), pointRequestDTO.getPoint());
    }

    @GetMapping("/total")
    @ResponseStatus(code = HttpStatus.OK)
    public PointResponseDTO getTotalSupport(@AuthenticationPrincipal PrincipalMemberDetail member){
        return new PointResponseDTO(member.getMember().getId(), member.getMember().getSupportedPoint());
    }

}

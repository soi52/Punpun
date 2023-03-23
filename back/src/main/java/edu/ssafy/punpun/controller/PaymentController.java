package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/payments")
public class PaymentController {
    private final PaymentService paymentService;

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public Long getPoints(@AuthenticationPrincipal Member member){
        return paymentService.getPoints(member);
    }

}

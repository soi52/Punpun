package edu.ssafy.punpun.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    @GetMapping("/oauth2/kakao")
    public void kakaoLogin() {
        log.info("[antMatchers Test] : user/oauth2/kakao Login controller / token 없이 접근 확인용");
    }
}

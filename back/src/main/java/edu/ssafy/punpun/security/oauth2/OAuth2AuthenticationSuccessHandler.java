package edu.ssafy.punpun.security.oauth2;

import edu.ssafy.punpun.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler {
    private final MemberRepository memberRepository;
//    private final JwtManager jwtManager;



}

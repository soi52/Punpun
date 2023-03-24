package edu.ssafy.punpun.security.jwt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

//    @Value("${springboot.jwt.secret}")
//    private final String secretKey;
    private final Long accessTokenExpiredTime = 1000L * 60 * 60;    // 1시간
    private final Long refreshTokenExpiredTime = 1000L * 60 * 60 * 24;  // 24시간, 1일




}

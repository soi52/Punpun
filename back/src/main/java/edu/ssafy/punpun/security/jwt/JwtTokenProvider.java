package edu.ssafy.punpun.security.jwt;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.repository.ChildRepository;
import edu.ssafy.punpun.repository.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private final String secretKey = "secretKey";
    private final Long accessTokenExpiredTime = 1000L * 60 * 60;    // 1시간
    private final Long refreshTokenExpiredTime = 1000L * 60 * 60 * 24;  // 24시간, 1일

    private final MemberRepository memberRepository;
    private final ChildRepository childRepository;

//    @PostConstruct
//    protected void init() {
//        log.debug("[jwt init] JWTTokenprovider 내 secretKey 초기화 시작");
//        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
//        log.debug("[jwt init] JWTTokenprovider 내 secretKey 초기화 완료");
//    }

    public String createTokenMember(Member member) {
        log.info("[createToken] 토큰 생성 시작");
        Date now = new Date();
        Claims claims = Jwts.claims()
                .setSubject(member.getName());
        claims.put("id", member.getId());
        claims.put("name", member.getName());
        claims.put("email", member.getEmail());
        claims.put("role", member.getRole());

        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + accessTokenExpiredTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        log.info("[createToken] 토큰 생성 완료");
        return token;
    }

//    public Authentication getAuthentication(String token) {
//        log.info("[getAuthentication] 토큰 인증 정보 조회 시작");
//        Optional<Member> member = memberRepository.
//        log.info("[getAuthentication] 토큰 기반 회원 구별 정보 추출 완료, info : {}", info);
//        return info;
//    }

}

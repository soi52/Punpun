package edu.ssafy.punpun.security.jwt;

import edu.ssafy.punpun.security.oauth2.PrincipalOAuth2UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final PrincipalOAuth2UserService principalOAuth2UserService;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String accessToken = jwtTokenProvider.resolveToken(request, "accessToken");
        String refreshToken = jwtTokenProvider.resolveToken(request, "refreshToken");
        log.info("[doFilterInternal] token 값 추출 완료. token : {}", accessToken);

        log.info("[doFilterInternal] token 값 유효성 체크 시작");
        if (accessToken != null || jwtTokenProvider.validateToken(accessToken)) {
            Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("[doFilterInternal] token 값 유효성 체크 완료");
        }

        filterChain.doFilter(request, response);
    }

}

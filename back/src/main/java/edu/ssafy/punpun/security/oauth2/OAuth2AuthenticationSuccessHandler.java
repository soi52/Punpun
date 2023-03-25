package edu.ssafy.punpun.security.oauth2;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.repository.ChildRepository;
import edu.ssafy.punpun.repository.MemberRepository;
import edu.ssafy.punpun.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final MemberRepository memberRepository;
    private final ChildRepository childRepository;
    private final JwtTokenProvider jwtTokenProvider;

    private final int cookieExpiredTime = 1000 * 60 * 60 * 24;  // 24시간, 1일

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        String accessToken = "";
        String refreshToken = "";

        if (authentication.getPrincipal() instanceof PrincipalMemberDetail) {
            // 학생이 아닌 경우,멤버인 경우

            PrincipalMemberDetail principalMemberDetail = (PrincipalMemberDetail) authentication.getPrincipal();
            // getPassword에 Email 저장되어있음
            Optional<Member> optionalMember = memberRepository.findByEmail(principalMemberDetail.getPassword());
            Member resultMember = null;
            resultMember = optionalMember.get();
            accessToken = jwtTokenProvider.createTokenMember(resultMember);
        } else {
            // 학생인 경우

            PrincipalChildDetail principalChildDetail = (PrincipalChildDetail) authentication.getPrincipal();
            // getPassword에 Email 저장되어있음
            Optional<Child> optionalChild = childRepository.findByEmail(principalChildDetail.getPassword());
            Child resultChild = null;
            resultChild = optionalChild.get();
            accessToken = jwtTokenProvider.createTokenChild(resultChild);
        }

        refreshToken = jwtTokenProvider.createRefreshToken();

        Cookie cookieAccess = new Cookie("accessToken", accessToken);
        cookieAccess.setPath("/");
        cookieAccess.setMaxAge(cookieExpiredTime);

        Cookie cookieRefresh = new Cookie("refreshToken", refreshToken);
        cookieRefresh.setPath("/");
        cookieRefresh.setMaxAge(cookieExpiredTime);
        cookieRefresh.setSecure(true);
        cookieRefresh.setHttpOnly(true);

        response.addCookie(cookieAccess);
        response.addCookie(cookieRefresh);
        response.setStatus(302);
//            response.setHeader("Location", "/");
//            response.setHeader("Set-Cookie", cookie.toString());
        response.setHeader("Location", "/kakaoLogin?token=" + accessToken);
    }

}

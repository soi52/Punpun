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

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        String accessToken = "";

        if (authentication.getPrincipal() instanceof PrincipalMemberDetail) {
            // 학생이 아닌 경우,멤버인 경우

            System.out.println(authentication.getPrincipal());
            PrincipalMemberDetail principalMemberDetail = (PrincipalMemberDetail) authentication.getPrincipal();
            // getPassword에 Email 저장되어있음
            Optional<Member> optionalMember = memberRepository.findByEmail(principalMemberDetail.getPassword());
            Member resultMember = null;
            resultMember = optionalMember.get();
            String token = jwtTokenProvider.createTokenMember(resultMember);

            Cookie cookie = new Cookie("accessToken", token);
            cookie.setPath("/");
//            cookie.setMaxAge();
//            cookie.setSecure(true);
//            cookie.setHttpOnly(true);

            System.out.println(cookie);
//            response.addCookie(cookie);
//            response.setStatus(302);
//            response.setHeader("Location", "http://192.168.100.138:3000/");
//            response.setHeader("Set-Cookie", cookie.toString());

            String targetUrl = UriComponentsBuilder.fromHttpUrl("https://192.168.100.138:3000/kakaoLogin")
//        String targetUrl = UriComponentsBuilder.fromUriString("/kakaoLogin")
                    .queryParam("accessToken", token)
                    .build().toUriString();

            getRedirectStrategy().sendRedirect(request, response, targetUrl);

        } else {
            // 학생인 경우
            PrincipalChildDetail principalChildDetail = (PrincipalChildDetail) authentication.getPrincipal();
            // getPassword에 Email 저장되어있음
            Optional<Child> optionalChild = childRepository.findByEmail(principalChildDetail.getPassword());
            Child resultChild = null;
            resultChild = optionalChild.get();
        }
    }

}

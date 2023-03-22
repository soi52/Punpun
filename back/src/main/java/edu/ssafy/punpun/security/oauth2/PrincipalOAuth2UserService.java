package edu.ssafy.punpun.security.oauth2;

import java.util.Collections;
import java.util.Optional;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.repository.MemberRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PrincipalOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;
    private final HttpSession httpSession;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2UserService<OAuth2UserRequest, OAuth2User> service = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = service.loadUser(userRequest); // Oath2 정보를 가져옴

        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // 소셜 정보 가져옴
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        Member user = saveOrUpdate(attributes);
        httpSession.setAttribute("user", new SessionUser(user));
        System.out.println(user.toString());
        // userPrincipal return
        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority(user.getRole().toString())),
                attributes.getAttributes(),
                attributes.getNameAttributeKey());
    }

    private Member saveOrUpdate(OAuthAttributes attributes){
        Optional<Member> user = memberRepository.findByEmail(attributes.getEmail());
        Member member = null;

        if (user.isEmpty()) {
            member = Member.builder()
                    .name(attributes.getName())
                    .email(attributes.getEmail())
                    .role(UserRole.SUPPORTER)
                    .build();
            memberRepository.save(member);
        } else {
            member = user.get();
        }

        return member;
    }

}

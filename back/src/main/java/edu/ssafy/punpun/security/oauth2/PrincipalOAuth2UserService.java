package edu.ssafy.punpun.security.oauth2;

import java.util.Optional;

import javax.transaction.Transactional;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.repository.ChildRepository;
import edu.ssafy.punpun.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PrincipalOAuth2UserService extends DefaultOAuth2UserService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final ChildRepository childRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2UserService<OAuth2UserRequest, OAuth2User> service = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = service.loadUser(userRequest); // Oath2 정보를 가져옴

        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // 소셜 정보 가져옴
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        OAuth2Attributes attributes = OAuth2Attributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        Optional<Member> member = memberRepository.findByEmail(attributes.getEmail());
        Member resultMember = null;
        Optional<Child> child = childRepository.findByEmail(attributes.getEmail());
        Child resultChild = null;

        if (child.isEmpty()) {
            // 학생이 아닌 경우
            if (member.isEmpty()) {
                // 멤버로 처음 가입하는 경우
                resultMember = Member.builder()
                        .name(attributes.getName())
                        .email(attributes.getEmail())
                        .role(UserRole.SUPPORTER)
                        .build();
                memberRepository.save(resultMember);
            } else {
                // 기존 회원인 경우
                resultMember = member.get();
            }
            // userPrincipal return
            return new PrincipalMemberDetail(resultMember, attributes);
        } else {
            // 학생인 경우
            resultChild = child.get();
            // userPrincipal return
            return new PrincipalChildDetail(resultChild, attributes);
        }

//        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority(user.getRole().toString())),
//                attributes.getAttributes(),
//                attributes.getNameAttributeKey());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String userEmail = username;
        Optional<Member> member = memberRepository.findByEmail(userEmail);
        Optional<Child> child = childRepository.findByEmail(userEmail);
        Member resultMember = null;
        Child resultChild = null;

        if (child.isEmpty()) {
            // 학생이 아닌 경우
            if (member.isEmpty()) {
                // 학생도 멤버도 아닌 경우
                throw new UsernameNotFoundException("user not Found");
            } else {
                // 멤버인 경우
                resultMember = member.get();
                return new PrincipalMemberDetail(resultMember);
            }
        } else {
            // 학생인 경우
            resultChild = child.get();
            return new PrincipalChildDetail(resultChild);
        }
    }
}

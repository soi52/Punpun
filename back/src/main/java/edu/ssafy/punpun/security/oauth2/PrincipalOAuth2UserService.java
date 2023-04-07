package edu.ssafy.punpun.security.oauth2;

import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Image;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.repository.ChildRepository;
import edu.ssafy.punpun.repository.ImageRepository;
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
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PrincipalOAuth2UserService extends DefaultOAuth2UserService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final ChildRepository childRepository;
    private final ImageRepository imageRepository;

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

        Map<String, String> map = (Map<String, String>) attributes.getAttributes().get("properties");
        Image image = null;

        if (child.isEmpty()) {
            // 학생이 아닌 경우
            if (member.isEmpty()) {
                // 멤버로 처음 가입하는 경우
                image = Image.builder()
                        .name(System.currentTimeMillis() + "_" + attributes.getName())
                        .url(map.get("profile_image"))
                        .build();
                imageRepository.save(image);

                resultMember = Member.builder()
                        .name(attributes.getName())
                        .email(attributes.getEmail())
                        .profile(image)
                        .build();
                memberRepository.save(resultMember);
            } else {
                // 기존 회원인 경우
                resultMember = member.get();

                image = imageRepository.findById(resultMember.getProfile().getId())
                        .orElseThrow(() -> new IllegalArgumentException("사용자 프로필의 이미지가 존재하지 않습니다."));
                image.updateImage(System.currentTimeMillis() + "_" + attributes.getName(), map.get("profile_image"));
                imageRepository.save(image);
            }
            // userPrincipal return
            return new PrincipalMemberDetail(resultMember, attributes);
        } else {
            // 학생인 경우
            resultChild = child.get();

            image = imageRepository.findById(resultChild.getProfile().getId())
                    .orElseThrow(() -> new IllegalArgumentException("사용자 프로필의 이미지가 존재하지 않습니다."));
            image.updateImage(System.currentTimeMillis() + "_" + attributes.getName(), map.get("profile_image"));
            imageRepository.save(image);

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
        Member resultMember = null;
        Optional<Child> child = childRepository.findByEmail(userEmail);
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

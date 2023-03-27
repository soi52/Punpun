package edu.ssafy.punpun.security.oauth2;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.Map;

@Getter
@ToString
public class OAuth2Attributes {
    // OAuth2UserService를 통해 가져온 카카오 OAuth2User의 attributes를 담을 클래스

    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String attributeId;
    private String name;
    private String email;

    @Builder
    public OAuth2Attributes(Map<String, Object> attributes, String nameAttributeKey, String attributeId, String name, String email) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.attributeId = attributeId;
        this.name = name;
        this.email = email;
    }

    public static OAuth2Attributes of(String socialName, String userNameAttributeName, Map<String, Object> attributes){
        // 카카오
        if("kakao".equals(socialName)){
//            return ofKakao("id", attributes);
            return ofKakao(userNameAttributeName, attributes);
        }
        return null;
    }

    private static OAuth2Attributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>)attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>)kakaoAccount.get("profile");

        return OAuth2Attributes.builder()
                .name((String) kakaoProfile.get("nickname"))
                .email((String) kakaoAccount.get("email"))
                .attributeId(attributes.get("id").toString())
                .nameAttributeKey(userNameAttributeName)
                .attributes(attributes)
                .build();
    }

//    public Member toEntity(){
//        return Member.builder()
//                .name(name)
//                .email(email)
//                .role(UserRole.SUPPORTER)
//                .build();
//    }
//
//    public Child toEntity() {
//        return Child.builder()
//                .name(name)
//                .email(email)
//                .role(UserRole.Child)
//                .build();
//    }
}

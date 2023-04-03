package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String profileName;
    private String profileImage;
    private String phoneNumber;
    private UserRole role;
    private Long supportedPoint;
    private Long remainPoint;

    public MemberResponseDTO(Member member) {
        this.id = member.getId();
        this.name = member.getName();
        this.email = member.getEmail();
        this.phoneNumber = member.getPhoneNumber();
        if (member.getProfile() != null) {
            this.profileName = member.getProfile().getName();
            this.profileImage = member.getProfile().getUrl();
        }
        this.role = member.getRole();
        this.supportedPoint = member.getSupportedPoint();
        this.remainPoint = member.getRemainPoint();
    }
}

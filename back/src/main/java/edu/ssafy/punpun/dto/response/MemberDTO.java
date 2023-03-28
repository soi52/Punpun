package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberDTO {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private UserRole role;
    private Long supportedPoint;
    private Long remainPoint;

    public MemberDTO(Member member) {
        this.id = member.getId();
        this.name = member.getName();
        this.email = member.getEmail();
        this.phoneNumber = member.getPhoneNumber();
        this.role = member.getRole();
        this.supportedPoint = member.getSupportedPoint();
        this.remainPoint = member.getRemainPoint();
    }
}

package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.request.MemberRequestDTO;
import edu.ssafy.punpun.dto.response.ChildDTO;
import edu.ssafy.punpun.dto.response.MemberDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.security.oauth2.PrincipalChildDetail;
import edu.ssafy.punpun.security.oauth2.PrincipalMemberDetail;
import edu.ssafy.punpun.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/child")
    @ResponseStatus(code = HttpStatus.OK)
    public ChildDTO getChildDetail(@AuthenticationPrincipal PrincipalChildDetail principalChildDetail) {
        Child child = principalChildDetail.getChild();
        return new ChildDTO(child);
    }

    @GetMapping("/member")
    @ResponseStatus(code = HttpStatus.OK)
    public MemberDTO getMemberDetail(@AuthenticationPrincipal PrincipalMemberDetail principalMemberDetail) {
        Member member = principalMemberDetail.getMember();
        return new MemberDTO(member);
    }

    @PatchMapping("/member/phone")
    @ResponseStatus(code = HttpStatus.OK)
    public void updateMemberInfo(@AuthenticationPrincipal PrincipalMemberDetail principalMemberDetail, @RequestBody MemberRequestDTO memberRequestDTO) {
        Member member = principalMemberDetail.getMember();
        String phoneNumber = memberRequestDTO.getPhoneNumber();

        userService.updateMemberInfo(member.getId(), phoneNumber);
    }
}

package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.repository.MemberRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
@DisplayName("사용자 서비스")
public class UserServiceImplTest {
    @Mock
    private MemberRepository memberRepository;
    @InjectMocks
    private UserServiceImpl userService;
    @Test
    @DisplayName("사용자 정보 (이름, 휴대폰 번호) 변경")
    void updateMemberInfo() {
        Member member = Member.builder()
                .name("memberTest")
                .email("memberTest@email.com")
//                .phoneNumber("01000000000")
                .role(UserRole.SUPPORTER)
                .build();

        Mockito.doReturn(Optional.of(member)).when(memberRepository).findById(member.getId());
        userService.updateMemberInfo(member.getId(), "member", "01011111111");

        Assertions.assertEquals(member.getName(), "member");
        Assertions.assertEquals(member.getPhoneNumber(), "01011111111");
    }
}

package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.response.ChildResponseDTO;
import edu.ssafy.punpun.dto.response.MemberResponseDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Image;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.repository.ChildRepository;
import edu.ssafy.punpun.repository.MemberRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("사용자 서비스")
public class UserServiceImplTest {
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private ChildRepository childRepository;
    @InjectMocks
    private UserServiceImpl userService;
    @Test
    @DisplayName("사용자(후원, 사장) 상세 정보")
    void getChildDetail() {
        Image image = Image.builder()
                .name("test")
                .url("testUrl").build();
        Child child = Child.builder()
                .id(1L)
                .name("childTest")
                .email("childTest@email.com")
                .phoneNumber("01011111111")
                .role(UserRole.CHILD)
                .profile(image)
                .build();

        doReturn(Optional.of(child)).when(childRepository).findById(child.getId());

        ChildResponseDTO childResponseDTO = userService.getChildDetail(child);

        Assertions.assertEquals(childResponseDTO.getName(), child.getName());
    }
    @Test
    @DisplayName("사용자(후원, 사장) 상세 정보")
    void getMemberDetail() {
        Image image = Image.builder()
                .name("test")
                .url("testUrl").build();
        Member member = Member.builder()
                .name("memberTest")
                .email("memberTest@email.com")
                .role(UserRole.SUPPORTER)
                .profile(image)
                .build();

        doReturn(Optional.of(member)).when(memberRepository).findById(member.getId());

        MemberResponseDTO memberResponseDTO = userService.getMemberDetail(member);

        Assertions.assertEquals(memberResponseDTO.getName(), member.getName());
    }
    @Test
    @DisplayName("사용자 정보 (이름, 휴대폰 번호) 변경")
    void updateMemberInfo() {
        Member member = Member.builder()
                .name("memberTest")
                .email("memberTest@email.com")
//                .phoneNumber("01000000000")
                .role(UserRole.SUPPORTER)
                .build();

        doReturn(Optional.of(member)).when(memberRepository).findById(member.getId());
        userService.updateMemberInfo(member.getId(), "member", "01011111111");

        Assertions.assertEquals(member.getName(), "member");
        Assertions.assertEquals(member.getPhoneNumber(), "01011111111");
    }
}

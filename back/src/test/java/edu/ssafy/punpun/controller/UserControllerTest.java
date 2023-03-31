package edu.ssafy.punpun.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import edu.ssafy.punpun.dto.request.MemberRequestDTO;
import edu.ssafy.punpun.dto.response.ChildResponseDTO;
import edu.ssafy.punpun.dto.response.MemberResponseDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.service.UserService;
import edu.ssafy.testutil.WIthCustomChild;
import edu.ssafy.testutil.WIthCustomSupporter;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@DisplayName("사용자 컨트롤러 테스트")
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private UserService userService;

    @Test
    @WIthCustomChild
    @DisplayName("get - 어린이 상세 정보")
    void getChildDetail() throws Exception {
        Child child = Child.builder()
                .id(1L)
                .name("name")
                .email("email@email.com")
                .role(UserRole.CHILD)
                .build();

        ChildResponseDTO childDTO = new ChildResponseDTO(child);
        String output = new ObjectMapper().writeValueAsString(childDTO);

        mockMvc.perform(get("/users/child"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(content().string(output))
                .andDo(print());

    }

    @Test
    @WIthCustomSupporter
    @DisplayName("get - 후원자, 사장 상세 정보")
    void getMemberDetail() throws Exception {
        Member member = Member.builder()
                .id(1L)
                .name("name")
                .email("email@email.com")
                .role(UserRole.SUPPORTER)
                .build();

        MemberResponseDTO memberDTO = new MemberResponseDTO(member);
        String output = new ObjectMapper().writeValueAsString(memberDTO);

        mockMvc.perform(get("/users/member"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(content().string(output))
                .andDo(print());
    }

    @Test
    @WIthCustomSupporter
    @DisplayName("patch - 사용자 정보 (이름, 휴대폰 번호) 변경")
    void updateMemberInfo() throws Exception {
        Member member = Member.builder()
                .id(1L)
                .name("name")
                .email("email@email.com")
                .role(UserRole.SUPPORTER)
                .build();

        MemberRequestDTO memberRequestDTO = new MemberRequestDTO("member", "01000000000");
        String input = new Gson().toJson(memberRequestDTO);

        doNothing().when(userService).updateMemberInfo(member.getId(), memberRequestDTO.getName(), memberRequestDTO.getPhoneNumber());

        mockMvc.perform(patch("/users/member/update")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(input))
                .andExpect(status().isOk())
                .andDo(print());
    }

}

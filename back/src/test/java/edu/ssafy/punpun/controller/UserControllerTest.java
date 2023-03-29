package edu.ssafy.punpun.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import edu.ssafy.punpun.dto.request.MemberRequestDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.service.UserService;
import edu.ssafy.testutil.WIthCustomChild;
import edu.ssafy.testutil.WIthCustomSupporter;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

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
    @DisplayName("Controller: test for User get Detail Child")
    void getChildDetail() throws Exception {
        Child child = Child.builder()
                .id(1L)
                .name("name")
                .email("email@email.com")
                .role(UserRole.CHILD)
                .build();

        mockMvc.perform(get("/users/child"))
                .andExpect(status().isOk())
                .andDo(print());

    }

    @Test
    @WIthCustomSupporter
    @DisplayName("Controller: test for User get Detail Member")
    void getMemberDetail() throws Exception {
        Member member = Member.builder()
                .id(1L)
                .name("name")
                .email("email@email.com")
                .role(UserRole.SUPPORTER)
                .build();

        mockMvc.perform(get("/users/member"))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    @WIthCustomSupporter
    @DisplayName("Controller: test for User update Member PhoneNumber")
    void updateMemberInfo() throws Exception {
        Member member = Member.builder()
                .id(1L)
                .name("name")
                .email("email@email.com")
                .role(UserRole.SUPPORTER)
                .build();

        MemberRequestDTO memberRequestDTO = new MemberRequestDTO("01000000000");
        String input = new Gson().toJson(memberRequestDTO);

        mockMvc.perform(patch("/users/member/phone")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(input))
                .andExpect(status().isOk())
                .andDo(print());
    }

}

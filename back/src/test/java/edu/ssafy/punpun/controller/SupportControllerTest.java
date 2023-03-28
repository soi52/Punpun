package edu.ssafy.punpun.controller;

import com.google.gson.Gson;
import edu.ssafy.punpun.dto.response.SupportResponseDTO;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.service.SupportService;
import edu.ssafy.testutil.WIthCustomSupporter;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@DisplayName("후원 컨트롤러 테스트")
@WebMvcTest(SupportController.class)
public class SupportControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SupportService supportService;

    @Test
    @WIthCustomSupporter
    @DisplayName("후원내역 리스트")
    void findSupport() throws Exception{
        Member member = Member.builder()
                .id(1L)
                .name("name")
                .email("email@email.com")
                .role(UserRole.SUPPORTER)
                .build();

        Support support1=Support.builder()
                .id(1L)
                .supportState(SupportState.SUPPORT)
                .supporter(member)
                .store(Store.builder()
                        .id(1L)
                        .name("test1")
                        .build())
                .menu(Menu.builder()
                        .id(1L)
                        .name("menuTest1")
                        .price(7500L)
                        .build())
                .build();
        support1.setCreatedDateTime(LocalDateTime.now());
        Support support2=Support.builder()
                .id(2L)
                .supportState(SupportState.SUPPORT)
                .supporter(member)
                .store(Store.builder()
                        .id(2L)
                        .name("test2")
                        .build())
                .menu(Menu.builder()
                        .id(2L)
                        .name("menuTest2")
                        .price(8000L)
                        .build())
                .build();
        support2.setCreatedDateTime(LocalDateTime.now());
        List<Support> supports= List.of(support1, support2);
        doReturn(List.of(support1, support2)).when(supportService).findSupport(any(Member.class));

        List<SupportResponseDTO > supportResponseDTOS= supports.stream()
                .map(SupportResponseDTO::new)
                .collect(Collectors.toList());
        String result=new Gson().toJson(supportResponseDTOS);

        mockMvc.perform(get("/supports")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string(result))
                .andDo(print());
    }
}

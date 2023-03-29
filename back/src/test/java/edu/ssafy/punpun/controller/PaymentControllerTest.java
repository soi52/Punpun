package edu.ssafy.punpun.controller;

import com.google.gson.Gson;
import edu.ssafy.punpun.dto.request.PointRequestDTO;
import edu.ssafy.punpun.dto.response.PointResponseDTO;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.service.PaymentService;
import edu.ssafy.testutil.WIthCustomSupporter;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@DisplayName("결제 컨트롤러 테스트")
@WebMvcTest(PaymentController.class)
public class PaymentControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PaymentService paymentService;

    @Test
    @WIthCustomSupporter(remainPoint = 10000L)
    @DisplayName("현재 포인트 내역")
    void getPoints() throws Exception{
        Member member = Member.builder()
                .id(1L)
                .name("name")
                .email("email@email.com")
                .role(UserRole.SUPPORTER)
                .remainPoint(10000L)
                .build();

        PointResponseDTO pointResponseDTO=new PointResponseDTO(member.getId(), member.getRemainPoint());

        String result=new Gson().toJson(pointResponseDTO);

        mockMvc.perform(get("/payments")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string(result))
                .andDo(print());
    }

    @Test
    @WIthCustomSupporter(remainPoint = 10000L)
    @DisplayName("포인트 충전")
    void savePoints() throws Exception{

        PointRequestDTO pointRequestDTO=new PointRequestDTO(30000L);
        doNothing().when(paymentService).updatePoints(any(Member.class), eq(pointRequestDTO.getPoint()));

        String input=new Gson().toJson(pointRequestDTO);

        mockMvc.perform(post("/payments")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(input))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    @WIthCustomSupporter(supportedPoint = 8000L)
    @DisplayName("후원 총 금액")
    void getTotalSupport() throws Exception{
        Member member = Member.builder()
                .id(1L)
                .name("name")
                .email("email@email.com")
                .role(UserRole.SUPPORTER)
                .remainPoint(10000L)
                .supportedPoint(8000L)
                .build();

        PointResponseDTO pointResponseDTO=new PointResponseDTO(member.getId(), member.getSupportedPoint());

        String result=new Gson().toJson(pointResponseDTO);

        mockMvc.perform(get("/payments/total")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string(result))
                .andDo(print());
    }

}

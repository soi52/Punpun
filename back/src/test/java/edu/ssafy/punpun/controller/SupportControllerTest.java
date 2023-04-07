package edu.ssafy.punpun.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import edu.ssafy.punpun.dto.request.SupportRequestDTO;
import edu.ssafy.punpun.dto.response.ShareResponseDTO;
import edu.ssafy.punpun.dto.response.SupportResponseDTO;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import edu.ssafy.punpun.entity.enumurate.SupportType;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.service.SupportService;
import edu.ssafy.testutil.WIthCustomOwner;
import edu.ssafy.testutil.WIthCustomSupporter;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
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
        LocalDate date= LocalDate.now();
        Member member = Member.builder()
                .id(1L)
                .name("name")
                .email("email@email.com")
                .role(UserRole.SUPPORTER)
                .build();

        Support support1=Support.builder()
                .id(1L)
                .supportDate(date)
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

        Support support2=Support.builder()
                .id(2L)
                .supportDate(date)
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

        SupportResponseDTO supportResponseDTO=new SupportResponseDTO(support1.getSupportDate(),support1.getStore().getId(), 2L, support1.getStore().getName(),  support1.getMenu().getId(), support1.getMenu().getName(), support1.getMenu().getPrice());
        SupportResponseDTO supportResponseDTO2=new SupportResponseDTO( support2.getSupportDate(),support2.getStore().getId(), 1L, support2.getStore().getName(),  support2.getMenu().getId(), support2.getMenu().getName(), support2.getMenu().getPrice());

        List<SupportResponseDTO> supports= List.of(supportResponseDTO, supportResponseDTO2);
        doReturn(supports).when(supportService).findSupport(any(Member.class));


        String result=new Gson().toJson(supports);

        mockMvc.perform(get("/supports")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string(result))
                .andDo(print());
    }

    @Test
    @WIthCustomSupporter
    @DisplayName("후원 결제")
    void supportPayment() throws Exception{
         SupportRequestDTO supportRequestDTO= new SupportRequestDTO(8000L, List.of(1L, 2L), List.of(1L,1L));
        doNothing().when(supportService).saveSupport(any(Member.class), eq(supportRequestDTO),  any(Integer.class));

        String input=new Gson().toJson(supportRequestDTO);

        mockMvc.perform(post("/supports/payment")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(input))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    @WIthCustomOwner
    @DisplayName("오늘의 나눔 등록")
    void ownerShare() throws Exception{
        SupportRequestDTO supportRequestDTO=new SupportRequestDTO(0L, List.of(1L, 2L), List.of(1L,1L));

        doNothing().when(supportService).saveSupport(any(Member.class), eq(supportRequestDTO),  any(Integer.class));

        String input=new Gson().toJson(supportRequestDTO);

        mockMvc.perform(post("/supports/share")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(input))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    @WIthCustomOwner
    @DisplayName("나눔 리스트-type")
    void findShareListType() throws Exception{
        LocalDate date=LocalDate.now();
        ShareResponseDTO shareResponseDTO1=new ShareResponseDTO(1L, SupportType.SHARE, date.toString(), 1L, "test1", 1L, 0L);
        ShareResponseDTO shareResponseDTO2=new ShareResponseDTO(2L, SupportType.SHARE, date.minusDays(1).toString(), 2L, "test2", 1L, 0L);
        PageRequest pageRequest=PageRequest.of(0,10);
        Page<ShareResponseDTO> shareResponseDTOS=new PageImpl<>(List.of(shareResponseDTO1, shareResponseDTO2),pageRequest, 2);

        doReturn(shareResponseDTOS).when(supportService).findShareList(any(Long.class), any(SupportType.class), any(Integer.class), isNull());

        String result=new ObjectMapper().writeValueAsString(shareResponseDTOS);

        mockMvc.perform(get("/supports/1?type=SHARE")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string(result))
                .andDo(print());
    }

    @Test
    @WIthCustomOwner
    @DisplayName("나눔 리스트-page")
    void findShareListTypePage() throws Exception{
        PageRequest pageRequest=PageRequest.of(0,10);
        Page<ShareResponseDTO> shareResponseDTOS=new PageImpl<>(List.of(),pageRequest, 0);

        doReturn(shareResponseDTOS).when(supportService).findShareList(any(Long.class), any(SupportType.class), any(Integer.class), isNull());

        String result=new ObjectMapper().writeValueAsString(shareResponseDTOS);

        mockMvc.perform(get("/supports/1?type=SHARE&page=1")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string(result))
                .andDo(print());
    }

    @Test
    @WIthCustomOwner
    @DisplayName("나눔 리스트-date")
    void findShareListTypeDate() throws Exception{
        LocalDate date=LocalDate.now();
        ShareResponseDTO shareResponseDTO=new ShareResponseDTO(1L, SupportType.SHARE, date.toString(), 1L, "test1", 1L, 0L);

        PageRequest pageRequest=PageRequest.of(0,10);
        Page<ShareResponseDTO> shareResponseDTOS=new PageImpl<>(List.of(shareResponseDTO),pageRequest, 1);

        doReturn(shareResponseDTOS).when(supportService).findShareList(any(Long.class), any(SupportType.class), any(Integer.class), any(LocalDate.class));

        String result=new ObjectMapper().writeValueAsString(shareResponseDTOS);

        mockMvc.perform(get("/supports/1?type=SHARE&date="+date.toString())
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string(result))
                .andDo(print());
    }
}

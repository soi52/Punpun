package edu.ssafy.punpun.controller;

import com.google.gson.Gson;
import edu.ssafy.punpun.dto.response.ErrorDTO;
import edu.ssafy.punpun.entity.Reservation;
import edu.ssafy.punpun.entity.enumurate.ReservationState;
import edu.ssafy.punpun.exception.AlreadyEndException;
import edu.ssafy.punpun.service.BookingService;
import edu.ssafy.testutil.WIthCustomChild;
import edu.ssafy.punpun.dto.request.BookingRequestDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("예약 컨트롤러 테스트")
@WebMvcTest(BookingController.class)
class BookingControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private BookingService bookingService;

    @Nested
    @DisplayName("예약 등록하기")
    public class ReservationApi {
        @Test
        @WIthCustomChild
        @DisplayName("성공")
        void registReservation() throws Exception {
            LocalDateTime now = LocalDateTime.now();
            Child child = Child.builder()
                    .id(1L)
                    .name("name")
                    .email("email@email.com")
                    .role(UserRole.CHILD)
                    .build();
            Reservation reservation = Reservation.builder()
                    .id(1L)
                    .state(ReservationState.BOOKING)
                    .build();

            doReturn(reservation).when(bookingService).reservation(child, 1L, now);

            BookingRequestDTO bookingRequestDTO = new BookingRequestDTO();
            bookingRequestDTO.setMenuId(1L);
            bookingRequestDTO.setReservationTime(now.toString());
            String input = new Gson().toJson(bookingRequestDTO);

            mockMvc.perform(post("/bookings")
                            .with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(input))
                    .andExpect(status().isCreated())
                    .andDo(print());
        }

        @Test
        @WIthCustomChild
        @DisplayName("실패 - 메뉴 없음")
        void reservationFailNoMenu() throws Exception {
            LocalDateTime now = LocalDateTime.now();
            Child child = Child.builder()
                    .id(1L)
                    .name("name")
                    .email("email@email.com")
                    .role(UserRole.CHILD)
                    .build();
            when(bookingService.reservation(any(Child.class), eq(1L), eq(now)))
                    .thenThrow(new IllegalArgumentException("없는 메뉴입니다."));

            BookingRequestDTO bookingRequestDTO = new BookingRequestDTO();
            bookingRequestDTO.setMenuId(1L);
            bookingRequestDTO.setReservationTime(now.toString());
            String input = new Gson().toJson(bookingRequestDTO);

            ErrorDTO errorDTO = new ErrorDTO(IllegalArgumentException.class.getName(), "없는 메뉴입니다.");
            String output = new Gson().toJson(errorDTO);

            mockMvc.perform(post("/bookings")
                            .with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(input))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().contentType("application/json;charset=UTF-8"))
                    .andExpect(content().string(output))
                    .andDo(print());
        }

        @Test
        @WIthCustomChild
        @DisplayName("실패 - 모두 예약됨")
        void reservationFailAllReservation() throws Exception {
            LocalDateTime now = LocalDateTime.now();
            Child child = Child.builder()
                    .id(1L)
                    .name("name")
                    .email("email@email.com")
                    .role(UserRole.CHILD)
                    .build();
            when(bookingService.reservation(any(), eq(1L), eq(now)))
                    .thenThrow(new AlreadyEndException("이미 모두 예약되었습니다."));

            BookingRequestDTO bookingRequestDTO = new BookingRequestDTO();
            bookingRequestDTO.setMenuId(1L);
            bookingRequestDTO.setReservationTime(now.toString());
            String input = new Gson().toJson(bookingRequestDTO);

            ErrorDTO errorDTO = new ErrorDTO(AlreadyEndException.class.getName(), "이미 모두 예약되었습니다.");
            String output = new Gson().toJson(errorDTO);

            mockMvc.perform(post("/bookings")
                            .with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(input))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().contentType("application/json;charset=UTF-8"))
                    .andExpect(content().string(output))
                    .andDo(print());
        }
    }
}
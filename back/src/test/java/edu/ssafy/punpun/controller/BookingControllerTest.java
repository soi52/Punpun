package edu.ssafy.punpun.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import edu.ssafy.punpun.dto.ApproveState;
import edu.ssafy.punpun.dto.BookingStoreSearchParamDTO;
import edu.ssafy.punpun.dto.request.BookingProcessRequestDTO;
import edu.ssafy.punpun.dto.response.BookingChildResponseDTO;
import edu.ssafy.punpun.dto.response.BookingStoreResponseDTO;
import edu.ssafy.punpun.dto.response.ErrorDTO;
import edu.ssafy.punpun.entity.*;
import edu.ssafy.punpun.entity.enumurate.ReservationState;
import edu.ssafy.punpun.exception.AlreadyEndException;
import edu.ssafy.punpun.service.BookingService;
import edu.ssafy.testutil.WIthCustomChild;
import edu.ssafy.punpun.dto.request.BookingRequestDTO;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.testutil.WIthCustomOwner;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

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
        @DisplayName("성공 - 2")
        void registReservation2() throws Exception {
            Reservation reservation = Reservation.builder()
                    .id(1L)
                    .state(ReservationState.BOOKING)
                    .build();

            doReturn(reservation).when(bookingService).reservation(any(Child.class), eq(1L), any(LocalDateTime.class));

            BookingRequestDTO bookingRequestDTO = new BookingRequestDTO();
            bookingRequestDTO.setMenuId(1L);
            bookingRequestDTO.setReservationTime("2023-03-29T09:48:57");
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

    @Nested
    @DisplayName("아동이 예약 찾기")
    public class getBookingsApi {

        @Test
        @WIthCustomChild
        @DisplayName("성공 - 파라미터 없음")
        void findReservationSuccess() throws Exception {
            Store store = Store.builder()
                    .id(1L)
                    .name("store")
                    .build();
            Menu menu = Menu.builder()
                    .id(1L)
                    .name("menu")
                    .store(store)
                    .build();
            Reservation res1 = Reservation.builder()
                    .id(1L)
                    .state(ReservationState.BOOKING)
                    .reservationTime(LocalDateTime.now())
                    .menu(menu)
                    .build();

            PageRequest pageable = PageRequest.of(0, 10);
            Page<Reservation> result = new PageImpl<>(List.of(res1), pageable, 1);
            doReturn(result).when(bookingService).findReservations(any(Child.class), isNull(), eq(0));

            Page<BookingChildResponseDTO> response = result
                    .map(BookingChildResponseDTO::entityToDto);
            String output = new ObjectMapper().writeValueAsString(response);

            mockMvc.perform(get("/bookings/child")
                            .with(csrf()))
                    .andExpect(status().isOk())
                    .andExpect(content().string(output))
                    .andDo(print());
        }

        @Test
        @WIthCustomChild
        @DisplayName("성공 - 페이지 바꿈")
        void findReservationChangePage() throws Exception {
            PageRequest pageable = PageRequest.of(1, 10);
            Page<Reservation> result = new PageImpl<>(List.of(), pageable, 0);
            doReturn(result).when(bookingService).findReservations(any(Child.class), isNull(), eq(1));

            Page<BookingChildResponseDTO> response = result
                    .map(BookingChildResponseDTO::entityToDto);
            String output = new ObjectMapper().writeValueAsString(response);

            mockMvc.perform(get("/bookings/child?page=1")
                            .with(csrf()))
                    .andExpect(status().isOk())
                    .andExpect(content().string(output))
                    .andDo(print());
        }

        @Test
        @WIthCustomChild
        @DisplayName("성공 - 날짜 바꿈")
        void findReservationChangeDate() throws Exception {
            LocalDateTime now = LocalDateTime.now().minusDays(1);
            Store store = Store.builder()
                    .id(1L)
                    .name("store")
                    .build();
            Menu menu = Menu.builder()
                    .id(1L)
                    .name("menu")
                    .store(store)
                    .build();
            Reservation res1 = Reservation.builder()
                    .id(1L)
                    .state(ReservationState.BOOKING)
                    .reservationTime(LocalDateTime.now().minusDays(1))
                    .menu(menu)
                    .build();

            PageRequest pageable = PageRequest.of(0, 10);
            Page<Reservation> result = new PageImpl<>(List.of(res1), pageable, 0);
            doReturn(result).when(bookingService).findReservations(any(Child.class), any(LocalDateTime.class), eq(0));

            Page<BookingChildResponseDTO> response = result
                    .map(BookingChildResponseDTO::entityToDto);
            String output = new ObjectMapper().writeValueAsString(response);

            mockMvc.perform(get("/bookings/child?localDateTime=" + now.toString())
                            .with(csrf()))
                    .andExpect(status().isOk())
                    .andExpect(content().string(output))
                    .andDo(print());
        }
    }

    @Nested
    @DisplayName("가게가 받은 리뷰 찾기")
    public class getBookingByStore {
        @Test
        @WIthCustomOwner
        @DisplayName("성공")
        void findReservationDefault() throws Exception {
            Child child = Child.builder()
                    .id(1L)
                    .name("name")
                    .build();
            Store store = Store.builder()
                    .id(1L)
                    .name("test")
                    .build();
            Menu menu = Menu.builder()
                    .id(1L)
                    .name("Test")
                    .store(store)
                    .build();
            Reservation reservation = Reservation.builder()
                    .id(1L)
                    .state(ReservationState.BOOKING)
                    .reservationTime(LocalDateTime.now())
                    .menu(menu)
                    .child(child)
                    .build();

            PageRequest pageable = PageRequest.of(0, 10);
            PageImpl<Reservation> result = new PageImpl<>(List.of(reservation), pageable, 1);

            //TODO : LccalDateTime 때문에 안좋은 테스트 Params가 제대로 바뀌는지 확인이 안되기 때문!
            doReturn(result).when(bookingService).findAllByStore(any(Member.class), any(BookingStoreSearchParamDTO.class));

            Page<BookingStoreResponseDTO> response = result
                    .map(BookingStoreResponseDTO::entityToDto);
            String output = new ObjectMapper().writeValueAsString(response);

            mockMvc.perform(get("/bookings/store/1")
                            .with(csrf())
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().string(output))
                    .andDo(print());
        }

    }

    @Nested
    @DisplayName("예약 승인, 거절하기")
    public class ProcessReservation {
        @Test
        @WIthCustomOwner
        @DisplayName("승낙하기")
        void approveReservation() throws Exception {
            doNothing().when(bookingService).reservationApprove(eq(1L), any(Member.class), eq(ApproveState.OK));

            BookingProcessRequestDTO requestDto = new BookingProcessRequestDTO(1L, ApproveState.OK);
            String input = new ObjectMapper().writeValueAsString(requestDto);

            mockMvc.perform(post("/bookings/today")
                            .with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(input))
                    .andExpect(status().isCreated())
                    .andDo(print());
        }

        @Test
        @WIthCustomOwner
        @DisplayName("거절하기")
        void rejectReservation() throws Exception {
            doNothing().when(bookingService).reservationApprove(eq(1L), any(Member.class), eq(ApproveState.NO));

            BookingProcessRequestDTO requestDto = new BookingProcessRequestDTO(1L, ApproveState.NO);
            String input = new ObjectMapper().writeValueAsString(requestDto);

            mockMvc.perform(post("/bookings/today")
                            .with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(input))
                    .andExpect(status().isCreated())
                    .andDo(print());
        }
    }
}
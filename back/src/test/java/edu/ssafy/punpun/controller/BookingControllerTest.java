package edu.ssafy.punpun.controller;

import com.google.gson.Gson;
import edu.ssafy.punpun.dto.response.ErrorDTO;
import edu.ssafy.punpun.exception.AlreadyEndException;
import edu.ssafy.punpun.kafka.ReservationEventPublisher;
import edu.ssafy.punpun.service.BookingServiceImpl;
import edu.ssafy.testutil.WIthCustomChild;
import edu.ssafy.punpun.dto.request.BookingRequestDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.repository.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
    @SpyBean
    private BookingServiceImpl bookingService;
    @MockBean
    private MenuRepository menuRepository;
    @MockBean
    private SupportRepository supportRepository;
    @MockBean
    private ReservationRepository reservationRepository;
    @MockBean
    private SupportReservationRepository supportReservationRepository;
    @MockBean
    private ReservationEventPublisher publisher;

    @Nested
    @DisplayName("예약 등록하기")
    public class Reservation {
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
            Menu menu = Menu.builder()
                    .id(1L)
                    .build();
            Support support = Support.builder()
                    .menu(menu)
                    .supportState(SupportState.SUPPORT)
                    .build();

            //아무것도 안하는 애들
            doReturn(null).when(reservationRepository).save(any());
            doReturn(null).when(supportReservationRepository).save(any());
            doNothing().when(publisher).publish(any());

            doReturn(Optional.of(menu)).when(menuRepository).findById(1L);
            doReturn(List.of(support)).when(supportRepository).findAllByMenu(menu);
            bookingService = new BookingServiceImpl(supportReservationRepository, reservationRepository, supportRepository, menuRepository, publisher);

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

            verify(reservationRepository, times(1)).save(any());
            verify(supportReservationRepository, times(1)).save(any());
            verify(publisher, times(1)).publish(any());
        }

        @Test
        @WIthCustomChild
        @DisplayName("실패 - 메뉴 없음")
        void reservationFailNoMenu() throws Exception {
            LocalDateTime now = LocalDateTime.now();

            doReturn(null).when(supportRepository).findAllByMenu(any());
            doReturn(null).when(reservationRepository).save(any());
            doReturn(null).when(supportReservationRepository).save(any());
            doNothing().when(publisher).publish(any());

            doReturn(Optional.empty()).when(menuRepository).findById(1L);
            bookingService = new BookingServiceImpl(supportReservationRepository, reservationRepository, supportRepository, menuRepository, publisher);

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

            verify(supportRepository, times(0)).save(any());
            verify(reservationRepository, times(0)).save(any());
            verify(supportReservationRepository, times(0)).save(any());
            verify(publisher, times(0)).publish(any());
        }

        @Test
        @WIthCustomChild
        @DisplayName("실패 - 모두 예약됨")
        void reservationFailAllReservation() throws Exception {
            LocalDateTime now = LocalDateTime.now();
            Menu menu = Menu.builder()
                    .id(1L)
                    .build();
            Support support = Support.builder()
                    .menu(menu)
                    .supportState(SupportState.BOOKING)
                    .build();

            doReturn(null).when(reservationRepository).save(any());
            doReturn(null).when(supportReservationRepository).save(any());
            doNothing().when(publisher).publish(any());

            doReturn(Optional.of(menu)).when(menuRepository).findById(1L);
            doReturn(List.of(support)).when(supportRepository).findAllByMenu(menu);
            bookingService = new BookingServiceImpl(supportReservationRepository, reservationRepository, supportRepository, menuRepository, publisher);

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

            verify(reservationRepository, times(0)).save(any());
            verify(supportReservationRepository, times(0)).save(any());
            verify(publisher, times(0)).publish(any());
        }
    }
}
package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Reservation;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.ReservationState;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import edu.ssafy.punpun.exception.AlreadyEndException;
import edu.ssafy.punpun.kafka.ReservationEventPublisher;
import edu.ssafy.punpun.repository.MenuRepository;
import edu.ssafy.punpun.repository.ReservationRepository;
import edu.ssafy.punpun.repository.SupportRepository;
import edu.ssafy.punpun.repository.SupportReservationRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookingServiceImplTest {
    @Mock
    private SupportReservationRepository supportReservationRepository;
    @Mock
    private ReservationRepository reservationRepository;
    @Mock
    private SupportRepository supportRepository;
    @Mock
    private MenuRepository menuRepository;
    @Mock
    private ReservationEventPublisher publisher;
    @InjectMocks
    BookingServiceImpl bookingService;

    @Test
    @DisplayName("예약이 정상처리 되었을 때")
    void bookingSuccess() {
        //given
        //mocking
        Menu menu = Menu.builder()
                .id(1L)
                .build();
        doReturn(Optional.of(menu)).when(menuRepository).findById(1L);

        Support support1 = getSupport(1L, SupportState.END, menu);
        Support support2 = getSupport(2L, SupportState.END, menu);
        Support support3 = getSupport(3L, SupportState.SUPPORT, menu);
        doReturn(List.of(support1, support2, support3)).when(supportRepository).findAllByMenu(menu);

        Child child = Child.builder()
                .id(1L)
                .build();

        LocalDateTime now = LocalDateTime.now();
        //when
        Reservation reservation = bookingService.reservation(child, 1L, now);

        //then
        verify(supportReservationRepository, times(1)).save(any());
        verify(reservationRepository, times(1)).save(any());
        verify(publisher, times(1)).publish(any());

        assertThat(reservation.getReservationTime()).isEqualTo(now);
        assertThat(reservation.getChild()).isEqualTo(child);
        assertThat(reservation.getMenu()).isEqualTo(menu);
        assertThat(reservation.getState()).isEqualTo(ReservationState.BOOKING);
    }


    @Test
    @DisplayName("없는 메뉴를 조회할 때")
    void bookingNoMenu() {
        //given
        //mocking
        doReturn(Optional.empty()).when(menuRepository).findById(2L);
        Child child = Child.builder()
                .id(1L)
                .build();
        LocalDateTime now = LocalDateTime.now();
        //when
        assertThatThrownBy(() -> bookingService.reservation(child, 2L, now))
                .isInstanceOf(IllegalArgumentException.class);

        //then
        verify(supportReservationRepository, never()).save(any());
        verify(reservationRepository, never()).save(any());
        verify(publisher, never()).publish(any());
    }

    @Test
    @DisplayName("모든 후원이 예약되었을 때")
    void alreadyBookingAllSupport() {
        //given
        //mocking
        Menu menu = Menu.builder()
                .id(1L)
                .build();
        doReturn(Optional.of(menu)).when(menuRepository).findById(1L);

        Support support1 = getSupport(1L, SupportState.END, menu);
        Support support2 = getSupport(2L, SupportState.BOOKING, menu);
        Support support3 = getSupport(3L, SupportState.END, menu);
        doReturn(List.of(support1, support2, support3)).when(supportRepository).findAllByMenu(menu);
        Child child = Child.builder()
                .id(1L)
                .build();
        LocalDateTime now = LocalDateTime.now();
        //when
        assertThatThrownBy(() -> bookingService.reservation(child, 1L, now))
                .isInstanceOf(AlreadyEndException.class);

        //then
        verify(supportReservationRepository, never()).save(any());
        verify(reservationRepository, never()).save(any());
        verify(publisher, never()).publish(any());
    }

    private static Support getSupport(Long id, SupportState state, Menu menu) {
        return Support.builder()
                .id(id)
                .supportState(state)
                .menu(menu)
                .build();
    }
}
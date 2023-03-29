package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.ApproveState;
import edu.ssafy.punpun.dto.BookingStoreSearchParamDTO;
import edu.ssafy.punpun.entity.*;
import edu.ssafy.punpun.entity.enumurate.ReservationState;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import edu.ssafy.punpun.exception.AlreadyEndException;
import edu.ssafy.punpun.exception.NotStoreOwnerException;
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
@DisplayName("예약 서비스")
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
        verify(publisher, times(1)).publish(any(), any());

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
        verify(publisher, never()).publish(any(), any());
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
        verify(publisher, never()).publish(any(), any());
    }

    @Test
    @DisplayName("날짜 검색 호출")
    void findByDate() {
        doReturn(null).when(reservationRepository).findAllByDate(null, null, 0);
        bookingService.findReservations(null, null, 0);

        verify(reservationRepository, times(1)).findAllByDate(null, null, 0);
    }

    @Test
    @DisplayName("자기가 가게의 주인이 아닌데 요청을 보냈을 때")
    void findByStoreNotOwner() {
        Store store1 = Store.builder()
                .id(1L)
                .build();
        Store store2 = Store.builder()
                .id(2L)
                .build();
        Member owner = Member.builder()
                .stores(List.of(store1, store2))
                .build();
        BookingStoreSearchParamDTO params = BookingStoreSearchParamDTO.builder()
                .storeId(3L)
                .page(0)
                .build();

        assertThatThrownBy(() -> bookingService.findAllByStore(owner, params))
                .isInstanceOf(NotStoreOwnerException.class);
    }

    @Test
    @DisplayName("가게 주인이 정상 요청을 보냈을 때")
    void findByStore() {
        Store store1 = Store.builder()
                .id(1L)
                .build();
        Store store2 = Store.builder()
                .id(2L)
                .build();
        Member owner = Member.builder()
                .stores(List.of(store1, store2))
                .build();
        BookingStoreSearchParamDTO params = BookingStoreSearchParamDTO.builder()
                .storeId(2L)
                .page(0)
                .build();

        doReturn(null).when(reservationRepository).findAllByStore(params);
        bookingService.findAllByStore(owner, params);

        verify(reservationRepository, times(1)).findAllByStore(params);
    }

    @Test
    @DisplayName("예약을 수락하기")
    void reservationAccept() {
        Member owner = Member.builder()
                .id(1L)
                .build();
        Store store1 = Store.builder()
                .id(1L)
                .owner(owner)
                .build();
        Menu menu = Menu.builder()
                .id(1L)
                .store(store1)
                .build();
        Reservation reservation = Reservation.builder()
                .id(1L)
                .state(ReservationState.BOOKING)
                .menu(menu)
                .build();
        doReturn(Optional.of(reservation)).when(reservationRepository).findById(1L);
        bookingService.reservationApprove(1L, owner, ApproveState.OK);

        assertThat(reservation.getState()).isEqualTo(ReservationState.END);
    }

    @Test
    @DisplayName("예약을 거절하기")
    void reservationDenied() {
        Member owner = Member.builder()
                .id(1L)
                .build();
        Store store1 = Store.builder()
                .id(1L)
                .owner(owner)
                .build();
        Menu menu = Menu.builder()
                .id(1L)
                .store(store1)
                .build();
        Reservation reservation = Reservation.builder()
                .id(1L)
                .state(ReservationState.BOOKING)
                .menu(menu)
                .build();
        doReturn(Optional.of(reservation)).when(reservationRepository).findById(1L);
        bookingService.reservationApprove(1L, owner, ApproveState.NO);

        assertThat(reservation.getState()).isEqualTo(ReservationState.CANCEL);
    }

    @Test
    @DisplayName("가게의 주인이 아님")
    void notStoreOwner() {
        Member owner = Member.builder()
                .id(1L)
                .build();
        Member member = Member.builder()
                .id(2L)
                .build();
        Store store1 = Store.builder()
                .id(1L)
                .owner(owner)
                .build();
        Menu menu = Menu.builder()
                .id(1L)
                .store(store1)
                .build();
        Reservation reservation = Reservation.builder()
                .id(1L)
                .state(ReservationState.BOOKING)
                .menu(menu)
                .build();

        doReturn(Optional.of(reservation)).when(reservationRepository).findById(1L);
        assertThatThrownBy(() -> bookingService.reservationApprove(1L, member, ApproveState.OK))
                .isInstanceOf(NotStoreOwnerException.class);

    }

    @Test
    @DisplayName("없는 예약 번호로 예약하기")
    void reservationIdNotExist() {
        Member owner = Member.builder()
                .id(1L)
                .build();
        Store store1 = Store.builder()
                .id(1L)
                .owner(owner)
                .build();
        Menu menu = Menu.builder()
                .id(1L)
                .store(store1)
                .build();
        Reservation reservation = Reservation.builder()
                .id(1L)
                .state(ReservationState.BOOKING)
                .menu(menu)
                .build();

        doReturn(Optional.empty()).when(reservationRepository).findById(2L);
        assertThatThrownBy(() -> bookingService.reservationApprove(2L, owner, ApproveState.OK))
                .isInstanceOf(IllegalArgumentException.class);
    }

    private static Support getSupport(Long id, SupportState state, Menu menu) {
        return Support.builder()
                .id(id)
                .supportState(state)
                .menu(menu)
                .build();
    }
}
package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Reservation;
import edu.ssafy.punpun.entity.enumurate.ReservationState;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;

import javax.transaction.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;

import static org.assertj.core.api.Assertions.*;

@Transactional
@SpringBootTest
class ReservationRepositoryImplTest {
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private MenuRepository menuRepository;
    @Autowired
    private ChildRepository childRepository;
    private Menu menu;
    private Child child;
    private LocalDateTime now;

    @BeforeEach
    private void init() {
        menu = Menu.builder()
                .name("test")
                .build();
        menuRepository.save(menu);
        child = Child.builder()
                .name("test")
                .build();
        childRepository.save(child);
        now = LocalDateTime.now();
        makeReservation(now); //오늘
        makeReservation(now.toLocalDate().atStartOfDay()); //오늘 시작
        makeReservation(now.toLocalDate().atStartOfDay().plusDays(1)); //내일 시작
        makeReservation(now.toLocalDate().atTime(LocalTime.MAX).withNano(0)); //오늘 제일 끝
        makeReservation(now.plusDays(1)); //내일 이시간
        makeReservation(now.minusDays(1)); //어제 이시간
    }

    @AfterEach
    void deleteAll() {
        reservationRepository.deleteAll();
    }

    @Test
    @DisplayName("오늘 날짜 기준으로 검색")
    void findByLocalDateTime() {
        Page<Reservation> reservations = reservationRepository.findAllByDate(child, now, 0);
        assertThat(reservations.getContent().size()).isEqualTo(3);
        assertThat(reservations.getTotalElements()).isEqualTo(3);
        assertThat(reservations.getTotalPages()).isEqualTo(1);
    }

    @Test
    @DisplayName("내일 날짜 기준으로 검색")
    void findByTomorrow() {
        Page<Reservation> reservations = reservationRepository.findAllByDate(child, now.plusDays(1), 0);
        assertThat(reservations.getContent().size()).isEqualTo(2);
        assertThat(reservations.getTotalElements()).isEqualTo(2);
        assertThat(reservations.getTotalPages()).isEqualTo(1);
    }

    @Test
    @DisplayName("어제 날짜 기준으로 검색")
    void findByYesterday() {
        Page<Reservation> reservations = reservationRepository.findAllByDate(child, now.minusDays(1), 0);
        assertThat(reservations.getContent().size()).isEqualTo(1);
        assertThat(reservations.getTotalElements()).isEqualTo(1);
        assertThat(reservations.getTotalPages()).isEqualTo(1);
    }

    @Test
    @DisplayName("날짜 없이 모두 검색")
    void findAllNoDate() {
        Page<Reservation> reservations = reservationRepository.findAllByDate(child, null, 0);
        assertThat(reservations.getContent().size()).isEqualTo(6);
        assertThat(reservations.getTotalElements()).isEqualTo(6);
        assertThat(reservations.getTotalPages()).isEqualTo(1);
    }

    @Test
    @DisplayName("없는 날짜로 검색")
    void findNoDate() {
        Page<Reservation> reservations = reservationRepository.findAllByDate(child, now.minusDays(2), 0);
        assertThat(reservations.getContent().size()).isEqualTo(0);
        assertThat(reservations.getTotalElements()).isEqualTo(0);
        assertThat(reservations.getTotalPages()).isEqualTo(0);
    }

    private void makeReservation(LocalDateTime time) {
        Reservation reservation = Reservation.builder()
                .menu(menu)
                .state(ReservationState.BOOKING)
                .child(child)
                .reservationTime(time)
                .build();
        reservationRepository.save(reservation);
    }
}
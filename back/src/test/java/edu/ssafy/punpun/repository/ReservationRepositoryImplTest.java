package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.dto.BookingSearchParamDTO;
import edu.ssafy.punpun.dto.response.BookingStoreResponseDTO;
import edu.ssafy.punpun.entity.*;
import edu.ssafy.punpun.entity.enumurate.ReservationState;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;

import javax.transaction.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;

import static org.assertj.core.api.Assertions.*;

@Transactional
@SpringBootTest
@DisplayName("예약 레포지토리")
class ReservationRepositoryImplTest {
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private MenuRepository menuRepository;
    @Autowired
    private ChildRepository childRepository;
    @Autowired
    private StoreRepository storeRepository;
    @Autowired
    private MemberRepository memberRepository;

    private Child child;
    private LocalDateTime now;

    @Nested
    @DisplayName("아이들이 날짜를 기준으로 예약 검색할 떄")
    class FindAll {
        private Menu menu1;
        private Store store1;

        @BeforeEach
        public void init() {
            store1 = Store.builder()
                    .name("test store 1")
                    .build();
            storeRepository.save(store1);
            menu1 = Menu.builder()
                    .name("test")
                    .store(store1)
                    .build();
            menuRepository.save(menu1);
            child = Child.builder()
                    .name("test")
                    .build();
            childRepository.save(child);
            now = LocalDateTime.now();
            //for FindAll
            makeReservation(now, menu1); //오늘
            makeReservation(now.toLocalDate().atStartOfDay(), menu1); //오늘 시작
            makeReservation(now.toLocalDate().atStartOfDay().plusDays(1), menu1); //내일 시작
            makeReservation(now.toLocalDate().atTime(LocalTime.MAX).withNano(0), menu1); //오늘 제일 끝
            makeReservation(now.plusDays(1), menu1); //내일 이시간
            makeReservation(now.minusDays(1), menu1); //어제 이시간
        }

        @AfterEach
        void deleteAll() {
            reservationRepository.deleteAll();
            storeRepository.deleteAll();
            menuRepository.deleteAll();
            childRepository.deleteAll();
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
    }

    @Nested
    @DisplayName("사장님이 예약을 검색할 때")
    class FindByStore {
        private Menu menu1;
        private Menu menu2;
        private Store store1;
        private Store store2;
        private Member owner1;
        private Member owner2;

        @BeforeEach
        public void init() {
            owner1 = Member.builder()
                    .name("owner")
                    .build();
            memberRepository.save(owner1);

            store1 = Store.builder()
                    .name("test store 1")
                    .owner(owner1)
                    .build();
            store2 = Store.builder()
                    .name("test store 2")
                    .build();
            storeRepository.save(store1);
            storeRepository.save(store2);

            menu1 = Menu.builder()
                    .name("test")
                    .store(store1)
                    .build();
            menu2 = Menu.builder()
                    .name("test2")
                    .store(store2)
                    .build();
            menuRepository.save(menu1);
            menuRepository.save(menu2);

            child = Child.builder()
                    .name("test")
                    .build();
            childRepository.save(child);
            now = LocalDateTime.now();

            makeReservation(now, menu1); //오늘
            makeReservation(now.toLocalDate().atStartOfDay(), menu1); //오늘 시작
            makeReservation(now.toLocalDate().atStartOfDay().plusDays(1), menu1); //내일 시작
            makeReservation(now.toLocalDate().atTime(LocalTime.MAX).withNano(0), menu1); //오늘 제일 끝
            makeReservation(now.plusDays(1), menu1); //내일 이시간
            makeReservation(now.minusDays(1), menu1); //어제 이시간
            makeReservation(now, menu2); //오늘
            makeReservation(now.toLocalDate().atStartOfDay(), menu2); //오늘 시작
            makeReservation(now.toLocalDate().atStartOfDay().plusDays(1), menu2); //내일 시작
            makeReservation(now.toLocalDate().atTime(LocalTime.MAX).withNano(0), menu2); //오늘 제일 끝
            makeReservation(now.plusDays(1), menu2); //내일 이시간
            makeReservation(now.minusDays(1), menu2); //어제 이시간
        }

        @AfterEach
        public void deleteAll() {
            reservationRepository.deleteAll();
            storeRepository.deleteAll();
            menuRepository.deleteAll();
            childRepository.deleteAll();
        }

        @Test
        @DisplayName("나의 가계에 모든 예약을 검색")
        void findAllResOnStore() {
            BookingSearchParamDTO params = BookingSearchParamDTO.builder()
                    .storeId(store1.getId())
                    .page(0)
                    .build();
            Page<Reservation> reservations = reservationRepository.findAllByStore(params);
            assertThat(reservations.getContent().size()).isEqualTo(6);
            assertThat(reservations.getTotalElements()).isEqualTo(6);
            assertThat(reservations.getTotalPages()).isEqualTo(1);
        }

        @Test
        @DisplayName("나의 가게의 특정 날짜의 예약 검색")
        void findNotOwner() {
            BookingSearchParamDTO params = BookingSearchParamDTO.builder()
                    .storeId(store1.getId())
                    .page(0)
                    .reservationDate(now)
                    .build();
            Page<Reservation> reservations = reservationRepository.findAllByStore(params);
            assertThat(reservations.getContent().size()).isEqualTo(3);
            assertThat(reservations.getTotalElements()).isEqualTo(3);
            assertThat(reservations.getTotalPages()).isEqualTo(1);
        }

        @Test
        @DisplayName("예약 상태로 검색하기 - 결과 있음")
        void findByStoreAndStateExist() {
            BookingSearchParamDTO params = BookingSearchParamDTO.builder()
                    .storeId(store1.getId())
                    .state(ReservationState.BOOKING)
                    .page(0)
                    .build();
            Page<Reservation> reservations = reservationRepository.findAllByStore(params);
            assertThat(reservations.getContent().size()).isEqualTo(6);
            assertThat(reservations.getTotalElements()).isEqualTo(6);
            assertThat(reservations.getTotalPages()).isEqualTo(1);
        }

        @Test
        @DisplayName("예약 상태로 검색하기 - 결과 없음")
        void findByStoreAndStateNotExist() {
            BookingSearchParamDTO params = BookingSearchParamDTO.builder()
                    .storeId(store1.getId())
                    .state(ReservationState.END)
                    .page(0)
                    .build();
            Page<Reservation> reservations = reservationRepository.findAllByStore(params);
            assertThat(reservations.getContent().size()).isEqualTo(0);
            assertThat(reservations.getTotalElements()).isEqualTo(0);
            assertThat(reservations.getTotalPages()).isEqualTo(0);
        }
    }

    private void makeReservation(LocalDateTime time, Menu menu) {
        Reservation reservation = Reservation.builder()
                .menu(menu)
                .state(ReservationState.BOOKING)
                .child(child)
                .reservationTime(time)
                .build();
        reservationRepository.save(reservation);
    }
}
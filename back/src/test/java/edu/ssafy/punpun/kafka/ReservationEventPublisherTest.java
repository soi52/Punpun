package edu.ssafy.punpun.kafka;

import edu.ssafy.punpun.entity.*;
import edu.ssafy.punpun.event.EventType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.test.context.EmbeddedKafka;

import java.time.LocalDateTime;

@EmbeddedKafka(partitions = 1,
        brokerProperties = {"listener=PLAINTEXT://localhost:9092"},
        ports = {9092})
@SpringBootTest
@ExtendWith(MockitoExtension.class)
class ReservationEventPublisherTest {
    @Autowired
    private ReservationEventPublisher publisher;

    @Test
    @DisplayName("이벤트 발급 성공 - 예약 이벤트")
    void publishReservationEvent() {
        Member owner = Member.builder()
                .id(1L)
                .build();
        Store store = Store.builder()
                .owner(owner)
                .build();
        Menu menu = Menu.builder()
                .id(1L)
                .store(store)
                .build();

        LocalDateTime now = LocalDateTime.now();
        Reservation reservation = Reservation.builder()
                .id(1L)
                .menu(menu)
                .reservationTime(now)
                .build();
        //when
        publisher.publish(reservation, EventType.RESERVATION);
    }

    @Test
    @DisplayName("이벤트 발급 성공 - 수락 이벤트")
    void publishApproveEvent() {
        Child child = Child.builder()
                .id(1L)
                .name("name")
                .build();
        Member owner = Member.builder()
                .id(1L)
                .name("test")
                .build();
        Store store = Store.builder()
                .owner(owner)
                .build();
        Menu menu = Menu.builder()
                .id(1L)
                .store(store)
                .build();

        LocalDateTime now = LocalDateTime.now();
        Reservation reservation = Reservation.builder()
                .id(1L)
                .menu(menu)
                .child(child)
                .reservationTime(now)
                .build();
        //when
        publisher.publish(reservation, EventType.APPROVE);
    }

//    @Test
//    @DisplayName("이벤트 발급 실패")
//    void publishEventFail() {
//    }
}
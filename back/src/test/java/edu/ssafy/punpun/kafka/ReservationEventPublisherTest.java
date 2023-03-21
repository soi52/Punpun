package edu.ssafy.punpun.kafka;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Reservation;
import edu.ssafy.punpun.entity.Store;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.test.context.EmbeddedKafka;

import java.time.LocalDateTime;

// TODO : 비지니스 로직 생기면 테스트 완성시키기
@EmbeddedKafka(partitions = 1,
        brokerProperties = {"listener=PLAINTEXT://localhost:9092"},
        ports = {9092})
@SpringBootTest
@ExtendWith(MockitoExtension.class)
class ReservationEventPublisherTest {
    @Autowired
    private ReservationEventPublisher publisher;

    @Test
    @DisplayName("이벤트 발급 성공")
    void publishEventSuccess() {
        //given
//        SettableListenableFuture<SendResult<String, ReservationEvent>> future = new SettableListenableFuture<>();
//        ListenableFutureCallback<SendResult<String, ReservationEvent>> callback = mock(ListenableFutureCallback.class);
////        future.setException(new RuntimeException());
//        future.set(any());
//        future.addCallback(callback);
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
        publisher.publish(reservation);
    }

//    @Test
//    @DisplayName("이벤트 발급 실패")
//    void publishEventFail() {
//    }
}
package edu.ssafy.punpun.kafka;

import edu.ssafy.punpun.dto.ReservationEvent;
import edu.ssafy.punpun.entity.Reservation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;


@Slf4j
@Component
@RequiredArgsConstructor
public class ReservationEventPublisher {
    private final KafkaTemplate<String, ReservationEvent> template;

    public void publish(Reservation reservation) {
        ListenableFuture<SendResult<String, ReservationEvent>> future = template.send("alarm", ReservationEvent.entityToEvent(reservation));
        future.addCallback(new ListenableFutureCallback<>() {
            @Override
            public void onSuccess(SendResult<String, ReservationEvent> result) {
                log.info("[Reservation ID = {}] Alarm Event Sent", reservation.getId());
            }

            @Override
            public void onFailure(Throwable ex) {
                log.warn("[Reservation ID = {}] Alarm Event Send Fail", reservation.getId());
            }
        });
    }
}

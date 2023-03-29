package edu.ssafy.punpun.kafka;

import edu.ssafy.punpun.event.AlarmEvent;
import edu.ssafy.punpun.event.ApproveEvent;
import edu.ssafy.punpun.event.EventType;
import edu.ssafy.punpun.event.ReservationEvent;
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
    private final KafkaTemplate<String, AlarmEvent> template;

    public void publish(Reservation reservation, EventType type) {
        AlarmEvent event;
        if (type == EventType.RESERVATION) {
            event = ReservationEvent.entityToEvent(reservation);
        } else {
            event = ApproveEvent.entityToEvent(reservation);
        }

        ListenableFuture<SendResult<String, AlarmEvent>> future = template.send("alarm", event);
        future.addCallback(new ListenableFutureCallback<>() {
            @Override
            public void onSuccess(SendResult<String, AlarmEvent> result) {
                log.info("[Reservation ID = {}] Alarm Event Sent", reservation.getId());
            }

            @Override
            public void onFailure(Throwable ex) {
                log.warn("[Reservation ID = {}] Alarm Event Send Fail", reservation.getId());
            }
        });
    }
}

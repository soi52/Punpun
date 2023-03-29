package edu.ssafy.punpun.event;

import edu.ssafy.punpun.entity.Reservation;
import edu.ssafy.punpun.entity.enumurate.ReservationState;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApproveEvent implements AlarmEvent {
    private EventType type;
    private String childName;
    private String menuName;
    private String storeName;
    private Long reservationId;
    private String reservationTime;
    private ReservationState state;
    private String childPhoneNumber;

    public static ApproveEvent entityToEvent(Reservation reservation) {
        return ApproveEvent.builder()
                .type(EventType.APPROVE)
                .childName(reservation.getChild().getName())
                .menuName(reservation.getMenu().getName())
                .storeName(reservation.getMenu().getStore().getName())
                .reservationId(reservation.getId())
                .reservationTime(reservation.getReservationTime().toString())
                .state(reservation.getState())
                .childPhoneNumber(reservation.getChild().getPhoneNumber())
                .build();
    }

}

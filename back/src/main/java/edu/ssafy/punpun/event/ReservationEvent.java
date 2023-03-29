package edu.ssafy.punpun.event;

import edu.ssafy.punpun.entity.Reservation;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReservationEvent implements AlarmEvent{
    private EventType type;
    private String storeOwnerPhoneNumber;
    private String menuName;
    private String reservationTime;

    public static ReservationEvent entityToEvent(Reservation reservation) {
        return ReservationEvent.builder()
                .type(EventType.RESERVATION)
                .storeOwnerPhoneNumber(reservation.getMenu().getStore().getOwner().getPhoneNumber())
                .menuName(reservation.getMenu().getName())
                .reservationTime(reservation.getReservationTime().toString())
                .build();
    }
}

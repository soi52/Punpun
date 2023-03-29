package edu.ssafy.punpun.event;

import edu.ssafy.punpun.entity.Reservation;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReservationEvent implements AlarmEvent {
    private EventType type;
    private String storeName;
    private String menuName;
    private String reservationTime;
    private String storeOwnerPhoneNumber;

    public static ReservationEvent entityToEvent(Reservation reservation) {
        return ReservationEvent.builder()
                .type(EventType.RESERVATION)
                .storeName(reservation.getMenu().getStore().getOwner().getName())
                .menuName(reservation.getMenu().getName())
                .reservationTime(reservation.getReservationTime().toString())
                .storeOwnerPhoneNumber(reservation.getMenu().getStore().getOwner().getPhoneNumber())
                .build();
    }
}

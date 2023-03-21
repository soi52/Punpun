package edu.ssafy.punpun.dto;

import edu.ssafy.punpun.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class ReservationEvent {
    private Long storeOwnerId;
    private Long menuId;
    private LocalDateTime reservationTime;

    public static ReservationEvent entityToEvent(Reservation reservation) {
        return ReservationEvent.builder()
                .storeOwnerId(reservation.getMenu().getStore().getOwner().getId())
                .menuId(reservation.getMenu().getId())
                .reservationTime(reservation.getReservationTime())
                .build();
    }
}

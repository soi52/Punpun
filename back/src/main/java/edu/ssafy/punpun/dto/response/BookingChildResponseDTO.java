package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Reservation;
import edu.ssafy.punpun.entity.enumurate.ReservationState;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
public class BookingChildResponseDTO {
    private Long reservationId;
    private ReservationState reservationState;
    private LocalDateTime reservationTime;
    private Long menuId;
    private String menuName;
    private Long storeId;
    private String storeName;

    public static BookingChildResponseDTO entityToDto(Reservation reservation) {
        return BookingChildResponseDTO.builder()
                .reservationId(reservation.getId())
                .reservationState(reservation.getState())
                .reservationTime(reservation.getReservationTime())
                .menuId(reservation.getMenu().getId())
                .menuName(reservation.getMenu().getName())
                .storeId(reservation.getMenu().getStore().getId())
                .storeName(reservation.getMenu().getStore().getName())
                .build();
    }
}

package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Reservation;
import edu.ssafy.punpun.entity.enumurate.ReservationState;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class BookingChildResponseDTO {
    private Long reservationId;
    private ReservationState reservationState;
    private String reservationTime;
    private Long menuId;
    private String menuName;
    private Long storeId;
    private String storeName;

    public static BookingChildResponseDTO entityToDto(Reservation reservation) {
        return BookingChildResponseDTO.builder()
                .reservationId(reservation.getId())
                .reservationState(reservation.getState())
                .reservationTime(reservation.getReservationTime().toString())
                .menuId(reservation.getMenu().getId())
                .menuName(reservation.getMenu().getName())
                .storeId(reservation.getMenu().getStore().getId())
                .storeName(reservation.getMenu().getStore().getName())
                .build();
    }
}

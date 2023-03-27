package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Reservation;
import edu.ssafy.punpun.entity.enumurate.ReservationState;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class BookingStoreResponseDTO {
    private Long reservationId;
    private ReservationState reservationSate;
    private LocalDateTime reservationTime;
    private Long menuId;
    private String menuName;
    private Long storeId;
    private String storeName;
    private Long childId;
    private String childName;

    public static BookingStoreResponseDTO entityToDTO(Reservation reservation) {
        return BookingStoreResponseDTO.builder()
                .reservationId(reservation.getId())
                .reservationSate(reservation.getState())
                .reservationTime(reservation.getReservationTime())
                .menuId(reservation.getMenu().getId())
                .menuName(reservation.getMenu().getName())
                .storeId(reservation.getMenu().getStore().getId())
                .storeName(reservation.getMenu().getStore().getName())
                .childId(reservation.getChild().getId())
                .childName(reservation.getChild().getName())
                .build();
    }
}
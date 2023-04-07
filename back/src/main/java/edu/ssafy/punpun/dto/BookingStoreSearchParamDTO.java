package edu.ssafy.punpun.dto;

import edu.ssafy.punpun.entity.enumurate.ReservationState;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class BookingStoreSearchParamDTO {
    private Long storeId;
    private LocalDateTime reservationDate;
    private int page;
    private ReservationState state;
}

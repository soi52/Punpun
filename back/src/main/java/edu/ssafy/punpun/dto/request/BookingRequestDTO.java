package edu.ssafy.punpun.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookingRequestDTO {
    private Long menuId;
    private LocalDateTime reservationTime;
}

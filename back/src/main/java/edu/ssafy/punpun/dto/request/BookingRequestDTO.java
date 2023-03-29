package edu.ssafy.punpun.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookingRequestDTO {
    private Long menuId;
    private String reservationTime;
}

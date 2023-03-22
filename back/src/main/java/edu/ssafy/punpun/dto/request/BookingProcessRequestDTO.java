package edu.ssafy.punpun.dto.request;

import edu.ssafy.punpun.dto.ApproveState;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BookingProcessRequestDTO {
    private Long bookingId;
    private ApproveState approveState;
}

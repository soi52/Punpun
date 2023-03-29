package edu.ssafy.punpun.dto.request;

import edu.ssafy.punpun.dto.ApproveState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BookingProcessRequestDTO {
    private Long bookingId;
    private ApproveState approveState;
}

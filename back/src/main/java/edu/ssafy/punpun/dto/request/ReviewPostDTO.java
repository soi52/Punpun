package edu.ssafy.punpun.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReviewPostDTO {
    private Long reservationId;
    private String content;
    private String keyword;
}

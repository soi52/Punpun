package edu.ssafy.punpun.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewPostDTO {
    private Long reservationId;
    private String content;
    private String keyword;
}

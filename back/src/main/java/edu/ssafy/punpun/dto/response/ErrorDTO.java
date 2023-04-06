package edu.ssafy.punpun.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public class ErrorDTO {
    private String name;
    private String message;
}

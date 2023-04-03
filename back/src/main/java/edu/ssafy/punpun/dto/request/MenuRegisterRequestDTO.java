package edu.ssafy.punpun.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MenuRegisterRequestDTO {
    private Long storeId;
    private String menuName;
    private Long menuPrice;
}

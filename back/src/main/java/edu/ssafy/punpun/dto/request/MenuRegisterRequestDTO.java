package edu.ssafy.punpun.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MenuRegisterRequestDTO {
    private Long storeId;
    private String menuName;
    private Long menuPrice;
}

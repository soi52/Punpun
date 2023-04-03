package edu.ssafy.punpun.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MenuUpdateRequestDTO {
    private Long menuId;
    private String menuName;
    private Long menuPrice;
}

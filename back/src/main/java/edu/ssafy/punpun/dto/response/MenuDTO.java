package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Menu;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MenuDTO {
    private Long menuId;
    private String menuName;
    private Long menuPrice;
    private Long menuCount;

    public MenuDTO(Menu menu) {
        this.menuId = menu.getId();
        this.menuName = menu.getName();
        this.menuPrice = menu.getPrice();
        this.menuCount = menu.getSponsoredCount();
    }
}

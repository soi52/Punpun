package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Menu;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FavoriteMenuDTO {
    private Long menuId;
    private String menuName;
    private Long menuPrice;
    private boolean favoriteMenu;

    public FavoriteMenuDTO(Menu menu, boolean favoriteMenu) {
        this.menuId = menu.getId();
        this.menuName = menu.getName();
        this.menuPrice = menu.getPrice();
        this.favoriteMenu = favoriteMenu;
    }
}

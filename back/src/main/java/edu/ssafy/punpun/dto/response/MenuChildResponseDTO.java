package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Menu;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MenuChildResponseDTO {
    private Long menuId;
    private String menuName;
    private Long menuPrice;
    private String menuImageName;
    private String menuImage;
    private Long menuSponsoredCount;
    private boolean favoriteMenu;

    public MenuChildResponseDTO(Menu menu, boolean favoriteMenu) {
        this.menuId = menu.getId();
        this.menuName = menu.getName();
        this.menuPrice = menu.getPrice();
        this.menuSponsoredCount = menu.getSponsoredCount();
        if (menu.getImage() != null) {
            this.menuImageName = menu.getImage().getName();
            this.menuImage = menu.getImage().getUrl();
        }
        this.favoriteMenu = favoriteMenu;
    }
}

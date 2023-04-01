package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteMenuResponseDTO {
    private Long storeId;
    private String storeName;
    private Long menuId;
    private String menuName;
    private String menuImageName;
    private String menuImage;

    public FavoriteMenuResponseDTO(Store store, Menu menu) {
        this.storeId = store.getId();
        this.storeName = store.getName();
        this.menuId = menu.getId();
        this.menuName = menu.getName();
        if (menu.getImage() != null) {
            this.menuImageName = menu.getImage().getName();
            this.menuImage = menu.getImage().getUrl();
        }
    }
}

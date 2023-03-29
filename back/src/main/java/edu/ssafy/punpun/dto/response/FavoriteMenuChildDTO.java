package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteMenuChildDTO {
    private Long storeId;
    private String storeName;
    private Long menuId;
    private String menuName;

    public FavoriteMenuChildDTO(Store store, Menu menu) {
        this.storeId = store.getId();
        this.storeName = store.getName();
        this.menuId = menu.getId();
        this.menuName = menu.getName();
    }
}

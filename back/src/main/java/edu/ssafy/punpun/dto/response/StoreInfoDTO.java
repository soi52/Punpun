package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class StoreInfoDTO {
    private Long storeId;
    private String storeName;
    private double storeLon;
    private double storeLat;
    private String storeInfo;
    private String storeImageName;
    private String storeImage;

    public StoreInfoDTO(Store store, List<MenuDTO> menuList) {
        this.storeId = store.getId();
        this.storeName = store.getName();
        this.storeInfo = store.getInfo();
        this.storeLon = store.getLon();
        this.storeLat = store.getLat();
        this.storeImageName = store.getImage().getName();
        this.storeImage = store.getImage().getUrl();
    }
}

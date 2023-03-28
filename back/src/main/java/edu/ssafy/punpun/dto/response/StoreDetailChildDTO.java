package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class StoreDetailChildDTO {
    private Long storeId;
    private String storeName;
    private String storeOpenTime;
    private String storeInfo;
    private String storeAddress;
    private double storeLon;
    private double storeLat;
    private String storeImageName;
    private String storeImage;
    private String storePhoneNumber;
    private List<FavoriteMenuDTO> favoriteMenuDTOList;

    public StoreDetailChildDTO(Store store, List<FavoriteMenuDTO> favoriteMenuDTOList) {
        this.storeId = store.getId();
        this.storeName = store.getName();
        this.storeOpenTime = store.getOpenTime();
        this.storeInfo = store.getInfo();
        this.storeAddress = store.getAddress();
        this.storeLon = store.getLon();
        this.storeLat = store.getLat();
        this.storeImageName = store.getImage().getName();
        this.storeImage = store.getImage().getUrl();
        this.storePhoneNumber = store.getPhoneNumber();
        this.favoriteMenuDTOList = favoriteMenuDTOList;
    }
}

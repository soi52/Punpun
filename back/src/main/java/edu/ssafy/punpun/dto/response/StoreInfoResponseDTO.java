package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StoreInfoResponseDTO {
    private Long storeId;
    private String storeName;
    private double storeLon;
    private double storeLat;
    private String storeInfo;
    private boolean storeAlwaysShare;
    private String storeImageName;
    private String storeImage;

    public StoreInfoResponseDTO(Store store) {
        this.storeId = store.getId();
        this.storeName = store.getName();
        this.storeInfo = store.getInfo();
        this.storeLon = store.getLon();
        this.storeLat = store.getLat();
        this.storeAlwaysShare = store.isAlwaysShare();
        if (store.getImage() != null) {
            this.storeImageName = store.getImage().getName();
            this.storeImage = store.getImage().getUrl();
        }
    }
}

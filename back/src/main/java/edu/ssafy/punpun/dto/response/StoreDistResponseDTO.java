package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Store;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StoreDistResponseDTO {
    private Long storeId;
    private String storeName;
    private double storeLon;
    private double storeLat;
    private boolean storeAlwaysShare;
    private boolean storeSupport;

    public StoreDistResponseDTO(Store store, boolean storeSupport) {
        this.storeId = store.getId();
        this.storeName = store.getName();
        this.storeLon = store.getLon();
        this.storeLat = store.getLat();
        this.storeAlwaysShare = store.isAlwaysShare();
        this.storeSupport = storeSupport;
    }
}

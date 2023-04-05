package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
public class StoreDetailMemberResponseDTO {
    private Long storeId;
    private String storeName;
    private String storeOpenTime;
    private String storeInfo;
    private String storeAddress;
    private double storeLon;
    private double storeLat;
    private boolean storeAlwaysShare;
    private String storeImageName;
    private String storeImage;
    private String storePhoneNumber;
    private List<MenuMemberResponseDTO> menuMemberResponseDTOList;

    public StoreDetailMemberResponseDTO(Store store, List<MenuMemberResponseDTO> menuList) {
        this.storeId = store.getId();
        this.storeName = store.getName();
        this.storeOpenTime = store.getOpenTime();
        this.storeInfo = store.getInfo();
        this.storeAddress = store.getAddress();
        this.storeLon = store.getLon();
        this.storeLat = store.getLat();
        this.storeAlwaysShare = store.isAlwaysShare();
        if (store.getImage() != null) {
            this.storeImageName = store.getImage().getName();
            this.storeImage = store.getImage().getUrl();
        }
        this.storePhoneNumber = store.getPhoneNumber();
        this.menuMemberResponseDTOList = menuList;
    }
}

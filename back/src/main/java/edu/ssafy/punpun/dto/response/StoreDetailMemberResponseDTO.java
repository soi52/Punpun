package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StoreDetailMemberResponseDTO {
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
    private List<MenuResponseDTO> menuResponseDTOList;

    public StoreDetailMemberResponseDTO(Store store, List<MenuResponseDTO> menuList) {
        this.storeId = store.getId();
        this.storeName = store.getName();
        this.storeOpenTime = store.getOpenTime();
        this.storeInfo = store.getInfo();
        this.storeAddress = store.getAddress();
        this.storeLon = store.getLon();
        this.storeLat = store.getLat();
        if (store.getImage() != null) {
            this.storeImageName = store.getImage().getName();
            this.storeImage = store.getImage().getUrl();
        }
        this.storePhoneNumber = store.getPhoneNumber();
        this.menuResponseDTOList = menuList;
    }
}

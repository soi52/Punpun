package edu.ssafy.punpun.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoreDetailRequestDTO {
    private Long storeId;
    private String storeName;
    private String storeOpenTime;
    private String storeInfo;
    private String storeAddress;
    private String storePhoneNumber;
    private boolean storeAlwaysShare;
}

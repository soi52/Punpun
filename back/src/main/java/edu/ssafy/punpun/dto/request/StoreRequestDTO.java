package edu.ssafy.punpun.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StoreRequestDTO {
    private Long storeId;
    private String storeName;
    private double storeLon;
    private double storeLat;
    private String storeInfo;
    private Long storeImageId;
}

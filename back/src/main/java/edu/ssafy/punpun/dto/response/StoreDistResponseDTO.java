package edu.ssafy.punpun.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StoreDistResponseDTO {
    private Long storeId;
    private String storeName;
    private double storeLon;
    private double storeLat;
    private boolean storeAlwaysShare;
    private boolean storeSupport;
}

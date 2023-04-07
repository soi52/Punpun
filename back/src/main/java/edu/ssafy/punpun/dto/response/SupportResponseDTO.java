package edu.ssafy.punpun.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
public class SupportResponseDTO {
    private String date;
    private Long storeId;
    private Long sponsorCount;
    private String storeName;
    private Long menuId;
    private String menuName;
    private Long menuPrice;

    public SupportResponseDTO(LocalDate date, Long storeId, Long sponsorCount, String storeName, Long menuId, String menuName, Long menuPrice) {
        this.date = date.toString();
        this.storeId = storeId;
        this.sponsorCount = sponsorCount;
        this.storeName = storeName;
        this.menuId = menuId;
        this.menuName = menuName;
        this.menuPrice = menuPrice;
    }
}

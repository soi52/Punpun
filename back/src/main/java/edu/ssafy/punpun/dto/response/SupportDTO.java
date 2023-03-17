package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class SupportDTO {
    private Long supportId;
    private SupportState supportState;
    private LocalDateTime supportCreationDate;
    private Long storeId;
    private String storeName;
    private Long menuId;
    private String menuName;
    private Long menuPrice;

    public SupportDTO(Support support){
        this.supportId=support.getId();
        this.supportState=support.getSupportState();
        this.supportCreationDate=support.getCreatedDateTime();
        this.storeId=support.getStore().getId();
        this.storeName=support.getStore().getName();
        this.menuId=support.getMenu().getId();
        this.menuName=support.getMenu().getName();
        this.menuPrice=support.getMenu().getPrice();
    }
}

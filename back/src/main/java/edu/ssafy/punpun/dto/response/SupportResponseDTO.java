package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class SupportResponseDTO {
    private Long supportId;
    private SupportState supportState;
    private String supportCreationDate;
    private Long storeId;
    private String storeName;
    private Long menuId;
    private String menuName;
    private Long menuPrice;

    public SupportResponseDTO(Support support){
        this.supportId=support.getId();
        this.supportState=support.getSupportState();
        this.supportCreationDate=support.getSupportDate().toString();
        this.storeId=support.getStore().getId();
        this.storeName=support.getStore().getName();
        this.menuId=support.getMenu().getId();
        this.menuName=support.getMenu().getName();
        this.menuPrice=support.getMenu().getPrice();
    }
}

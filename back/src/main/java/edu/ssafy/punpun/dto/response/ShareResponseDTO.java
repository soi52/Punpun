package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import edu.ssafy.punpun.entity.enumurate.SupportType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class ShareResponseDTO {
    private Long supportId;
    private SupportType supportType;
    private SupportState supportState;
    private LocalDate supportDate;
    private Long menuId;
    private String menuName;
    private Long totalCount;
    private Long useCount;

    public ShareResponseDTO(Support support, Long totalCount, Long useCount){
        this.supportId=support.getId();
        this.supportType=support.getSupportType();
        this.supportState=support.getSupportState();
        this.supportDate=support.getCreatedDateTime().toLocalDate();
        this.menuId=support.getMenu().getId();
        this.menuName=support.getMenu().getName();
        this.totalCount=totalCount;
        this.useCount=useCount;
    }

}
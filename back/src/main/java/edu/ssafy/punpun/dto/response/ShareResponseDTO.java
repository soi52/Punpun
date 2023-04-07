package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.enumurate.SupportType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class ShareResponseDTO {
    private Long supportId;
    private SupportType supportType;
    private String supportDate;
    private Long menuId;
    private String menuName;
    private Long totalCount;
    private Long useCount;

    public ShareResponseDTO(SupportType supportType, LocalDate date, Long id, String name, Long totalCount){
        this.supportType=supportType;
        this.supportDate=date.toString();
        this.menuId=id;
        this.menuName=name;
        this.totalCount=totalCount;
    }

}
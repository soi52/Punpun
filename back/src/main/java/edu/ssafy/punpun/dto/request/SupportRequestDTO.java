package edu.ssafy.punpun.dto.request;

import edu.ssafy.punpun.entity.enumurate.SupportType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SupportRequestDTO {
    private Long usePoint;
    private Long menuId;
    private Long StoreId;
    private SupportType supportType;
}

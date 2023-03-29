package edu.ssafy.punpun.dto.request;

import edu.ssafy.punpun.entity.enumurate.SupportType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SupportRequestDTO {
    private Long usePoint;
    private List<Long> menuId;
    private List<Long> menuCount;
}

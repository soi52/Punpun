package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.response.ShareResponseDTO;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportType;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;

public interface SupportService {
    List<Support> findSupport(Member supporter);
    void saveSupport(List<Support> supportList, List<Long> menuId, List<Long>menuCount, Member supporter, Long usePoint);
    Page<ShareResponseDTO> findShareList(Long storeId, SupportType supportType, int page, LocalDate date);
}

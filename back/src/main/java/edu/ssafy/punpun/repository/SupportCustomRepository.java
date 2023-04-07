package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.dto.response.ShareResponseDTO;
import edu.ssafy.punpun.dto.response.SupportResponseDTO;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.enumurate.SupportType;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;

public interface SupportCustomRepository {
    List<SupportResponseDTO> findSupport(Member supporter);
    Page<ShareResponseDTO> findShareList (Long storeId, SupportType supportType, int page, LocalDate date);
}

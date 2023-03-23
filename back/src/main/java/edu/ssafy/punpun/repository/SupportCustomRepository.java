package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.dto.response.ShareResponseDTO;
import edu.ssafy.punpun.entity.enumurate.SupportType;
import org.springframework.data.domain.Page;

import java.time.LocalDate;

public interface SupportCustomRepository {
    Page<ShareResponseDTO> findShareList (Long storeId, SupportType supportType, int page, LocalDate date);
}

package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.BookingSearchParamDTO;
import edu.ssafy.punpun.dto.request.BookingRequestDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Reservation;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

public interface BookingService {
    Reservation reservation(Child child, Long menuId, LocalDateTime reservationTime);

    Page<Reservation> findReservations(Child child, LocalDateTime localDateTime, int page);
    Page<Reservation> findAllByStore(Member owner, BookingSearchParamDTO params);
}

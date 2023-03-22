package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.dto.BookingSearchParamDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Reservation;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

public interface ReservationCustomRepository {
    Page<Reservation> findAllByDate(Child child, LocalDateTime localDateTime, int page);

    Page<Reservation> findAllByStore(BookingSearchParamDTO params);
}

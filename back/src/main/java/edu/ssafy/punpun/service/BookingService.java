package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Reservation;

import java.time.LocalDateTime;

public interface BookingService {
    Reservation reservation(Child child, Long menuId, LocalDateTime reservationTime);
}

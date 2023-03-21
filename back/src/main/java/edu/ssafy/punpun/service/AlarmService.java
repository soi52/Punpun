package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.ReservationEvent;

public interface AlarmService {
    void sendAlarm(ReservationEvent event);
}

package edu.ssafy.punpun.service;

import edu.ssafy.punpun.event.ReservationEvent;

public interface AlarmService {
    void sendAlarm(ReservationEvent event);
}

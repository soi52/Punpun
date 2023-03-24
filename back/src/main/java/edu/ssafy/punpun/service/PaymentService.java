package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Member;

public interface PaymentService {
    void updatePoints(Member member, Long point);
}

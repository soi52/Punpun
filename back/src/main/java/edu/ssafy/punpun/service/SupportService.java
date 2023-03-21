package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Support;

import java.util.List;

public interface SupportService {
    List<Support> findSupport(Member supporter);
    void supportPayment(List<Support> supportList, List<Long> menuId, List<Long>menuCount, Member supporter, Long usePoint);
}

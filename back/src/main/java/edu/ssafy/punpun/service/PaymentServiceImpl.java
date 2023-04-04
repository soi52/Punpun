package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final MemberRepository memberRepository;

    @Override
    public void updatePoints(Member member, Long point) {
        Member user=memberRepository.findById(member.getId())
                .orElseThrow(()->new IllegalArgumentException("멤버가 없습니다."));
        user.chargePoint(point);
    }
}

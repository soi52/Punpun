package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final MemberRepository memberRepository;

    @Transactional
    @Override
    public void updatePoints(Member member, Long point) {
        Member user=memberRepository.findById(member.getId())
                .orElseThrow(IllegalArgumentException::new);
        user.chargePoint(point);
    }
}

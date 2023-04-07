package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.repository.MemberRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class PaymentServiceImplTest {
    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private PaymentServiceImpl paymentService;

    @Test
    @DisplayName("후원자 포인트 충전 - 서비스")
    void updatePoints(){
        Member member= Member.builder()
                .id(1L)
                .supportedPoint(0L)
                .remainPoint(25000L)
                .build();
        doReturn(Optional.of(member)).when(memberRepository).findById(member.getId());

        paymentService.updatePoints(member, 10000L);

        Assertions.assertEquals(member.getRemainPoint(), 35000L);
    }
}

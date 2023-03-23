package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
@DisplayName("리뷰 레포지토리 테스트")
public class ReviewRepositoryTest {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private SupportRepository supportRepository;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private SupportReservationRepository supportReservationRepository;
    @Autowired
    private ReviewRepository reviewRepository;
    private Member member1;
    private Member member2;

    @BeforeEach
    void init() {
        //후원자
        member1 = Member.builder()
                .name("test1")
                .build();
        member2 = Member.builder()
                .name("test2")
                .build();
        memberRepository.save(member1);
        memberRepository.save(member2);

        //후원
        Support support1 = Support.builder()
                .supporter(member1)
                .build();
        Support support2 = Support.builder()
                .supporter(member2)
                .build();
        Support support3 = Support.builder()
                .supporter(member1)
                .build();
        Support support4 = Support.builder()
                .supporter(member2)
                .build();
        Support support5 = Support.builder()
                .supporter(member1)
                .build();
        supportRepository.save(support1);
        supportRepository.save(support2);
        supportRepository.save(support3);
        supportRepository.save(support4);
        supportRepository.save(support5);

        //예약
        Reservation reservation1 = Reservation.builder()
                .build();
        Reservation reservation2 = Reservation.builder()
                .build();
        Reservation reservation3 = Reservation.builder()
                .build();
        Reservation reservation4 = Reservation.builder()
                .build();
        Reservation reservation5 = Reservation.builder()
                .build();
        reservationRepository.save(reservation1);
        reservationRepository.save(reservation2);
        reservationRepository.save(reservation3);
        reservationRepository.save(reservation4);
        reservationRepository.save(reservation5);

        //예약 후원
        SupportReservation sr1 = SupportReservation.builder()
                .support(support1)
                .reservation(reservation1)
                .build();
        SupportReservation sr2 = SupportReservation.builder()
                .support(support2)
                .reservation(reservation2)
                .build();
        SupportReservation sr3 = SupportReservation.builder()
                .support(support3)
                .reservation(reservation3)
                .build();
        SupportReservation sr4 = SupportReservation.builder()
                .support(support4)
                .reservation(reservation4)
                .build();
        SupportReservation sr5 = SupportReservation.builder()
                .support(support5)
                .reservation(reservation5)
                .build();
        supportReservationRepository.save(sr1);
        supportReservationRepository.save(sr2);
        supportReservationRepository.save(sr3);
        supportReservationRepository.save(sr4);
        supportReservationRepository.save(sr5);
        reservation1.setSupportReservation(sr1);
        reservation2.setSupportReservation(sr2);
        reservation3.setSupportReservation(sr3);
        reservation4.setSupportReservation(sr4);
        reservation5.setSupportReservation(sr5);

        //리뷰
        Review review1 = Review.builder()
                .reservation(reservation1)
                .build();
        Review review2 = Review.builder()
                .reservation(reservation2)
                .build();
        Review review3 = Review.builder()
                .reservation(reservation3)
                .build();
        Review review4 = Review.builder()
                .reservation(reservation4)
                .build();
        Review review5 = Review.builder()
                .reservation(reservation5)
                .build();
        reviewRepository.save(review1);
        reviewRepository.save(review2);
        reviewRepository.save(review3);
        reviewRepository.save(review4);
        reviewRepository.save(review5);
    }

    @Test
    @DisplayName("후원자가 받은 모든 리뷰 검색")
    void findAllBySupporter() {
        PageRequest pageable = PageRequest.of(0, 10);
        Page<Review> reviews = reviewRepository.findAllBySupporter(member1, pageable);

        assertThat(reviews.getContent().size()).isEqualTo(3);
        assertThat(reviews.getTotalPages()).isEqualTo(1);
        assertThat(reviews.getTotalElements()).isEqualTo(3);
    }
}

//package edu.ssafy.punpun.repository;
//
//import edu.ssafy.punpun.entity.*;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//
//import javax.transaction.Transactional;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.assertj.core.api.Assertions.*;
//
//@SpringBootTest
//@Transactional
//@DisplayName("리뷰 레포지토리 테스트")
//public class ReviewRepositoryTest {
//    @Autowired
//    private MemberRepository memberRepository;
//    @Autowired
//    private SupportRepository supportRepository;
//    @Autowired
//    private ReservationRepository reservationRepository;
//    @Autowired
//    private SupportReservationRepository supportReservationRepository;
//    @Autowired
//    private ReviewRepository reviewRepository;
//    @Autowired
//    private StoreRepository storeRepository;
//    @Autowired
//    private ReviewKeywordRepository reviewKeywordRepository;
//    @Autowired
//    private KeywordRepository keywordRepository;
//    private Member member1;
//    private Member member2;
//    private Store store;
//
//    @BeforeEach
//    void init() {
//        //후원자
//        member1 = Member.builder()
//                .name("test1")
//                .build();
//        member2 = Member.builder()
//                .name("test2")
//                .build();
//        memberRepository.save(member1);
//        memberRepository.save(member2);
//
//        store = Store.builder()
//                .owner(member1)
//                .reviews(new ArrayList<>())
//                .build();
//        storeRepository.save(store);
//
//        //후원
//        Support support1 = Support.builder()
//                .supporter(member1)
//                .supportReservations(new ArrayList<>())
//                .build();
//        Support support2 = Support.builder()
//                .supporter(member2)
//                .supportReservations(new ArrayList<>())
//                .build();
//        Support support3 = Support.builder()
//                .supporter(member1)
//                .supportReservations(new ArrayList<>())
//                .build();
//        Support support4 = Support.builder()
//                .supporter(member2)
//                .supportReservations(new ArrayList<>())
//                .build();
//        Support support5 = Support.builder()
//                .supporter(member1)
//                .supportReservations(new ArrayList<>())
//                .build();
//        supportRepository.save(support1);
//        supportRepository.save(support2);
//        supportRepository.save(support3);
//        supportRepository.save(support4);
//        supportRepository.save(support5);
//
//        //예약
//        Reservation reservation1 = Reservation.builder()
//                .build();
//        Reservation reservation2 = Reservation.builder()
//                .build();
//        Reservation reservation3 = Reservation.builder()
//                .build();
//        Reservation reservation4 = Reservation.builder()
//                .build();
//        Reservation reservation5 = Reservation.builder()
//                .build();
//        reservationRepository.save(reservation1);
//        reservationRepository.save(reservation2);
//        reservationRepository.save(reservation3);
//        reservationRepository.save(reservation4);
//        reservationRepository.save(reservation5);
//
//        //예약 후원
//        SupportReservation sr1 = SupportReservation.builder()
//                .support(support1)
//                .reservation(reservation1)
//                .build();
//        SupportReservation sr2 = SupportReservation.builder()
//                .support(support2)
//                .reservation(reservation2)
//                .build();
//        SupportReservation sr3 = SupportReservation.builder()
//                .support(support3)
//                .reservation(reservation3)
//                .build();
//        SupportReservation sr4 = SupportReservation.builder()
//                .support(support4)
//                .reservation(reservation4)
//                .build();
//        SupportReservation sr5 = SupportReservation.builder()
//                .support(support5)
//                .reservation(reservation5)
//                .build();
//        supportReservationRepository.save(sr1);
//        supportReservationRepository.save(sr2);
//        supportReservationRepository.save(sr3);
//        supportReservationRepository.save(sr4);
//        supportReservationRepository.save(sr5);
//        reservation1.setSupportReservation(sr1);
//        reservation2.setSupportReservation(sr2);
//        reservation3.setSupportReservation(sr3);
//        reservation4.setSupportReservation(sr4);
//        reservation5.setSupportReservation(sr5);
//        support1.appendSupportReservation(sr1);
//        support2.appendSupportReservation(sr2);
//        support3.appendSupportReservation(sr3);
//        support4.appendSupportReservation(sr4);
//        support5.appendSupportReservation(sr5);
//
//        //키워드
//        Keyword keyword = Keyword.builder()
//                .content("test Keyword")
//                .build();
//        keywordRepository.save(keyword);
//
//        //리뷰
//        Review review1 = Review.builder()
//                .store(store)
//                .reservation(reservation1)
//                .reviewKeywords(new ArrayList<>())
//                .build();
//        Review review2 = Review.builder()
//                .store(store)
//                .reservation(reservation2)
//                .reviewKeywords(new ArrayList<>())
//                .build();
//        Review review3 = Review.builder()
//                .store(store)
//                .reservation(reservation3)
//                .reviewKeywords(new ArrayList<>())
//                .build();
//        Review review4 = Review.builder()
//                .store(store)
//                .reservation(reservation4)
//                .reviewKeywords(new ArrayList<>())
//                .build();
//        Review review5 = Review.builder()
//                .store(store)
//                .reservation(reservation5)
//                .reviewKeywords(new ArrayList<>())
//                .build();
//        reviewRepository.save(review1);
//        reviewRepository.save(review2);
//        reviewRepository.save(review3);
//        reviewRepository.save(review4);
//        reviewRepository.save(review5);
//        reservation1.setReview(review1);
//        reservation2.setReview(review2);
//        reservation3.setReview(review3);
//        reservation4.setReview(review4);
//        reservation5.setReview(review5);
//
//        ReviewKeyword rk1 = ReviewKeyword.builder()
//                .review(review1)
//                .keyword(keyword)
//                .build();
//        ReviewKeyword rk2 = ReviewKeyword.builder()
//                .review(review2)
//                .keyword(keyword)
//                .build();
//        ReviewKeyword rk3 = ReviewKeyword.builder()
//                .review(review3)
//                .keyword(keyword)
//                .build();
//        ReviewKeyword rk4 = ReviewKeyword.builder()
//                .review(review4)
//                .keyword(keyword)
//                .build();
//        ReviewKeyword rk5 = ReviewKeyword.builder()
//                .review(review5)
//                .keyword(keyword)
//                .build();
//        reviewKeywordRepository.save(rk1);
//        reviewKeywordRepository.save(rk2);
//        reviewKeywordRepository.save(rk3);
//        reviewKeywordRepository.save(rk4);
//        reviewKeywordRepository.save(rk5);
//
//        store.appendReview(review1);
//        store.appendReview(review2);
//        store.appendReview(review3);
//        store.appendReview(review4);
//        store.appendReview(review5);
//    }
//
//    @AfterEach
//    void afterEach() {
//        reviewKeywordRepository.deleteAll();
//        keywordRepository.deleteAll();
//        reviewRepository.deleteAll();
//        supportReservationRepository.deleteAll();
//        reservationRepository.deleteAll();
//        supportRepository.deleteAll();
//        storeRepository.deleteAll();
//        memberRepository.deleteAll();
//    }
//
//    @Test
//    @DisplayName("후원자가 받은 모든 리뷰 검색")
//    void findAllBySupporter() {
//        PageRequest pageable = PageRequest.of(0, 10);
//        Page<Review> reviews = reviewRepository.findAllBySupporter(member1, pageable);
//
//        List<Review> all = reviewRepository.findAll();
//        assertThat(reviews.getContent().size()).isEqualTo(3);
//        assertThat(reviews.getTotalPages()).isEqualTo(1);
//        assertThat(reviews.getTotalElements()).isEqualTo(3);
//    }
//
//    @Test
//    @DisplayName("리뷰를 가게별로 검색")
//    void findAllByStore() {
//        PageRequest pageable = PageRequest.of(0, 10);
//
//        Page<Review> reviews = reviewRepository.findAllByStore(store, pageable);
//
//        assertThat(reviews.getContent().size()).isEqualTo(5);
//        assertThat(reviews.getTotalPages()).isEqualTo(1);
//        assertThat(reviews.getTotalElements()).isEqualTo(5);
//    }
//}

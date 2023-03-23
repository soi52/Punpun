package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.*;
import edu.ssafy.punpun.entity.enumurate.ReservationState;
import edu.ssafy.punpun.exception.NotMatchChildException;
import edu.ssafy.punpun.repository.KeywordRepository;
import edu.ssafy.punpun.repository.ReservationRepository;
import edu.ssafy.punpun.repository.ReviewKeywordRepository;
import edu.ssafy.punpun.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private static final int PAGE_SIZE = 10;
    private final KeywordRepository keywordRepository;
    private final ReviewRepository reviewRepository;
    private final ReviewKeywordRepository reviewKeywordRepository;
    private final ReservationRepository reservationRepository;

    @Override
    public Review postReview(Child child, Long reservationId, String content, String keywordStr) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("없는 예약 번호입니다."));

        if (reservation.getState() != ReservationState.END) {
            throw new IllegalArgumentException("리뷰를 남길 수 없는 상태입니다.");
        }
        if (!reservation.getChild().equals(child)) {
            throw new NotMatchChildException("예약을 남길 수 없는 아동입니다.");
        }

        //TODO: 리뷰를 ENUM 으로 변경하면 없어질 수 있음
        Keyword keyword = keywordRepository.findByContent(keywordStr)
                .orElseThrow(() -> new IllegalArgumentException("없는 키워드입니다."));

        Review review = Review.builder()
                .child(child)
                .store(reservation.getMenu().getStore())
                .content(content)
                .reservation(reservation)
                .build();
        reviewRepository.save(review);

        ReviewKeyword reviewKeyword = ReviewKeyword.builder()
                .review(review)
                .keyword(keyword)
                .build();
        reviewKeywordRepository.save(reviewKeyword);

        return review;
    }

    @Override
    public Page<Review> findAllByChild(Child child, int page) {
        PageRequest pageable = PageRequest.of(page, PAGE_SIZE);
        return reviewRepository.findAllByChild(child, pageable);
    }
}

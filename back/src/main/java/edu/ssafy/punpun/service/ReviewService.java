package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Review;
import org.springframework.data.domain.Page;

public interface ReviewService {
    //TODO : 파라미터가 너무 많다 줄일 수 없나?
    Review postReview(Child child, Long reservationId, String content, String keywordStr);

    Page<Review> findAllByChild(Child child, int page);

    Page<Review> findAllBySupporter(Member supporter, int page);

    Page<Review> findAllByStore(Long storeId, int page);
}

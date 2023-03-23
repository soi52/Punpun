package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Keyword;
import edu.ssafy.punpun.entity.Review;
import edu.ssafy.punpun.entity.ReviewKeyword;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public class ReviewSupporterResponseDTO {
    private Long reviewId;
    private String reviewContent;
    private List<Keyword> keywords;
    private Long childId;
    private String childName;
    private String childProfileUrl;

    public static ReviewSupporterResponseDTO entityToDto(Review review) {
        Long reviewId = review.getId();
        String reviewContent = review.getContent();
        List<Keyword> keywords = review.getReviewKeywords().stream()
                .map(ReviewKeyword::getKeyword)
                .collect(Collectors.toList());
        Long childId = review.getChild().getId();
        String childName = review.getChild().getName();
        String childProfileUrl = review.getChild().getProfile().getUrl();
        return new ReviewSupporterResponseDTO(reviewId, reviewContent, keywords, childId, childName, childProfileUrl);
    }
}

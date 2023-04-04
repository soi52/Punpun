package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Keyword;
import edu.ssafy.punpun.entity.Review;
import edu.ssafy.punpun.entity.ReviewKeyword;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public class ReviewResponseDTO {
    private Long reviewId;
    private String reviewContent;
    private String reviewCreatedTime;
    private List<Keyword> keywords;
    private Long childId;
    private String childName;
    private String childProfileUrl;

    public static ReviewResponseDTO entityToDto(Review review) {
        Long reviewId = review.getId();
        String reviewContent = review.getContent();
        String reviewCreatedTime = review.getCreatedDateTime().toString();
        List<Keyword> keywords = review.getReviewKeywords().stream()
                .map(ReviewKeyword::getKeyword)
                .collect(Collectors.toList());
        Long childId = review.getChild().getId();
        String childName = review.getChild().getName();
        String childProfileUrl = "";
        if (review.getChild().getProfile() != null) {
            childProfileUrl = review.getChild().getProfile().getUrl();
        }
        return new ReviewResponseDTO(reviewId, reviewContent, reviewCreatedTime, keywords, childId, childName, childProfileUrl);
    }
}

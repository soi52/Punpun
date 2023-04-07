package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.request.ReviewPostDTO;
import edu.ssafy.punpun.dto.response.ReviewChildResponseDTO;
import edu.ssafy.punpun.dto.response.ReviewResponseDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.security.oauth2.PrincipalChildDetail;
import edu.ssafy.punpun.security.oauth2.PrincipalMemberDetail;
import edu.ssafy.punpun.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void postReview(@AuthenticationPrincipal PrincipalChildDetail childDetail,
                           @RequestBody ReviewPostDTO reviewPostDTO) {
        Child child = childDetail.getChild();
        reviewService.postReview(child, reviewPostDTO.getReservationId(), reviewPostDTO.getContent(), reviewPostDTO.getKeyword());
    }

    @GetMapping("/child")
    @ResponseStatus(HttpStatus.OK)
    public Page<ReviewChildResponseDTO> getAllChildReview(@AuthenticationPrincipal PrincipalChildDetail childDetail,
                                                          @RequestParam(defaultValue = "0", required = false) int page) {
        Child child = childDetail.getChild();
        return reviewService.findAllByChild(child, page)
                .map(ReviewChildResponseDTO::entityToDto);
    }

    @GetMapping("/supporter")
    @ResponseStatus(HttpStatus.OK)
    public Page<ReviewResponseDTO> getAllSupporterReceiveReview(@AuthenticationPrincipal PrincipalMemberDetail memberDetail,
                                                                @RequestParam(defaultValue = "0", required = false) int page) {
        Member supporter = memberDetail.getMember();
        return reviewService.findAllBySupporter(supporter, page)
                .map(ReviewResponseDTO::entityToDto);
    }

    @GetMapping("/stores/{storeId}")
    @ResponseStatus(HttpStatus.OK)
    public Page<ReviewResponseDTO> getAllReviewByStore(@PathVariable Long storeId,
                                                       @RequestParam(defaultValue = "0", required = false) int page) {
        return reviewService.findAllByStore(storeId, page)
                .map(ReviewResponseDTO::entityToDto);
    }
}

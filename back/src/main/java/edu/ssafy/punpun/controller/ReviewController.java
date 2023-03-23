package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.request.ReviewPostDTO;
import edu.ssafy.punpun.dto.response.ReviewChildResponseDTO;
import edu.ssafy.punpun.dto.response.ReviewSupporterResponseDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;
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
    public void postReview(@AuthenticationPrincipal Child child,
                           @RequestBody ReviewPostDTO reviewPostDTO) {
        reviewService.postReview(child, reviewPostDTO.getReservationId(), reviewPostDTO.getContent(), reviewPostDTO.getKeyword());
    }

    @GetMapping("/child")
    @ResponseStatus(HttpStatus.OK)
    public Page<ReviewChildResponseDTO> getAllChildReview(@AuthenticationPrincipal Child child,
                                                          @RequestParam(defaultValue = "0", required = false) int page) {
        return reviewService.findAllByChild(child, page)
                .map(ReviewChildResponseDTO::entityToDto);
    }

    @GetMapping("/supporter")
    @ResponseStatus(HttpStatus.OK)
    public Page<ReviewSupporterResponseDTO> getAllSupporterReceiveReview(@AuthenticationPrincipal Member supporter,
                                                                         @RequestParam(defaultValue = "0", required = false) int page) {
        return reviewService.findAllBySupporter(supporter, page)
                .map(ReviewSupporterResponseDTO::entityToDto);
    }
}

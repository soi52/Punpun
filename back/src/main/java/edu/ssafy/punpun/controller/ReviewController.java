package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.request.ReviewPostDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    @ResponseStatus(HttpStatus.OK)
    public void postReview(@AuthenticationPrincipal Child child,
                           @RequestBody ReviewPostDTO reviewPostDTO) {
        reviewService.postReview(child, reviewPostDTO.getReservationId(), reviewPostDTO.getContent(), reviewPostDTO.getKeyword());
    }
}

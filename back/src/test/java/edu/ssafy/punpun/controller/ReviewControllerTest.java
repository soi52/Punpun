package edu.ssafy.punpun.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import edu.ssafy.punpun.dto.request.ReviewPostDTO;
import edu.ssafy.punpun.dto.response.ErrorDTO;
import edu.ssafy.punpun.dto.response.ReviewChildResponseDTO;
import edu.ssafy.punpun.dto.response.ReviewResponseDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Review;
import edu.ssafy.punpun.exception.NotMatchChildException;
import edu.ssafy.punpun.service.ReviewService;
import edu.ssafy.testutil.WIthCustomChild;
import edu.ssafy.testutil.WIthCustomSupporter;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@DisplayName("리뷰 컨트롤러 테스트")
@WebMvcTest(ReviewController.class)
class ReviewControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    ReviewService reviewService;

    @Nested
    @DisplayName("리뷰 남기기")
    public class PostReview {

        @Test
        @WIthCustomChild
        @DisplayName("성공")
        void postReviewSuccess() throws Exception {
            Review review = Review.builder()
                    .build();
            doReturn(review).when(reviewService).postReview(any(Child.class), eq(1L), eq("리뷰내용"), eq("GOOD"));

            ReviewPostDTO requestDto = new ReviewPostDTO(1L, "리뷰내용", "GOOD");
            String input = new Gson().toJson(requestDto);

            mockMvc.perform(post("/reviews")
                            .with(csrf())
                            .content(input)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isCreated())
                    .andDo(print());
        }

        @Test
        @WIthCustomChild
        @DisplayName("리뷰를 남길 수 없는 아이")
        void postReviewNotMatchChild() throws Exception {
            Gson gson = new Gson();
            doThrow(new NotMatchChildException("예약을 남길 수 없는 아동입니다.")).when(reviewService).postReview(any(Child.class), eq(1L), eq("리뷰내용"), eq("GOOD"));

            ReviewPostDTO requestDto = new ReviewPostDTO(1L, "리뷰내용", "GOOD");
            String input = gson.toJson(requestDto);

            ErrorDTO errorDTO = new ErrorDTO(NotMatchChildException.class.getName(), "예약을 남길 수 없는 아동입니다.");
            String output = gson.toJson(errorDTO);

            mockMvc.perform(post("/reviews")
                            .with(csrf())
                            .content(input)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string(output))
                    .andDo(print());
        }
    }

    @Nested
    @DisplayName("아이가 남긴 리뷰 찾기")
    public class GetAllByChildReview {
        @Test
        @WIthCustomChild
        @DisplayName("성공")
        void getAllReviewSuccess() throws Exception {
            Review review = Review.builder()
                    .id(1L)
                    .content("content")
                    .reviewKeywords(List.of())
                    .build();
            PageRequest pageable = PageRequest.of(0, 10);
            PageImpl<Review> reviewPage = new PageImpl<>(List.of(review), pageable, 1);
            doReturn(reviewPage).when(reviewService).findAllByChild(any(Child.class), eq(0));

            Page<ReviewChildResponseDTO> responseDto = reviewPage
                    .map(ReviewChildResponseDTO::entityToDto);
            String output = new ObjectMapper().writeValueAsString(responseDto);

            mockMvc.perform(get("/reviews/child")
                            .with(csrf())
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().string(output))
                    .andDo(print());
        }
    }

    @Nested
    @DisplayName("후원자가 남긴 리뷰 찾기")
    public class GetAllSupporterReceiveReview {
        @Test
        @WIthCustomSupporter
        @DisplayName("성공")
        void getAllReviewSuccess() throws Exception {
            Child child = Child.builder()
                    .id(1L)
                    .name("name")
                    .build();
            Review review = Review.builder()
                    .id(1L)
                    .content("content")
                    .reviewKeywords(List.of())
                    .child(child)
                    .build();
            review.setCreatedDateTime(LocalDateTime.now());
            PageRequest pageable = PageRequest.of(0, 10);
            PageImpl<Review> reviewPage = new PageImpl<>(List.of(review), pageable, 1);
            doReturn(reviewPage).when(reviewService).findAllBySupporter(any(Member.class), eq(0));

            Page<ReviewResponseDTO> responseDto = reviewPage
                    .map(ReviewResponseDTO::entityToDto);
            String output = new ObjectMapper().writeValueAsString(responseDto);

            mockMvc.perform(get("/reviews/supporter")
                            .with(csrf())
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().string(output))
                    .andDo(print());
        }
    }

    @Nested
    @DisplayName("가게에 남긴 리뷰 찾기")
    public class GetAllReviewByStore {
        @Test
        @WIthCustomSupporter
        @DisplayName("성공")
        void getAllReviewStoreSuccess() throws Exception {
            Child child = Child.builder()
                    .id(1L)
                    .name("name")
                    .build();
            Review review = Review.builder()
                    .id(1L)
                    .content("content")
                    .reviewKeywords(List.of())
                    .child(child)
                    .build();
            review.setCreatedDateTime(LocalDateTime.now());
            PageRequest pageable = PageRequest.of(0, 10);
            PageImpl<Review> reviewPage = new PageImpl<>(List.of(review), pageable, 1);
            doReturn(reviewPage).when(reviewService).findAllByStore(1L, 0);

            Page<ReviewResponseDTO> responseDto = reviewPage
                    .map(ReviewResponseDTO::entityToDto);
            String output = new ObjectMapper().writeValueAsString(responseDto);

            mockMvc.perform(get("/reviews/stores/1")
                            .with(csrf())
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().string(output))
                    .andDo(print());
        }

        @Test
        @WIthCustomSupporter
        @DisplayName("다른 페이지 검색")
        void getAllReviewStoreOtherPage() throws Exception {
            PageRequest pageable = PageRequest.of(1, 10);
            PageImpl<Review> reviewPage = new PageImpl<>(List.of(), pageable, 0);
            doReturn(reviewPage).when(reviewService).findAllByStore(1L, 1);

            Page<ReviewResponseDTO> responseDto = reviewPage
                    .map(ReviewResponseDTO::entityToDto);
            String output = new ObjectMapper().writeValueAsString(responseDto);

            mockMvc.perform(get("/reviews/stores/1?page=1")
                            .with(csrf())
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().string(output))
                    .andDo(print());
        }
    }
}
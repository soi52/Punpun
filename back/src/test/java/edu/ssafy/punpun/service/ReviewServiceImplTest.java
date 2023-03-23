package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.*;
import edu.ssafy.punpun.entity.enumurate.ReservationState;
import edu.ssafy.punpun.exception.NotMatchChildException;
import edu.ssafy.punpun.repository.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@DisplayName("리뷰 서비스")
@ExtendWith(MockitoExtension.class)
class ReviewServiceImplTest {
    @InjectMocks
    public ReviewServiceImpl reviewService;
    @Mock
    public ReviewRepository reviewRepository;
    @Mock
    public KeywordRepository keywordRepository;
    @Mock
    public ReviewKeywordRepository reviewKeywordRepository;
    @Mock
    public ReservationRepository reservationRepository;
    @Mock
    public StoreRepository storeRepository;

    @Test
    @DisplayName("리뷰 남기기 - 정상작동")
    void postReview() {
        Store store = Store.builder()
                .id(1L)
                .build();
        Menu menu = Menu.builder()
                .id(1L)
                .store(store)
                .build();
        Child child = Child.builder()
                .id(1L)
                .build();
        Reservation reservation = Reservation.builder()
                .id(1L)
                .menu(menu)
                .state(ReservationState.END)
                .child(child)
                .build();
        doReturn(Optional.of(reservation)).when(reservationRepository).findById(1L);

        Keyword keyword = Keyword.builder()
                .id(1L)
                .content("test1")
                .build();
        doReturn(Optional.of(keyword)).when(keywordRepository).findByContent("test1");

        doReturn(null).when(reviewRepository).save(any());
        doReturn(null).when(reviewKeywordRepository).save(any());

        Review review = reviewService.postReview(child, 1L, "content test1", "test1");

        assertThat(review.getContent()).isEqualTo("content test1");
        assertThat(review.getStore()).isEqualTo(store);
        assertThat(review.getChild()).isEqualTo(child);
        assertThat(review.getReservation()).isEqualTo(reservation);

        verify(reviewRepository, times(1)).save(any());
        verify(reviewKeywordRepository, times(1)).save(any());
    }

    @Test
    @DisplayName("리뷰 남기기 - 없는 예약 번호")
    void noReservation() {
        Child child = Child.builder()
                .id(1L)
                .build();
        doReturn(Optional.empty()).when(reservationRepository).findById(1L);


        assertThatThrownBy(() ->
                reviewService.postReview(child, 1L, "content test1", "test1"))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    @DisplayName("리뷰 남기기 - 리뷰를 남길 수 없는 예약")
    void dontReviewState() {
        Store store = Store.builder()
                .id(1L)
                .build();
        Menu menu = Menu.builder()
                .id(1L)
                .store(store)
                .build();
        Child child = Child.builder()
                .id(1L)
                .build();
        Reservation reservation = Reservation.builder()
                .id(1L)
                .menu(menu)
                .state(ReservationState.CANCEL)
                .child(child)
                .build();
        doReturn(Optional.of(reservation)).when(reservationRepository).findById(1L);

        assertThatThrownBy(() ->
                reviewService.postReview(child, 1L, "content test1", "test1"))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    @DisplayName("리뷰 남기기 - 예약을 남길 수 없는 아동")
    void dontReviewChild() {
        Store store = Store.builder()
                .id(1L)
                .build();
        Menu menu = Menu.builder()
                .id(1L)
                .store(store)
                .build();
        Child child = Child.builder()
                .id(1L)
                .build();
        Child child2 = Child.builder()
                .id(1L)
                .build();
        Reservation reservation = Reservation.builder()
                .id(1L)
                .menu(menu)
                .state(ReservationState.END)
                .child(child2)
                .build();
        doReturn(Optional.of(reservation)).when(reservationRepository).findById(1L);

        assertThatThrownBy(() ->
                reviewService.postReview(child, 1L, "content test1", "test1"))
                .isInstanceOf(NotMatchChildException.class);
    }

    @Test
    @DisplayName("리뷰 모두 찾기 - 아동")
    void findAllByChild() {
        Child child = Child.builder()
                .id(1L)
                .name("test1")
                .build();

        doReturn(null).when(reviewRepository).findAllByChild(child, PageRequest.of(0, 10));
        reviewService.findAllByChild(child, 0);

        verify(reviewRepository, times(1)).findAllByChild(child, PageRequest.of(0, 10));
    }

    @Test
    @DisplayName("리뷰 모두 찾기 - 후원자")
    void findAllBySupporter() {
        Member supporter = Member.builder()
                .id(1L)
                .build();

        doReturn(null).when(reviewRepository).findAllBySupporter(supporter, PageRequest.of(0, 10));
        reviewService.findAllBySupporter(supporter, 0);

        verify(reviewRepository, times(1)).findAllBySupporter(supporter, PageRequest.of(0, 10));
    }

    @Test
    @DisplayName("리뷰 모두 찾기 - 가게")
    void findAllByStore() {
        Store store = Store.builder()
                .id(1L)
                .build();

        doReturn(null).when(reviewRepository).findAllByStore(store, PageRequest.of(0, 10));
        doReturn(Optional.of(store)).when(storeRepository).findById(1L);

        reviewService.findAllByStore(1L, 0);

        verify(reviewRepository, times(1)).findAllByStore(store, PageRequest.of(0, 10));
    }

    @Test
    @DisplayName("리뷰 모두 찾기 - 가게, 없는 가게 검색")
    void findAllByNoStore() {
        doReturn(Optional.empty()).when(storeRepository).findById(1L);

        assertThatThrownBy(()->reviewService.findAllByStore(1L, 0))
                .isInstanceOf(IllegalArgumentException.class);
    }
}
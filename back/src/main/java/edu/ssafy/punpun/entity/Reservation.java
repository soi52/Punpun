package edu.ssafy.punpun.entity;

import edu.ssafy.punpun.entity.enumurate.ReservationState;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reservation extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long id;
    private LocalDateTime reservationTime;
    private ReservationState state;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "support_reservation_id")
    private SupportReservation supportReservation;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id")
    private Review review;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_id")
    private Child child;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id")
    private Menu menu;

    public void changeState(ReservationState state) {
        this.state = state;
    }

    public void setSupportReservation(SupportReservation supportReservation) {
        this.supportReservation = supportReservation;
    }

    public void setReview(Review review) {
        this.review = review;
    }
}

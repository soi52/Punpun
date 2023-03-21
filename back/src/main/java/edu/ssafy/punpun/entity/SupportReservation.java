package edu.ssafy.punpun.entity;

import edu.ssafy.punpun.entity.enumurate.SupportReservationState;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SupportReservation extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "support_review_id")
    private Long id;
    private SupportReservationState state;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "support_id")
    private Support support;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;
}

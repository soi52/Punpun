package edu.ssafy.punpun.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import edu.ssafy.punpun.dto.BookingStoreSearchParamDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Reservation;
import edu.ssafy.punpun.entity.enumurate.ReservationState;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import static edu.ssafy.punpun.entity.QReservation.*;

public class ReservationRepositoryImpl implements ReservationCustomRepository {
    private static final int PAGE_SIZE = 10;
    private final JPAQueryFactory queryFactory;

    public ReservationRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<Reservation> findAllByDate(Child child, LocalDateTime localDateTime, int page) {
        PageRequest pageable = PageRequest.of(page, PAGE_SIZE);

        long totalCount = queryFactory
                .selectFrom(reservation)
                .where(betweenDate(localDateTime))
                .fetch()
                .size();

        List<Reservation> reservations = queryFactory
                .selectFrom(reservation)
                .where(betweenDate(localDateTime))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        return new PageImpl<>(reservations, pageable, totalCount);
    }

    @Override
    public Page<Reservation> findAllByStore(BookingStoreSearchParamDTO params) {
        PageRequest pageable = PageRequest.of(params.getPage(), PAGE_SIZE);

        long totalCount = queryFactory
                .selectFrom(reservation)
                .where(reservation.menu.store.id.eq(params.getStoreId()),
                        state(params.getState()),
                        betweenDate(params.getReservationDate()))
                .fetch()
                .size();

        List<Reservation> reservations = queryFactory.selectFrom(reservation)
                .where(reservation.menu.store.id.eq(params.getStoreId()),
                        state(params.getState()),
                        betweenDate(params.getReservationDate()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(reservations, pageable, totalCount);
    }

    BooleanExpression state(ReservationState state) {
        if (state != null) {
            return reservation.state.eq(state);
        }
        return null;
    }

    BooleanExpression betweenDate(LocalDateTime localDateTime) {
        if (localDateTime != null) {
            LocalDateTime start = localDateTime.toLocalDate().atStartOfDay();
            return reservation.reservationTime.between(start,
                    start.toLocalDate().atTime(LocalTime.MAX).withNano(0));
        }
        return null;
    }
}

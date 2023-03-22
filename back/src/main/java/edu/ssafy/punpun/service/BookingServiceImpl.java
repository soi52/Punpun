package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.BookingStoreSearchParamDTO;
import edu.ssafy.punpun.entity.*;
import edu.ssafy.punpun.entity.enumurate.ReservationState;
import edu.ssafy.punpun.entity.enumurate.SupportReservationState;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import edu.ssafy.punpun.exception.AlreadyEndException;
import edu.ssafy.punpun.exception.NotStoreOwnerException;
import edu.ssafy.punpun.kafka.ReservationEventPublisher;
import edu.ssafy.punpun.repository.MenuRepository;
import edu.ssafy.punpun.repository.ReservationRepository;
import edu.ssafy.punpun.repository.SupportRepository;
import edu.ssafy.punpun.repository.SupportReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {
    private final SupportReservationRepository supportReservationRepository;
    private final ReservationRepository reservationRepository;
    private final SupportRepository supportRepository;
    private final MenuRepository menuRepository;
    private final ReservationEventPublisher publisher;

    @Override
    @Transactional
    public Reservation reservation(Child child, Long menuId, LocalDateTime reservationTime) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new IllegalArgumentException("없는 메뉴입니다."));
        Support support = supportRepository.findAllByMenu(menu).stream()
                .filter(each -> each.getSupportState() == SupportState.SUPPORT)
                .findFirst()
                .orElseThrow(() -> new AlreadyEndException("이미 모두 예약되었습니다."));
        Reservation reservation = Reservation.builder()
                .reservationTime(reservationTime)
                .state(ReservationState.BOOKING)
                .child(child)
                .menu(support.getMenu())
                .build();

        reservationRepository.save(reservation);

        SupportReservation supportReservation = SupportReservation.builder()
                .reservation(reservation)
                .support(support)
                .state(SupportReservationState.BOOKING)
                .build();
        supportReservationRepository.save(supportReservation);

        publisher.publish(reservation);
        return reservation;
    }

    @Override
    public Page<Reservation> findReservations(Child child, LocalDateTime localDateTime, int page) {
        return reservationRepository.findAllByDate(child, localDateTime, page);
    }

    @Override
    public Page<Reservation> findAllByStore(Member owner, BookingStoreSearchParamDTO params) {
        owner.getStores().stream()
                .filter(store -> store.getId().equals(params.getStoreId()))
                .findFirst()
                .orElseThrow(()-> new NotStoreOwnerException("가게의 주인이 아닙니다."));
        return reservationRepository.findAllByStore(params);
    }
}

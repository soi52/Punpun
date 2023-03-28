package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.BookingStoreSearchParamDTO;
import edu.ssafy.punpun.dto.request.BookingProcessRequestDTO;
import edu.ssafy.punpun.dto.request.BookingRequestDTO;
import edu.ssafy.punpun.dto.response.BookingChildResponseDTO;
import edu.ssafy.punpun.dto.response.BookingStoreResponseDTO;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.enumurate.ReservationState;
import edu.ssafy.punpun.security.oauth2.PrincipalChildDetail;
import edu.ssafy.punpun.security.oauth2.PrincipalMemberDetail;
import edu.ssafy.punpun.service.BookingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/bookings")
public class BookingController {
    private final BookingService bookingService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void booking(@AuthenticationPrincipal PrincipalChildDetail childDetail, @RequestBody BookingRequestDTO requestDTO) {
        LocalDateTime reservationTime = LocalDateTime.parse(requestDTO.getReservationTime());
        bookingService.reservation(childDetail.getChild(), requestDTO.getMenuId(), reservationTime);
    }

    @GetMapping("/child")
    @ResponseStatus(HttpStatus.OK)
    public Page<BookingChildResponseDTO> getBookings(@AuthenticationPrincipal PrincipalChildDetail childDetail,
                                                     @RequestParam(required = false, defaultValue = "0") int page,
                                                     @RequestParam(required = false) String localDateTime) {
        LocalDateTime date = localDateTime == null ? LocalDateTime.now() : LocalDateTime.parse(localDateTime);
        return bookingService.findReservations(childDetail.getChild(), date, page)
                .map(BookingChildResponseDTO::entityToDto);
    }

    @GetMapping("/store/{storeId}")
    @ResponseStatus(HttpStatus.OK)
    public Page<BookingStoreResponseDTO> getBookingsByStore(@AuthenticationPrincipal PrincipalMemberDetail memberDetail,
                                                            @PathVariable("storeId") long storeId,
                                                            @RequestParam(required = false, defaultValue = "0") int page,
                                                            @RequestParam(required = false) String reservationDate,
                                                            @RequestParam(required = false, defaultValue = "BOOKING") ReservationState state) {
        LocalDateTime date = reservationDate == null ? LocalDateTime.now() : LocalDateTime.parse(reservationDate);

        BookingStoreSearchParamDTO params = BookingStoreSearchParamDTO.builder()
                .storeId(storeId)
                .page(page)
                .reservationDate(date)
                .state(state)
                .build();
        return bookingService.findAllByStore(memberDetail.getMember(), params)
                .map(BookingStoreResponseDTO::entityToDto);
    }

    @PostMapping("/today")
    @ResponseStatus(HttpStatus.CREATED)
    public void processReservation(@AuthenticationPrincipal PrincipalMemberDetail memberDetail,
                                   @RequestBody BookingProcessRequestDTO bookingProcess) {
        Member owner = memberDetail.getMember();
        bookingService.reservationApprove(bookingProcess.getBookingId(), owner, bookingProcess.getApproveState());
    }
}

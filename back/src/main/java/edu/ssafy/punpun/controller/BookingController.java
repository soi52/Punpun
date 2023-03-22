package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.BookingStoreSearchParamDTO;
import edu.ssafy.punpun.dto.request.BookingProcessRequestDTO;
import edu.ssafy.punpun.dto.request.BookingRequestDTO;
import edu.ssafy.punpun.dto.response.BookingChildResponseDTO;
import edu.ssafy.punpun.dto.response.BookingStoreResponseDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.enumurate.ReservationState;
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
    public void booking(@AuthenticationPrincipal Child child, @RequestBody BookingRequestDTO requestDTO) {
        bookingService.reservation(child, requestDTO.getMenuId(), requestDTO.getReservationTime());
    }

    @GetMapping("/child")
    @ResponseStatus(HttpStatus.OK)
    public Page<BookingChildResponseDTO> getBookings(@AuthenticationPrincipal Child child,
                                                     @RequestParam(required = false, defaultValue = "0") int page,
                                                     @RequestParam(required = false) LocalDateTime localDateTime) {
        return bookingService.findReservations(child, localDateTime, page)
                .map(BookingChildResponseDTO::entityToDto);
    }

    @GetMapping("/store/{storeId}")
    @ResponseStatus(HttpStatus.OK)
    public Page<BookingStoreResponseDTO> getBookingsByStore(@AuthenticationPrincipal Member member,
                                                            @PathVariable("storeId") long storeId,
                                                            @RequestParam(required = false, defaultValue = "0") int page,
                                                            @RequestParam(required = false) LocalDateTime reservationDate,
                                                            @RequestParam(required = false) ReservationState state) {
        BookingStoreSearchParamDTO params = BookingStoreSearchParamDTO.builder()
                .storeId(storeId)
                .page(page)
                .reservationDate(reservationDate)
                .state(state)
                .build();
        return bookingService.findAllByStore(member, params)
                .map(BookingStoreResponseDTO::entityToDTO);
    }

    @PostMapping("/today")
    @ResponseStatus(HttpStatus.CREATED)
    public void processReservation(@AuthenticationPrincipal Member owner,
                                   @RequestBody BookingProcessRequestDTO bookingProcess) {
        bookingService.reservationApprove(bookingProcess.getBookingId(), owner, bookingProcess.getApproveState());
    }
}

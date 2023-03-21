package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.request.BookingRequestDTO;
import edu.ssafy.punpun.dto.response.BookingChildResponseDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Reservation;
import edu.ssafy.punpun.service.BookingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.AbstractListenerReadPublisher;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

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
}

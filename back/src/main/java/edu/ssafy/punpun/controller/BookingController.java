package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.request.BookingRequestDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.service.BookingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
}

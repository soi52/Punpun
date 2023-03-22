package edu.ssafy.punpun.exception;

import edu.ssafy.punpun.dto.response.ErrorDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class ExceptionHandleAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = {IllegalArgumentException.class})
    public ErrorDTO handleIllegalArgumentException(HttpServletRequest request, IllegalArgumentException e) {
        String UUID = (String) request.getAttribute("uuid");
        String uri = request.getRequestURI();
        String method = request.getMethod();
        log.error("[{}][{}][{}] error = {}", UUID, uri, method, e.getClass().getName());

        return new ErrorDTO(e.getClass().getName(), e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = {AlreadyEndException.class})
    public ErrorDTO alreadyEndException(HttpServletRequest request, Exception e) {
        String UUID = (String) request.getAttribute("uuid");
        String uri = request.getRequestURI();
        String method = request.getMethod();
        log.error("[{}][{}][{}] error = {}", UUID, uri, method, e.getClass().getName());

        return new ErrorDTO(e.getClass().getName(), e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = {NotStoreOwnerException.class})
    public ErrorDTO notStoreOwnerException(HttpServletRequest request, Exception e) {
        String UUID = (String) request.getAttribute("uuid");
        String uri = request.getRequestURI();
        String method = request.getMethod();
        log.error("[{}][{}][{}] error = {}", UUID, uri, method, e.getClass().getName());

        return new ErrorDTO(e.getClass().getName(), e.getMessage());
    }
}

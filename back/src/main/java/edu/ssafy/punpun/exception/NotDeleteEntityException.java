package edu.ssafy.punpun.exception;

public class NotDeleteEntityException extends RuntimeException{
    public NotDeleteEntityException(String message) {
        super(message);
    }
}

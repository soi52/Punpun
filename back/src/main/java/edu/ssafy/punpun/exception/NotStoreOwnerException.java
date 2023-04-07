package edu.ssafy.punpun.exception;

public class NotStoreOwnerException extends RuntimeException{
    public NotStoreOwnerException(String message) {
        super(message);
    }
}

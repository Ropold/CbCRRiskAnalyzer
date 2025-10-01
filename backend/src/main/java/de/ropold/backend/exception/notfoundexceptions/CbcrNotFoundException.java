package de.ropold.backend.exception.notfoundexceptions;

public class CbcrNotFoundException extends RuntimeException {
    public CbcrNotFoundException(String message) {
        super(message);
    }
}

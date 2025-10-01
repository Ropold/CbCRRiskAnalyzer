package de.ropold.backend.exception;

import de.ropold.backend.exception.notfoundexceptions.CompanyNotFoundException;
import de.ropold.backend.exception.notfoundexceptions.UserNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class GlobalExceptionHandlerTest {

    @InjectMocks
    private GlobalExceptionHandler globalExceptionHandler;

    @Test
    void testHandleRuntimeException() {
        RuntimeException exception = new RuntimeException("Something went wrong");

        ErrorResponse response = globalExceptionHandler.handleRuntimeException(exception);

        assertThat(response.code()).isEqualTo("INTERNAL_ERROR");
        assertThat(response.message()).isEqualTo("Something went wrong");
    }

    @Test
    void testHandleAccessDeniedException() {
        de.ropold.backend.exception.notfoundexceptions.AccessDeniedException exception =
                new de.ropold.backend.exception.notfoundexceptions.AccessDeniedException("Access denied");

        ErrorResponse response = globalExceptionHandler.handleAccessDeniedException(exception);

        assertThat(response.code()).isEqualTo("ACCESS_DENIED");
        assertThat(response.message()).isEqualTo("Access denied");
    }

    @Test
    void testHandleNotFoundException_CompanyNotFound() {
        CompanyNotFoundException exception = new CompanyNotFoundException("Company not found with id: 123");

        ErrorResponse response = globalExceptionHandler.handleNotFoundException(exception);

        assertThat(response.code()).isEqualTo("NOT_FOUND");
        assertThat(response.message()).isEqualTo("Company not found with id: 123");
    }

    @Test
    void testHandleNotFoundException_UserNotFound() {
        UserNotFoundException exception = new UserNotFoundException("User not found");

        ErrorResponse response = globalExceptionHandler.handleNotFoundException(exception);

        assertThat(response.code()).isEqualTo("NOT_FOUND");
        assertThat(response.message()).isEqualTo("User not found");
    }
}

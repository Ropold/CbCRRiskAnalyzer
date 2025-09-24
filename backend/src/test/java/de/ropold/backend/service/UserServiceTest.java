package de.ropold.backend.service;

import de.ropold.backend.model.UserModel;
import de.ropold.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private UUID fixedId;
    private LocalDateTime fixedDate;
    private UserModel testUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        fixedId = UUID.fromString("123e4567-e89b-12d3-a456-426614174000");
        fixedDate = LocalDateTime.of(2024, 1, 1, 12, 0);
        testUser = new UserModel(
                fixedId,
                "githubId123",
                "testuser",
                "Test User",
                "https://avatars.githubusercontent.com/u/123456",
                "https://github.com/testuser",
                "USER",
                "de",
                fixedDate,
                null
        );
    }

    @Test
    void getUserById_UserExists_ReturnsUser() {
        when(userRepository.findById(fixedId)).thenReturn(Optional.of(testUser));

        UserModel result = userService.getUserById(fixedId);

        assertNotNull(result);
        assertEquals(testUser, result);
        verify(userRepository, times(1)).findById(fixedId);
    }

    @Test
    void getUserById_UserDoesNotExist_ThrowsException() {
        UUID userId = UUID.fromString("123e4567-e89b-12d3-a456-426614174001");
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> userService.getUserById(userId));
        assertEquals("User not found", exception.getMessage());
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void getUserByGitHubId_UserExists_ReturnsUser() {
        String githubId = "githubId123";
        when(userRepository.findByGithubId(githubId)).thenReturn(Optional.of(testUser));

        UserModel result = userService.getUserByGithubId(githubId);

        assertNotNull(result);
        assertEquals(testUser, result);
        verify(userRepository, times(1)).findByGithubId(githubId);
    }

    @Test
    void getUserByGitHubId_UserDoesNotExist_ThrowsException() {
        String githubId = "nonExistentGitHubId";
        when(userRepository.findByGithubId(githubId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> userService.getUserByGithubId(githubId));
        assertEquals("User not found", exception.getMessage());
        verify(userRepository, times(1)).findByGithubId(githubId);
    }

//    @Test
//    void createOrUpdateFromGitHub_UserExists_UpdatesLastLogin() {
//    }
//
//    @Test
//    void createOrUpdateFromGitHub_UserDoesNotExist_CreatesNewUser() {
//    }

    @Test
    void setPreferredLanguage_UpdatesLanguage() {
        String githubId = "githubId123";
        String newLanguage = "en";

        doNothing().when(userRepository).updatePreferredLanguage(githubId, newLanguage);

        userService.setPreferredLanguage(githubId, newLanguage);

        verify(userRepository, times(1)).updatePreferredLanguage(githubId, newLanguage);
    }

    @Test
    void setPreferredLanguage_NonExistentUser_DoesNotThrow() {
        String githubId = "nonExistentGitHubId";
        String newLanguage = "en";

        doNothing().when(userRepository).updatePreferredLanguage(githubId, newLanguage);

        assertDoesNotThrow(() -> userService.setPreferredLanguage(githubId, newLanguage));

        verify(userRepository, times(1)).updatePreferredLanguage(githubId, newLanguage);
    }


}



package de.ropold.backend.service;

import de.ropold.backend.model.UserModel;
import de.ropold.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.UUID;

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


}



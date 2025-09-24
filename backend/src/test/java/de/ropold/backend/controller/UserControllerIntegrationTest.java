package de.ropold.backend.controller;

import de.ropold.backend.model.UserModel;
import de.ropold.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    private UserModel testUser;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();

        UserModel user1 = new UserModel();
        user1.setGithubId("githubId1");
        user1.setUsername("userName1");
        user1.setName("Test User 1");
        user1.setAvatarUrl("https://avatars.githubusercontent.com/u/123456");
        user1.setGithubUrl("https://github.com/userName1");
        user1.setRole("USER");
        user1.setPreferredLanguage("de");
        user1.setCreatedAt(LocalDateTime.of(2024, 1, 1, 12, 0));
        user1.setLastLoginAt(LocalDateTime.of(2024, 1, 1, 12, 30));

        testUser = userRepository.save(user1);
    }

    @Test
    @WithMockUser(username = "githubId1", authorities = {"OIDC_USER"})
    void testGetMe() throws Exception {
        OAuth2User mockOAuth2User = mock(OAuth2User.class);
        when(mockOAuth2User.getName()).thenReturn("userName1");
        when(mockOAuth2User.getAttribute("id")).thenReturn("githubId1");

        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
                mockOAuth2User,
                List.of(new SimpleGrantedAuthority("OIDC_USER")),
                "github"  // registrationId für GitHub
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        mockMvc.perform(get("/api/users/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("userName1"));
    }

    @Test
    void testGetMe_Unauthenticated() throws Exception {
        mockMvc.perform(get("/api/users/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("anonymousUser"));
    }

    @Test
    void testGetUserDetails_withLoggedInUser() throws Exception {
        // Erstellen eines Mock OAuth2User
        OAuth2User mockUser = mock(OAuth2User.class);
        when(mockUser.getAttribute("id")).thenReturn("githubId1");
        when(mockUser.getAttribute("login")).thenReturn("userName1");
        when(mockUser.getAttribute("name")).thenReturn("Test User 1");
        when(mockUser.getAttribute("avatar_url")).thenReturn("https://avatars.githubusercontent.com/u/123456");
        when(mockUser.getAttribute("html_url")).thenReturn("https://github.com/userName1");
        when(mockUser.getAttribute("role")).thenReturn("USER");
        when(mockUser.getAttribute("preferred_language")).thenReturn("de");
        when(mockUser.getAttribute("created_at")).thenReturn("2024-01-01T12:00");
        when(mockUser.getAttribute("last_login_at")).thenReturn("2024-01-01T12:30");

        // Verwende OAuth2AuthenticationToken statt UsernamePasswordAuthenticationToken

        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
                mockUser,
                List.of(new SimpleGrantedAuthority("OIDC_USER")),
                "github"
        );
        SecurityContextHolder.getContext().setAuthentication(authToken);

        mockMvc.perform(get("/api/users/me/details")
                        .with(authentication(authToken)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(testUser.getId().toString()))
                .andExpect(jsonPath("$.githubId").value("githubId1"))
                .andExpect(jsonPath("$.username").value("userName1"))
                .andExpect(jsonPath("$.name").value("Test User 1"))
                .andExpect(jsonPath("$.avatarUrl").value("https://avatars.githubusercontent.com/u/123456"))
                .andExpect(jsonPath("$.githubUrl").value("https://github.com/userName1"))
                .andExpect(jsonPath("$.role").value("USER"))
                .andExpect(jsonPath("$.preferredLanguage").value("de"))
                .andExpect(jsonPath("$.createdAt").value("2024-01-01T12:00" ))
                .andExpect(jsonPath("$.lastLoginAt").value("2024-01-01T12:30"));
    }


}

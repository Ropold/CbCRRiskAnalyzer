package de.ropold.backend.service;

import de.ropold.backend.model.UserModel;
import de.ropold.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserModel getUserByGithubId(String githubId) {
        return userRepository.findByGithubId(githubId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserModel getUserById(UUID fixedId) {
        return userRepository.findById(fixedId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void setPreferredLanguage(String githubId, String languageIso) {
        userRepository.updatePreferredLanguage(githubId, languageIso);
    }
}

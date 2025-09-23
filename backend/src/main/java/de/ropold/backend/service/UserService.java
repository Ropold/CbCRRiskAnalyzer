package de.ropold.backend.service;

import de.ropold.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;


    public void setPreferredLanguage(String githubId, String languageIso) {
        userRepository.updatePreferredLanguage(githubId, languageIso);
    }
}

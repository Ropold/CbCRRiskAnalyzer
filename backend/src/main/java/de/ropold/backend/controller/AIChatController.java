package de.ropold.backend.controller;

import de.ropold.backend.service.AIChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai-chat")
@RequiredArgsConstructor
public class AIChatController {

    private final AIChatService aiChatService;

    @PostMapping
    public Map<String, String> chat(@RequestBody Map<String, String> request) {
        String question = request.get("question");
        String answer = aiChatService.getAIResponse(question);
        return Map.of("answer", answer);
    }
}
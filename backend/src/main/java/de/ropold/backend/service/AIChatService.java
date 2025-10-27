package de.ropold.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.List;
import java.util.Map;

@Service
public class AIChatService {

    private static final String LM_STUDIO_URL = "http://192.168.178.27:1234/v1/chat/completions";

    public String getAIResponse(String question) {
        RestTemplate restTemplate = new RestTemplate();

        // Build request body in OpenAI format
        Map<String, Object> requestBody = Map.of(
            "model", "local-model",
            "messages", List.of(
                Map.of(
                    "role", "user",
                    "content", question
                )
            ),
            "temperature", 0.7,
            "stream", false
        );

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            // Call LM Studio API
            Map<String, Object> response = restTemplate.postForObject(
                LM_STUDIO_URL,
                entity,
                Map.class
            );

            // Extract answer from response
            if (response != null && response.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                    return (String) message.get("content");
                }
            }

            return "No response from AI.";
        } catch (Exception e) {
            return "Error connecting to LM Studio: " + e.getMessage();
        }
    }
}
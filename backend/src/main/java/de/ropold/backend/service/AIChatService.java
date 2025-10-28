package de.ropold.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AIChatService {

    private static final int MAX_ITERATIONS = 5; // Prevent infinite loops

    @Value("${lm.studio.url}")
    private String lmStudioUrl;

    private final AIToolService aiToolService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String getAIResponse(String question) {
        RestTemplate restTemplate = new RestTemplate();

        // Initialize conversation with user question
        List<Map<String, Object>> messages = new ArrayList<>();
        messages.add(Map.of("role", "user", "content", question));

        int iteration = 0;
        while (iteration < MAX_ITERATIONS) {
            iteration++;

            // Build request body with tools
            Map<String, Object> requestBody = Map.of(
                "model", "local-model",
                "messages", messages,
                "temperature", 0.7,
                "stream", false,
                "tools", aiToolService.getToolDefinitions()
            );

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            try {
                // Call LM Studio API
                Map<String, Object> response = restTemplate.postForObject(
                    lmStudioUrl,
                    entity,
                    Map.class
                );

                if (response == null || !response.containsKey("choices")) {
                    return "No response from AI.";
                }

                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                if (choices.isEmpty()) {
                    return "No response from AI.";
                }

                Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");

                // Add assistant message to conversation
                messages.add(message);

                // Check if model wants to call tools
                List<Map<String, Object>> toolCalls = (List<Map<String, Object>>) message.get("tool_calls");

                if (toolCalls == null || toolCalls.isEmpty()) {
                    // No tool calls - return final answer
                    return (String) message.get("content");
                }

                // Execute each tool call
                for (Map<String, Object> toolCall : toolCalls) {
                    Map<String, Object> function = (Map<String, Object>) toolCall.get("function");
                    String toolName = (String) function.get("name");
                    Object argumentsObj = function.get("arguments");

                    // Parse arguments - can be String or Map
                    JsonNode argsNode;
                    if (argumentsObj instanceof String) {
                        // Parse JSON string
                        argsNode = objectMapper.readTree((String) argumentsObj);
                    } else {
                        // Convert Map to JsonNode
                        argsNode = objectMapper.valueToTree(argumentsObj);
                    }

                    // Execute tool
                    String toolResult = aiToolService.executeTool(toolName, argsNode);

                    // Add tool result to conversation
                    messages.add(Map.of(
                        "role", "tool",
                        "tool_name", toolName,
                        "content", toolResult
                    ));
                }

                // Continue loop to get final answer with tool results

            } catch (Exception e) {
                return "Error connecting to LM Studio: " + e.getMessage();
            }
        }

        return "Maximum iterations reached. Please try again with a simpler question.";
    }
}
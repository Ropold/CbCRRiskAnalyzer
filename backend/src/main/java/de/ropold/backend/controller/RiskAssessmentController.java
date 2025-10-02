package de.ropold.backend.controller;

import de.ropold.backend.dto.RiskAssessmentResponse;
import de.ropold.backend.exception.notfoundexceptions.AccessDeniedException;
import de.ropold.backend.model.RiskAssessmentModel;
import de.ropold.backend.service.RiskAssessmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/risk-assessments")
@RequiredArgsConstructor
public class RiskAssessmentController {

    private final RiskAssessmentService riskAssessmentService;

    @GetMapping
    public List<RiskAssessmentResponse> getAllRiskAssessments() {
        return riskAssessmentService.getAllRiskAssessments();
    }

    @GetMapping("/{id}")
    public RiskAssessmentResponse getRiskAssessmentById(@PathVariable UUID id) {
        return riskAssessmentService.getRiskAssessmentById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public RiskAssessmentResponse addRiskAssessment(
            @RequestBody RiskAssessmentModel riskAssessmentModel,
            @AuthenticationPrincipal OAuth2User authentication) {
        if(authentication == null){
            throw new AccessDeniedException("User not authenticated");
        }
        RiskAssessmentModel saved = riskAssessmentService.addRiskAssessment(riskAssessmentModel);
        return riskAssessmentService.getRiskAssessmentById(saved.getId());
    }

    @PutMapping("/{id}")
    public RiskAssessmentResponse updateRiskAssessment(
            @PathVariable UUID id,
            @RequestBody RiskAssessmentModel riskAssessmentModel,
            @AuthenticationPrincipal OAuth2User authentication){
        if(authentication == null){
            throw new AccessDeniedException("User not authenticated");
        }
        riskAssessmentService.getRiskAssessmentById(id);
        riskAssessmentModel.setId(id);
        RiskAssessmentModel updated = riskAssessmentService.updateRiskAssessment(riskAssessmentModel);
        return riskAssessmentService.getRiskAssessmentById(updated.getId());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRiskAssessment(@PathVariable UUID id, @AuthenticationPrincipal OAuth2User authentication) {
        if (authentication == null) {
            throw new AccessDeniedException("User not authenticated");
        }
        riskAssessmentService.deleteRiskAssessment(id);
    }
}

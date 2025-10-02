package de.ropold.backend.service;

import de.ropold.backend.exception.notfoundexceptions.RiskAssessmentNotFoundException;
import de.ropold.backend.model.RiskAssessmentModel;
import de.ropold.backend.repository.RiskAssessmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RiskAssessmentService {

    private final RiskAssessmentRepository riskAssessmentRepository;

    public List<RiskAssessmentModel> getAllRiskAssessments() {
        return riskAssessmentRepository.findAll();
    }

    public RiskAssessmentModel getRiskAssessmentById(UUID id) {
        return riskAssessmentRepository.findById(id)
                .orElseThrow(() -> new RiskAssessmentNotFoundException("Risk Assessment not found with id: " + id));
    }

    public RiskAssessmentModel addRiskAssessment(RiskAssessmentModel riskAssessmentModel) {
        return riskAssessmentRepository.save(riskAssessmentModel);
    }

    public RiskAssessmentModel updateRiskAssessment(RiskAssessmentModel riskAssessmentModel) {
        return riskAssessmentRepository.save(riskAssessmentModel);
    }

    public void deleteRiskAssessment(UUID id) {
        riskAssessmentRepository.findById(id)
                .orElseThrow(() -> new RiskAssessmentNotFoundException("Risk Assessment not found with id: " + id));
        riskAssessmentRepository.deleteById(id);
    }
}

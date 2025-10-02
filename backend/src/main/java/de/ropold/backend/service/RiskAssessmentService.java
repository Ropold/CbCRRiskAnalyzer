package de.ropold.backend.service;

import de.ropold.backend.dto.CbcrReportBasicInfo;
import de.ropold.backend.dto.CompanyBasicInfo;
import de.ropold.backend.dto.CountryBasicInfo;
import de.ropold.backend.dto.RiskAssessmentResponse;
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

    public List<RiskAssessmentResponse> getAllRiskAssessments() {
        return riskAssessmentRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public RiskAssessmentResponse getRiskAssessmentById(UUID id) {
        RiskAssessmentModel riskAssessment = riskAssessmentRepository.findById(id)
                .orElseThrow(() -> new RiskAssessmentNotFoundException("Risk Assessment not found with id: " + id));
        return toDTO(riskAssessment);
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

    private RiskAssessmentResponse toDTO(RiskAssessmentModel model) {
        CompanyBasicInfo companyInfo = new CompanyBasicInfo(
                model.getCbcrReport().getCompany().getId(),
                model.getCbcrReport().getCompany().getName(),
                model.getCbcrReport().getCompany().getIndustry(),
                model.getCbcrReport().getCompany().getReportingCurrency()
        );

        CountryBasicInfo countryInfo = new CountryBasicInfo(
                model.getCbcrReport().getCountry().getId(),
                model.getCbcrReport().getCountry().getCountryCode(),
                model.getCbcrReport().getCountry().getCountryName()
        );

        CbcrReportBasicInfo cbcrReportInfo = new CbcrReportBasicInfo(
                model.getCbcrReport().getId(),
                companyInfo,
                model.getCbcrReport().getReportingYear(),
                countryInfo,
                model.getCbcrReport().getRevenuesTotal(),
                model.getCbcrReport().getProfitBeforeTax()
        );

        return new RiskAssessmentResponse(
                model.getId(),
                cbcrReportInfo,
                model.getOverallRiskLevel(),
                model.getRiskScore(),
                model.getLowEtrFlag(),
                model.getTaxHavenFlag(),
                model.getProfitShiftingIndicator(),
                model.getNegativeTaxFlag(),
                model.getHighRevenueLowTaxFlag(),
                model.getSubstanceMismatchFlag(),
                model.getBlacklistJurisdictionFlag(),
                model.getEtrVariance(),
                model.getRevenuePerEmployeeRatio(),
                model.getProfitPerEmployeeRatio(),
                model.getRiskExplanation(),
                model.getRecommendedAction(),
                model.getCreatedAt(),
                model.getUpdatedAt()
        );
    }

}

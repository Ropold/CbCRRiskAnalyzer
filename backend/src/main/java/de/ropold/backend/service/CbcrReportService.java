package de.ropold.backend.service;

import de.ropold.backend.dto.CbcrReportResponse;
import de.ropold.backend.dto.CompanyBasicInfo;
import de.ropold.backend.dto.CountryBasicInfo;
import de.ropold.backend.exception.notfoundexceptions.CbcrNotFoundException;
import de.ropold.backend.model.CbcrReportModel;
import de.ropold.backend.repository.CbcrReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CbcrReportService {

    private final CbcrReportRepository cbcrReportRepository;

    public List<CbcrReportResponse> getAllCbcrReports() {
        return cbcrReportRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public CbcrReportResponse getCbcrReportById(UUID id) {
        CbcrReportModel cbcrReport = cbcrReportRepository.findById(id)
                .orElseThrow(()-> new CbcrNotFoundException("Cbcr Report not found with id: " + id));
        return toDTO(cbcrReport);
    }

    public CbcrReportModel addCbcrReport(CbcrReportModel cbcrReportModel) {
        return cbcrReportRepository.save(cbcrReportModel);
    }

    public CbcrReportModel updateCbcrReport(CbcrReportModel cbcrReportModel) {
        return cbcrReportRepository.save(cbcrReportModel);
    }

    public void deleteCbcrReport(UUID id) {
        cbcrReportRepository.findById(id)
                .orElseThrow(()-> new CbcrNotFoundException("Cbcr Report not found with id: " + id));
        cbcrReportRepository.deleteById(id);
    }

    private CbcrReportResponse toDTO(CbcrReportModel model) {
        CompanyBasicInfo companyInfo = new CompanyBasicInfo(
                model.getCompany().getId(),
                model.getCompany().getName(),
                model.getCompany().getIndustry(),
                model.getCompany().getReportingCurrency()
        );

        CountryBasicInfo countryInfo = new CountryBasicInfo(
                model.getCountry().getId(),
                model.getCountry().getCountryCode(),
                model.getCountry().getCountryName()
        );

        return new CbcrReportResponse(
                model.getId(),
                companyInfo,
                model.getReportingYear(),
                model.getFiscalYearEnd(),
                countryInfo,
                model.getRevenuesUnrelatedParty(),
                model.getRevenuesRelatedParty(),
                model.getRevenuesTotal(),
                model.getProfitBeforeTax(),
                model.getIncomeTaxPaid(),
                model.getIncomeTaxAccrued(),
                model.getEffectiveTaxRate(),
                model.getExpectedTaxRate(),
                model.getStatedCapital(),
                model.getAccumulatedEarnings(),
                model.getTangibleAssets(),
                model.getIntangibleAssets(),
                model.getNumberOfEmployees(),
                model.getRevenuePerEmployee(),
                model.getCommentReference(),
                model.getTaxExplanation(),
                model.getDataSource(),
                model.getAuditStatus(),
                model.getBusinessActivities(),
                model.getCreatedAt(),
                model.getUpdatedAt()
        );
    }

}

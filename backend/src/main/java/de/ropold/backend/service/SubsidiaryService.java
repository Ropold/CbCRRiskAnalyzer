package de.ropold.backend.service;

import de.ropold.backend.dto.CompanyBasicInfo;
import de.ropold.backend.dto.CountryBasicInfo;
import de.ropold.backend.dto.SubsidiaryResponse;
import de.ropold.backend.exception.notfoundexceptions.SubsidiaryNotFoundException;
import de.ropold.backend.model.SubsidiaryModel;
import de.ropold.backend.repository.SubsidiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SubsidiaryService {

    private final SubsidiaryRepository subsidiaryRepository;

    public List<SubsidiaryResponse> getAllSubsidiaries() {
        return subsidiaryRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public SubsidiaryResponse getSubsidiaryById(UUID id) {
        SubsidiaryModel subsidiary = subsidiaryRepository.findById(id)
                .orElseThrow(() -> new SubsidiaryNotFoundException("Subsidiary not found with id: " + id));
        return toDTO(subsidiary);
    }

    public SubsidiaryModel addSubsidiary(SubsidiaryModel subsidiaryModel) {
        return subsidiaryRepository.save(subsidiaryModel);
    }

    public SubsidiaryModel updateSubsidiary(SubsidiaryModel subsidiaryModel) {
        return subsidiaryRepository.save(subsidiaryModel);
    }

    public void deleteSubsidiary(UUID id) {
        subsidiaryRepository.findById(id)
                .orElseThrow(() -> new SubsidiaryNotFoundException("Subsidiary not found with id: " + id));
        subsidiaryRepository.deleteById(id);
    }

    private SubsidiaryResponse toDTO(SubsidiaryModel model) {
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

        return new SubsidiaryResponse(
                model.getId(),
                companyInfo,
                model.getName(),
                countryInfo,
                model.getLeiCode(),
                model.getTaxIdentificationNumber(),
                model.getEntityType(),
                model.getMainBusinessActivity(),
                model.getAdditionalActivities(),
                model.getIsActive(),
                model.getCreatedAt(),
                model.getUpdatedAt()
        );
    }
}

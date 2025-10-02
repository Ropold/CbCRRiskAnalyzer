package de.ropold.backend.service;

import de.ropold.backend.exception.notfoundexceptions.CompanyNotFoundException;
import de.ropold.backend.model.CompanyModel;
import de.ropold.backend.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final CloudinaryService cloudinaryService;

    public List<CompanyModel> getAllCompanies() {
        return companyRepository.findAll();
    }

    public CompanyModel getCompanyById(UUID id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new CompanyNotFoundException("Company not found with id: " + id));
    }

    public CompanyModel addCompany(CompanyModel companyModel) {
        return companyRepository.save(companyModel);
    }

    public void deleteCompany(UUID id) {
        CompanyModel companyModel = companyRepository.findById(id)
                .orElseThrow(() -> new CompanyNotFoundException("Company not found with id: " + id));

        if (companyModel.getImageUrl() != null) {
            cloudinaryService.deleteImage(companyModel.getImageUrl());
        }

        companyRepository.deleteById(id);
    }
}

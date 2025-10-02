package de.ropold.backend.controller;

import de.ropold.backend.exception.notfoundexceptions.AccessDeniedException;
import de.ropold.backend.model.CompanyModel;
import de.ropold.backend.service.CloudinaryService;
import de.ropold.backend.service.CompanyService;
import de.ropold.backend.service.ImageUploadUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;
    private final CloudinaryService cloudinaryService;
    private final ImageUploadUtil imageUploadUtil;

    @GetMapping
    public List<CompanyModel> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @GetMapping("/{id}")
    public CompanyModel getCompanyById(@PathVariable UUID id) {
        return companyService.getCompanyById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public CompanyModel addCompany(
            @RequestPart("customerModel") CompanyModel companyModel,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @AuthenticationPrincipal OAuth2User authentication) throws IOException {

        if(authentication == null){
            throw new AccessDeniedException("User not authenticated");
        }

        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            imageUrl = cloudinaryService.uploadImage(image);
        }

        return companyService.addCompany(
                new CompanyModel(
                        null,
                        companyModel.getName(),
                        companyModel.getIndustry(),
                        companyModel.getHeadquartersCountry(),
                        companyModel.getReportingCurrency(),
                        companyModel.getTaxIdentificationNumber(),
                        companyModel.getLeiCode(),
                        companyModel.getParentCompany(),
                        companyModel.getIsUltimateParent(),
                        companyModel.getConsolidationScope(),
                        companyModel.getCbcrReportingThreshold(),
                        imageUrl,
                        null,
                        null
                )
        );
    }

    @PutMapping("/{id}")
    public CompanyModel updateCompany(
            @PathVariable UUID id,
            @RequestPart("companyModel") CompanyModel companyModel,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @AuthenticationPrincipal OAuth2User authentication) throws IOException {

        if (authentication == null) {
            throw new AccessDeniedException("User not authenticated");
        }

        CompanyModel existingCompany = companyService.getCompanyById(id);
        String newImageUrl = imageUploadUtil.determineImageUrl(image, companyModel.getImageUrl(), existingCompany.getImageUrl());


        CompanyModel updatedCompany = new CompanyModel(
                existingCompany.getId(),
                companyModel.getName(),
                companyModel.getIndustry(),
                companyModel.getHeadquartersCountry(),
                companyModel.getReportingCurrency(),
                companyModel.getTaxIdentificationNumber(),
                companyModel.getLeiCode(),
                companyModel.getParentCompany(),
                companyModel.getIsUltimateParent(),
                companyModel.getConsolidationScope(),
                companyModel.getCbcrReportingThreshold(),
                newImageUrl,
                existingCompany.getCreatedAt(),
                existingCompany.getUpdatedAt()
        );

        return companyService.updateCompany(updatedCompany);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCompany(@PathVariable UUID id, @AuthenticationPrincipal OAuth2User authentication){

        if (authentication == null) {
            throw new AccessDeniedException("User not authenticated");
        }
        companyService.deleteCompany(id);
    }

}

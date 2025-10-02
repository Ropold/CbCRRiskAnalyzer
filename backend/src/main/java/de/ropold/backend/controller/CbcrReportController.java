package de.ropold.backend.controller;

import de.ropold.backend.exception.notfoundexceptions.AccessDeniedException;
import de.ropold.backend.model.CbcrReportModel;
import de.ropold.backend.service.CbcrReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/cbcr-reports")
@RequiredArgsConstructor
public class CbcrReportController {

    private final CbcrReportService cbcrReportService;

    @GetMapping
    public List<CbcrReportModel> getAllCbcrReports() {
        return cbcrReportService.getAllCbcrReports();
    }

    @GetMapping("/{id}")
    public CbcrReportModel getCbcrReportById(@PathVariable UUID id) {
        return cbcrReportService.getCbcrReportById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public CbcrReportModel addCbcrReport(
            @RequestBody CbcrReportModel cbcrReportModel,
            @AuthenticationPrincipal OAuth2User authentication) {
        if(authentication == null){
            throw new AccessDeniedException("User not authenticated");
        }
        return cbcrReportService.addCbcrReport(cbcrReportModel);
    }

    @PutMapping("/{id}")
    public CbcrReportModel updateCbcrReport(
            @PathVariable UUID id,
            @RequestBody CbcrReportModel cbcrReportModel,
            @AuthenticationPrincipal OAuth2User authentication){
        if(authentication == null){
            throw new AccessDeniedException("User not authenticated");
        }
        cbcrReportService.getCbcrReportById(id);
        cbcrReportModel.setId(id);
        return cbcrReportService.updateCbcrReport(cbcrReportModel);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCbcrReport(@PathVariable UUID id, @AuthenticationPrincipal OAuth2User authentication) {
        if (authentication == null) {
            throw new AccessDeniedException("User not authenticated");
        }
        cbcrReportService.deleteCbcrReport(id);
    }
}

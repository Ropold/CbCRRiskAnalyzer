package de.ropold.backend.controller;

import de.ropold.backend.dto.SubsidiaryResponse;
import de.ropold.backend.exception.notfoundexceptions.AccessDeniedException;
import de.ropold.backend.model.SubsidiaryModel;
import de.ropold.backend.service.SubsidiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/subsidiaries")
@RequiredArgsConstructor
public class SubsidiaryController {

    private final SubsidiaryService subsidiaryService;

    @GetMapping
    public List<SubsidiaryResponse> getAllSubsidiaries() {
        return subsidiaryService.getAllSubsidiaries();
    }

    @GetMapping("/{id}")
    public SubsidiaryResponse getSubsidiaryById(@PathVariable UUID id) {
        return subsidiaryService.getSubsidiaryById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public SubsidiaryResponse addSubsidiary(
            @RequestBody SubsidiaryModel subsidiaryModel,
            @AuthenticationPrincipal OAuth2User authentication) {
        if(authentication == null){
            throw new AccessDeniedException("User not authenticated");
        }
        SubsidiaryModel saved = subsidiaryService.addSubsidiary(subsidiaryModel);
        return subsidiaryService.getSubsidiaryById(saved.getId());
    }

    @PutMapping("/{id}")
    public SubsidiaryResponse updateSubsidiary(
            @PathVariable UUID id,
            @RequestBody SubsidiaryModel subsidiaryModel,
            @AuthenticationPrincipal OAuth2User authentication){
        if(authentication == null){
            throw new AccessDeniedException("User not authenticated");
        }
        subsidiaryService.getSubsidiaryById(id);
        subsidiaryModel.setId(id);
        SubsidiaryModel updated = subsidiaryService.updateSubsidiary(subsidiaryModel);
        return subsidiaryService.getSubsidiaryById(updated.getId());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSubsidiary(@PathVariable UUID id, @AuthenticationPrincipal OAuth2User authentication) {
            if (authentication == null) {
                throw new AccessDeniedException("User not authenticated");
            }
            subsidiaryService.deleteSubsidiary(id);
        }
}

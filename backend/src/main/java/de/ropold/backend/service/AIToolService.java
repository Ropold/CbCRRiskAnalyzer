package de.ropold.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.ropold.backend.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AIToolService {

    private final CompanyService companyService;
    private final CountryService countryService;
    private final SubsidiaryService subsidiaryService;
    private final CbcrReportService cbcrReportService;
    private final RiskAssessmentService riskAssessmentService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<Map<String, Object>> getToolDefinitions() {
        return List.of(
            // Company tools
            Map.of(
                "type", "function",
                "function", Map.of(
                    "name", "list_companies",
                    "description", "Get a list of all companies in the database",
                    "parameters", Map.of("type", "object", "properties", Map.of())
                )
            ),
            Map.of(
                "type", "function",
                "function", Map.of(
                    "name", "search_companies",
                    "description", "Search for companies by name",
                    "parameters", Map.of(
                        "type", "object",
                        "required", List.of("query"),
                        "properties", Map.of(
                            "query", Map.of("type", "string", "description", "Company name to search for")
                        )
                    )
                )
            ),
            Map.of(
                "type", "function",
                "function", Map.of(
                    "name", "get_company_details",
                    "description", "Get detailed information about a specific company",
                    "parameters", Map.of(
                        "type", "object",
                        "required", List.of("company_id"),
                        "properties", Map.of(
                            "company_id", Map.of("type", "string", "description", "UUID of the company")
                        )
                    )
                )
            ),
            // Country tools
            Map.of(
                "type", "function",
                "function", Map.of(
                    "name", "list_countries",
                    "description", "Get a list of all countries in the database",
                    "parameters", Map.of("type", "object", "properties", Map.of())
                )
            ),
            Map.of(
                "type", "function",
                "function", Map.of(
                    "name", "search_countries",
                    "description", "Search for countries by name",
                    "parameters", Map.of(
                        "type", "object",
                        "required", List.of("query"),
                        "properties", Map.of(
                            "query", Map.of("type", "string", "description", "Country name to search for")
                        )
                    )
                )
            ),
            Map.of(
                "type", "function",
                "function", Map.of(
                    "name", "get_tax_havens",
                    "description", "Get a list of all tax haven countries",
                    "parameters", Map.of("type", "object", "properties", Map.of())
                )
            )
        );
    }

    public String executeTool(String toolName, JsonNode arguments) {
        try {
            return switch (toolName) {
                case "list_companies" -> listCompanies();
                case "search_companies" -> searchCompanies(arguments.get("query").asText());
                case "get_company_details" -> getCompanyDetails(arguments.get("company_id").asText());
                case "list_countries" -> listCountries();
                case "search_countries" -> searchCountries(arguments.get("query").asText());
                case "get_tax_havens" -> getTaxHavens();
                default -> "Unknown tool: " + toolName;
            };
        } catch (Exception e) {
            return "Error executing tool: " + e.getMessage();
        }
    }

    // Company tools
    private String listCompanies() {
        List<CompanyModel> companies = companyService.getAllCompanies();
        if (companies.isEmpty()) {
            return "No companies found in the database.";
        }
        StringBuilder result = new StringBuilder(String.format("Found %d companies:\n", companies.size()));
        for (CompanyModel company : companies) {
            result.append(String.format("- %s (ID: %s, Industry: %s)\n",
                company.getName(),
                company.getId(),
                company.getIndustry() != null ? company.getIndustry() : "N/A"));
        }
        return result.toString();
    }

    private String searchCompanies(String query) {
        List<CompanyModel> allCompanies = companyService.getAllCompanies();
        List<CompanyModel> matchingCompanies = allCompanies.stream()
            .filter(c -> c.getName() != null && c.getName().toLowerCase().contains(query.toLowerCase()))
            .limit(10)
            .toList();

        if (matchingCompanies.isEmpty()) {
            return "No companies found matching: " + query;
        }

        StringBuilder result = new StringBuilder(String.format("Found %d companies matching '%s':\n", matchingCompanies.size(), query));
        for (CompanyModel company : matchingCompanies) {
            result.append(String.format("- %s (ID: %s, Industry: %s)\n",
                company.getName(),
                company.getId(),
                company.getIndustry() != null ? company.getIndustry() : "N/A"));
        }
        return result.toString();
    }

    private String getCompanyDetails(String companyId) {
        try {
            CompanyModel company = companyService.getCompanyById(java.util.UUID.fromString(companyId));
            return String.format(
                "Company Details:\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "Name: %s\n" +
                "ID: %s\n" +
                "Industry: %s\n" +
                "Headquarters Country: %s\n" +
                "Reporting Currency: %s\n" +
                "Tax Identification Number: %s\n" +
                "LEI Code: %s\n" +
                "Is Ultimate Parent: %s\n" +
                "Consolidation Scope: %s\n" +
                "CbCR Reporting Threshold: %s\n",
                company.getName(),
                company.getId(),
                company.getIndustry() != null ? company.getIndustry() : "N/A",
                company.getHeadquartersCountry() != null ? company.getHeadquartersCountry().getCountryName() : "N/A",
                company.getReportingCurrency() != null ? company.getReportingCurrency() : "EUR",
                company.getTaxIdentificationNumber() != null ? company.getTaxIdentificationNumber() : "N/A",
                company.getLeiCode() != null ? company.getLeiCode() : "N/A",
                company.getIsUltimateParent() != null ? (company.getIsUltimateParent() ? "Yes" : "No") : "N/A",
                company.getConsolidationScope() != null ? company.getConsolidationScope() : "N/A",
                company.getCbcrReportingThreshold() != null ? company.getCbcrReportingThreshold().toString() + " " + company.getReportingCurrency() : "N/A"
            );
        } catch (Exception e) {
            return "Company not found with ID: " + companyId;
        }
    }

    // Country tools
    private String listCountries() {
        List<CountryModel> countries = countryService.getAllCountries();
        if (countries.isEmpty()) {
            return "No countries found in the database.";
        }
        StringBuilder result = new StringBuilder(String.format("Found %d countries:\n", countries.size()));
        for (CountryModel country : countries) {
            result.append(String.format("- %s (%s) - Region: %s, Tax Haven: %s\n",
                country.getCountryName(),
                country.getCountryCode(),
                country.getRegion() != null ? country.getRegion() : "N/A",
                country.getTaxHaven() != null && country.getTaxHaven() ? "Yes" : "No"));
        }
        return result.toString();
    }

    private String searchCountries(String query) {
        List<CountryModel> allCountries = countryService.getAllCountries();
        List<CountryModel> matchingCountries = allCountries.stream()
            .filter(c -> c.getCountryName() != null && c.getCountryName().toLowerCase().contains(query.toLowerCase()))
            .limit(10)
            .toList();

        if (matchingCountries.isEmpty()) {
            return "No countries found matching: " + query;
        }

        StringBuilder result = new StringBuilder(String.format("Found %d countries matching '%s':\n", matchingCountries.size(), query));
        for (CountryModel country : matchingCountries) {
            result.append(String.format("- %s (%s) - Tax Rate: %s%%, Tax Haven: %s\n",
                country.getCountryName(),
                country.getCountryCode(),
                country.getStatutoryTaxRate() != null ? country.getStatutoryTaxRate() : "N/A",
                country.getTaxHaven() != null && country.getTaxHaven() ? "Yes" : "No"));
        }
        return result.toString();
    }

    private String getTaxHavens() {
        List<CountryModel> allCountries = countryService.getAllCountries();
        List<CountryModel> taxHavens = allCountries.stream()
            .filter(c -> c.getTaxHaven() != null && c.getTaxHaven())
            .toList();

        if (taxHavens.isEmpty()) {
            return "No tax havens found in the database.";
        }

        StringBuilder result = new StringBuilder(String.format("Found %d tax haven countries:\n", taxHavens.size()));
        for (CountryModel country : taxHavens) {
            result.append(String.format("- %s (%s) - Tax Rate: %s%%, Blacklist Status: %s\n",
                country.getCountryName(),
                country.getCountryCode(),
                country.getStatutoryTaxRate() != null ? country.getStatutoryTaxRate() : "N/A",
                country.getBlacklistStatus() != null ? country.getBlacklistStatus() : "None"));
        }
        return result.toString();
    }
}
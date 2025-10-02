package de.ropold.backend.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record CbcrReportBasicInfo(
        UUID id,
        CompanyBasicInfo company,
        Integer reportingYear,
        CountryBasicInfo country,
        BigDecimal revenuesTotal,
        BigDecimal profitBeforeTax
) {
}
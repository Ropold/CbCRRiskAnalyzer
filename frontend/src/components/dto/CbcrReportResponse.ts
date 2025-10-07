export type CompanyBasicInfo = {
    id: string;
    name: string;
    industry: string;
    reportingCurrency: string;
}

export type CountryBasicInfo = {
    id: string;
    countryCode: string;
    countryName: string;
}

export type UserBasicInfo = {
    id: string;
    username: string;
    name: string;
}

export type CbcrReportBasicInfo = {
    id: string;
    company: CompanyBasicInfo;
    reportingYear: number;
    country: CountryBasicInfo;
    revenuesTotal?: number;
    profitBeforeTax?: number;
}

export type CbcrReportResponse = {
    id: string;
    company: CompanyBasicInfo;
    reportingYear: number;
    fiscalYearEnd?: string;
    country: CountryBasicInfo;
    revenuesUnrelatedParty?: number;
    revenuesRelatedParty?: number;
    revenuesTotal?: number;
    profitBeforeTax?: number;
    incomeTaxPaid?: number;
    incomeTaxAccrued?: number;
    effectiveTaxRate?: number;
    expectedTaxRate?: number;
    statedCapital?: number;
    accumulatedEarnings?: number;
    tangibleAssets?: number;
    intangibleAssets?: number;
    numberOfEmployees?: number;
    revenuePerEmployee?: number;
    commentReference?: string;
    taxExplanation?: string;
    dataSource: string;
    auditStatus: 'DRAFT' | 'IN_REVIEW' | 'SUBMITTED' | 'PUBLISHED' | 'FINALIZED';
    businessActivities?: string;
    createdAt: string;
    updatedAt: string;
}
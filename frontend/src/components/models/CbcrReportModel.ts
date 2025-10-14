export type CbcrReportModel = {
    id: string;
    companyId: string;
    reportingYear: number;
    fiscalYearEnd?: string;
    countryId: string;
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
};

export const defaultCbcrReport: CbcrReportModel = {
    id: "550e8400-e29b-41d4-a716-446655440030",
    companyId: "550e8400-e29b-41d4-a716-446655440010",
    reportingYear: 2024,
    fiscalYearEnd: "2024-12-31",
    countryId: "550e8400-e29b-41d4-a716-446655440040",
    revenuesUnrelatedParty: 5000000,
    revenuesRelatedParty: 1000000,
    revenuesTotal: 6000000,
    profitBeforeTax: 1200000,
    incomeTaxPaid: 240000,
    incomeTaxAccrued: 250000,
    effectiveTaxRate: 20,
    expectedTaxRate: 25,
    statedCapital: 500000,
    accumulatedEarnings: 2000000,
    tangibleAssets: 3000000,
    intangibleAssets: 500000,
    numberOfEmployees: 50,
    revenuePerEmployee: 120000,
    commentReference: "A1",
    taxExplanation: "Tax rate difference due to R&D tax credits",
    dataSource: "IFRS",
    auditStatus: "DRAFT",
    businessActivities: "Manufacturing and distribution of technology products",
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z"
};
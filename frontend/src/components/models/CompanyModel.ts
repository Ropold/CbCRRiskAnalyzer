export type CompanyModel = {
    id: string;
    name: string;
    industry?: string;
    headquartersCountryId?: string;
    reportingCurrency: string;
    taxIdentificationNumber?: string;
    leiCode?: string;
    parentCompanyId?: string;
    isUltimateParent: boolean;
    consolidationScope?: string;
    cbcrReportingThreshold?: number;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
};

export const defaultCompany: CompanyModel = {
    id: "550e8400-e29b-41d4-a716-446655440010",
    name: "TechCorp International",
    industry: "Technology",
    headquartersCountryId: "550e8400-e29b-41d4-a716-446655440040",
    reportingCurrency: "EUR",
    taxIdentificationNumber: "DE123456789",
    leiCode: "529900T8BM49AURSDO55",
    isUltimateParent: true,
    consolidationScope: "Full consolidation",
    cbcrReportingThreshold: 750000000,
    imageUrl: "https://example.com/logo.png",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-25T16:45:00Z"
};
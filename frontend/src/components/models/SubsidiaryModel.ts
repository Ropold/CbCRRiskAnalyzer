export type SubsidiaryModel = {
    id: string;
    companyId: string;
    name: string;
    countryId: string;
    leiCode?: string;
    taxIdentificationNumber?: string;
    entityType?: 'SUBSIDIARY' | 'BRANCH' | 'PERMANENT_ESTABLISHMENT' | 'JOINT_VENTURE' | 'PARTNERSHIP';
    mainBusinessActivity?: 'RESEARCH_AND_DEVELOPMENT' | 'HOLDING_OR_MANAGING_IP' | 'PURCHASING_OR_PROCUREMENT' | 'MANUFACTURING_OR_PRODUCTION' | 'SALES_MARKETING_OR_DISTRIBUTION' | 'ADMINISTRATIVE_MANAGEMENT_OR_SUPPORT_SERVICES' | 'PROVISION_OF_SERVICES_TO_UNRELATED_PARTIES' | 'INTERNAL_GROUP_FINANCE' | 'REGULATED_FINANCIAL_SERVICES' | 'INSURANCE' | 'HOLDING_SHARES_OR_OTHER_EQUITY_INSTRUMENTS' | 'DORMANT' | 'OTHER';
    additionalActivities?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};

export const defaultSubsidiary: SubsidiaryModel = {
    id: "550e8400-e29b-41d4-a716-446655440060",
    companyId: "550e8400-e29b-41d4-a716-446655440010",
    name: "TechCorp Manufacturing Ireland Ltd",
    countryId: "550e8400-e29b-41d4-a716-446655440041",
    leiCode: "635400ABCDEFGHIJK123",
    taxIdentificationNumber: "IE9876543X",
    entityType: "SUBSIDIARY",
    mainBusinessActivity: "MANUFACTURING_OR_PRODUCTION",
    additionalActivities: "Research and development activities related to manufacturing processes",
    isActive: true,
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-25T16:45:00Z"
};
import type {CompanyBasicInfo, CountryBasicInfo} from "./CbcrReportResponse.ts";

export type EntityType =
    | 'LIMITED_LIABILITY_COMPANY'
    | 'STOCK_CORPORATION'
    | 'PARTNERSHIP'
    | 'SOLE_PROPRIETORSHIP'
    | 'BRANCH'
    | 'OTHER';

export type MainBusinessActivity =
    | 'RESEARCH_AND_DEVELOPMENT'
    | 'HOLDING_OR_MANAGING_INTELLECTUAL_PROPERTY'
    | 'PURCHASING_OR_PROCUREMENT'
    | 'MANUFACTURING_OR_PRODUCTION'
    | 'SALES_MARKETING_OR_DISTRIBUTION'
    | 'ADMINISTRATIVE_MANAGEMENT_OR_SUPPORT_SERVICES'
    | 'PROVISION_OF_SERVICES_TO_UNRELATED_PARTIES'
    | 'INTERNAL_GROUP_FINANCE'
    | 'REGULATED_FINANCIAL_SERVICES'
    | 'INSURANCE'
    | 'HOLDING_SHARES_OR_OTHER_EQUITY_INSTRUMENTS'
    | 'DORMANT'
    | 'OTHER';

export type SubsidiaryResponse = {
    id: string;
    company: CompanyBasicInfo;
    name: string;
    country: CountryBasicInfo;
    leiCode?: string;
    taxIdentificationNumber?: string;
    entityType: EntityType;
    mainBusinessActivity: MainBusinessActivity;
    additionalActivities?: string;
    isActive?: boolean;
    createdAt: string;
    updatedAt: string;
}
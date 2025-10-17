import type {CompanyModel} from "../models/CompanyModel.ts";
import type {CountryModel} from "../models/CountryModel.ts";

interface SubsidiaryFormState {
    companyId: string;
    name: string;
    countryId: string;
    leiCode?: string;
    taxIdentificationNumber?: string;
    entityType?: 'SUBSIDIARY' | 'BRANCH' | 'PERMANENT_ESTABLISHMENT' | 'JOINT_VENTURE' | 'PARTNERSHIP' | 'SERVICE_COMPANY' | 'HOLDING_COMPANY' | 'OPERATING_COMPANY' | 'PARENT_COMPANY' | 'REINSURANCE_COMPANY';
    mainBusinessActivity?: 'RESEARCH_AND_DEVELOPMENT' | 'HOLDING_OR_MANAGING_IP' | 'PURCHASING_OR_PROCUREMENT' | 'MANUFACTURING_OR_PRODUCTION' | 'SALES_MARKETING_OR_DISTRIBUTION' | 'ADMINISTRATIVE_MANAGEMENT_OR_SUPPORT_SERVICES' | 'PROVISION_OF_SERVICES_TO_UNRELATED_PARTIES' | 'INTERNAL_GROUP_FINANCE' | 'REGULATED_FINANCIAL_SERVICES' | 'INSURANCE' | 'HOLDING_SHARES_OR_OTHER_EQUITY_INSTRUMENTS' | 'DORMANT' | 'OTHER' | 'MANUFACTURING' | 'OIL_AND_GAS_MARKETING' | 'IT_SERVICES' | 'SALES_AND_SERVICES' | 'ASSET_MANAGEMENT' | 'HOLDING' | 'OIL_AND_GAS_PRODUCTION' | 'ENERGY_TRADING' | 'GAS_AND_POWER' | 'INVESTMENT_MANAGEMENT' | 'OIL_AND_GAS_TRADING' | 'OIL_AND_GAS_EXPLORATION' | 'REINSURANCE' | 'TREASURY_SERVICES';
    additionalActivities?: string;
    isActive: boolean;
}

export function buildSubsidiaryPayload(
    formStateSubsidiary: SubsidiaryFormState,
    companies: CompanyModel[],
    countries: CountryModel[]
) {
    const selectedCompany = companies.find(c => c.id === formStateSubsidiary.companyId);
    const selectedCountry = countries.find(c => c.id === formStateSubsidiary.countryId);

    if (!selectedCompany) {
        throw new Error("Company not found");
    }

    if (!selectedCountry) {
        throw new Error("Country not found");
    }

    return {
        name: formStateSubsidiary.name,
        leiCode: formStateSubsidiary.leiCode,
        taxIdentificationNumber: formStateSubsidiary.taxIdentificationNumber,
        entityType: formStateSubsidiary.entityType,
        mainBusinessActivity: formStateSubsidiary.mainBusinessActivity,
        additionalActivities: formStateSubsidiary.additionalActivities,
        isActive: formStateSubsidiary.isActive,
        company: {
            id: selectedCompany.id,
            name: selectedCompany.name,
            industry: selectedCompany.industry,
            reportingCurrency: selectedCompany.reportingCurrency
        },
        country: {
            id: selectedCountry.id,
            countryCode: selectedCountry.countryCode,
            countryName: selectedCountry.countryName
        }
    };
}
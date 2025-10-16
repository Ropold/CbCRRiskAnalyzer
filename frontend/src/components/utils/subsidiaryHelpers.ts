import type {CompanyModel} from "../models/CompanyModel.ts";
import type {CountryModel} from "../models/CountryModel.ts";

interface SubsidiaryFormState {
    companyId: string;
    name: string;
    countryId: string;
    leiCode?: string;
    taxIdentificationNumber?: string;
    entityType: string;
    mainBusinessActivity: string;
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
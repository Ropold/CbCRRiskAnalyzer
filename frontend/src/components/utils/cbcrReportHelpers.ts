import type {CompanyModel} from "../models/CompanyModel.ts";
import type {CountryModel} from "../models/CountryModel.ts";

export function buildCbcrReportPayload(
    formStateCbcr: any,
    companies: CompanyModel[],
    countries: CountryModel[]
) {
    const selectedCompany = companies.find(c => c.id === formStateCbcr.companyId);
    const selectedCountry = countries.find(c => c.id === formStateCbcr.countryId);

    if (!selectedCompany || !selectedCountry) {
        throw new Error("Company or Country not found");
    }

    const {companyId, countryId, ...reportData} = formStateCbcr;

    return {
        ...reportData,
        company: selectedCompany,
        country: selectedCountry
    };
}
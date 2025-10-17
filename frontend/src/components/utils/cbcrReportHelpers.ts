import type {CompanyModel} from "../models/CompanyModel.ts";
import type {CountryModel} from "../models/CountryModel.ts";

interface CbcrReportFormState {
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
}

export function buildCbcrReportPayload(
    formStateCbcr: CbcrReportFormState,
    companies: CompanyModel[],
    countries: CountryModel[]
) {
    const selectedCompany = companies.find(c => c.id === formStateCbcr.companyId);
    const selectedCountry = countries.find(c => c.id === formStateCbcr.countryId);

    if (!selectedCompany || !selectedCountry) {
        throw new Error("Company or Country not found");
    }

    return {
        reportingYear: formStateCbcr.reportingYear,
        fiscalYearEnd: formStateCbcr.fiscalYearEnd,
        revenuesUnrelatedParty: formStateCbcr.revenuesUnrelatedParty,
        revenuesRelatedParty: formStateCbcr.revenuesRelatedParty,
        revenuesTotal: formStateCbcr.revenuesTotal,
        profitBeforeTax: formStateCbcr.profitBeforeTax,
        incomeTaxPaid: formStateCbcr.incomeTaxPaid,
        incomeTaxAccrued: formStateCbcr.incomeTaxAccrued,
        effectiveTaxRate: formStateCbcr.effectiveTaxRate,
        expectedTaxRate: formStateCbcr.expectedTaxRate,
        statedCapital: formStateCbcr.statedCapital,
        accumulatedEarnings: formStateCbcr.accumulatedEarnings,
        tangibleAssets: formStateCbcr.tangibleAssets,
        intangibleAssets: formStateCbcr.intangibleAssets,
        numberOfEmployees: formStateCbcr.numberOfEmployees,
        revenuePerEmployee: formStateCbcr.revenuePerEmployee,
        commentReference: formStateCbcr.commentReference,
        taxExplanation: formStateCbcr.taxExplanation,
        dataSource: formStateCbcr.dataSource,
        auditStatus: formStateCbcr.auditStatus,
        businessActivities: formStateCbcr.businessActivities,
        company: selectedCompany,
        country: selectedCountry
    };
}
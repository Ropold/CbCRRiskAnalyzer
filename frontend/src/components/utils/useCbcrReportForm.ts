import {useState} from "react";

export function useCbcrReportForm() {
    const [companyId, setCompanyId] = useState<string>("");
    const [reportingYear, setReportingYear] = useState<number>(new Date().getFullYear());
    const [fiscalYearEnd, setFiscalYearEnd] = useState<string | undefined>(undefined);
    const [countryId, setCountryId] = useState<string>("");
    const [revenuesUnrelatedParty, setRevenuesUnrelatedParty] = useState<number | undefined>(undefined);
    const [revenuesRelatedParty, setRevenuesRelatedParty] = useState<number | undefined>(undefined);
    const [revenuesTotal, setRevenuesTotal] = useState<number | undefined>(undefined);
    const [profitBeforeTax, setProfitBeforeTax] = useState<number | undefined>(undefined);
    const [incomeTaxPaid, setIncomeTaxPaid] = useState<number | undefined>(undefined);
    const [incomeTaxAccrued, setIncomeTaxAccrued] = useState<number | undefined>(undefined);
    const [effectiveTaxRate, setEffectiveTaxRate] = useState<number | undefined>(undefined);
    const [expectedTaxRate, setExpectedTaxRate] = useState<number | undefined>(undefined);
    const [statedCapital, setStatedCapital] = useState<number | undefined>(undefined);
    const [accumulatedEarnings, setAccumulatedEarnings] = useState<number | undefined>(undefined);
    const [tangibleAssets, setTangibleAssets] = useState<number | undefined>(undefined);
    const [intangibleAssets, setIntangibleAssets] = useState<number | undefined>(undefined);
    const [numberOfEmployees, setNumberOfEmployees] = useState<number | undefined>(undefined);
    const [revenuePerEmployee, setRevenuePerEmployee] = useState<number | undefined>(undefined);
    const [commentReference, setCommentReference] = useState<string | undefined>(undefined);
    const [taxExplanation, setTaxExplanation] = useState<string | undefined>(undefined);
    const [dataSource, setDataSource] = useState<string>("");
    const [auditStatus, setAuditStatus] = useState<'DRAFT' | 'IN_REVIEW' | 'SUBMITTED' | 'PUBLISHED' | 'FINALIZED'>('DRAFT');
    const [businessActivities, setBusinessActivities] = useState<string | undefined>(undefined);

    return {
        companyId,
        setCompanyId,
        reportingYear,
        setReportingYear,
        fiscalYearEnd,
        setFiscalYearEnd,
        countryId,
        setCountryId,
        revenuesUnrelatedParty,
        setRevenuesUnrelatedParty,
        revenuesRelatedParty,
        setRevenuesRelatedParty,
        revenuesTotal,
        setRevenuesTotal,
        profitBeforeTax,
        setProfitBeforeTax,
        incomeTaxPaid,
        setIncomeTaxPaid,
        incomeTaxAccrued,
        setIncomeTaxAccrued,
        effectiveTaxRate,
        setEffectiveTaxRate,
        expectedTaxRate,
        setExpectedTaxRate,
        statedCapital,
        setStatedCapital,
        accumulatedEarnings,
        setAccumulatedEarnings,
        tangibleAssets,
        setTangibleAssets,
        intangibleAssets,
        setIntangibleAssets,
        numberOfEmployees,
        setNumberOfEmployees,
        revenuePerEmployee,
        setRevenuePerEmployee,
        commentReference,
        setCommentReference,
        taxExplanation,
        setTaxExplanation,
        dataSource,
        setDataSource,
        auditStatus,
        setAuditStatus,
        businessActivities,
        setBusinessActivities
    };
}
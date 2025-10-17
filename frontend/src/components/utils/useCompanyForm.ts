import { useState } from "react";
import type { CompanyModel } from "../models/CompanyModel.ts";

export function useCompanyForm(initialCompany?: CompanyModel | null) {
    const [name, setName] = useState<string>(initialCompany?.name || "");
    const [industry, setIndustry] = useState<string | undefined>(initialCompany?.industry);
    const [headquartersCountryId, setHeadquartersCountryId] = useState<string | undefined>(initialCompany?.headquartersCountryId);
    const [reportingCurrency, setReportingCurrency] = useState<string>(initialCompany?.reportingCurrency || "");
    const [taxIdentificationNumber, setTaxIdentificationNumber] = useState<string | undefined>(initialCompany?.taxIdentificationNumber);
    const [leiCode, setLeiCode] = useState<string | undefined>(initialCompany?.leiCode);
    const [parentCompanyId, setParentCompanyId] = useState<string | undefined>(initialCompany?.parentCompanyId);
    const [isUltimateParent, setIsUltimateParent] = useState<boolean>(initialCompany?.isUltimateParent ?? false);
    const [consolidationScope, setConsolidationScope] = useState<string | undefined>(initialCompany?.consolidationScope);
    const [cbcrReportingThreshold, setCbcrReportingThreshold] = useState<number | undefined>(initialCompany?.cbcrReportingThreshold);
    const [imageUrl, setImageUrl] = useState<string | undefined>(initialCompany?.imageUrl);

    return {
        name,
        setName,
        industry,
        setIndustry,
        headquartersCountryId,
        setHeadquartersCountryId,
        reportingCurrency,
        setReportingCurrency,
        taxIdentificationNumber,
        setTaxIdentificationNumber,
        leiCode,
        setLeiCode,
        parentCompanyId,
        setParentCompanyId,
        isUltimateParent,
        setIsUltimateParent,
        consolidationScope,
        setConsolidationScope,
        cbcrReportingThreshold,
        setCbcrReportingThreshold,
        imageUrl,
        setImageUrl
    };
}
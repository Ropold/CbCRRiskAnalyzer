import { useState } from "react";
import type { SubsidiaryModel } from "../models/SubsidiaryModel.ts";

export function useSubsidiaryForm(initialSubsidiary?: SubsidiaryModel | null) {
    const [name, setName] = useState<string>(initialSubsidiary?.name || "");
    const [countryId, setCountryId] = useState<string>(initialSubsidiary?.countryId || "");
    const [leiCode, setLeiCode] = useState<string | undefined>(initialSubsidiary?.leiCode);
    const [taxIdentificationNumber, setTaxIdentificationNumber] = useState<string | undefined>(initialSubsidiary?.taxIdentificationNumber);
    const [entityType, setEntityType] = useState<
        | 'SUBSIDIARY'
        | 'BRANCH'
        | 'PERMANENT_ESTABLISHMENT'
        | 'JOINT_VENTURE'
        | 'PARTNERSHIP'
        | 'SERVICE_COMPANY'
        | 'HOLDING_COMPANY'
        | 'OPERATING_COMPANY'
        | 'PARENT_COMPANY'
        | 'REINSURANCE_COMPANY'
        | undefined
    >(initialSubsidiary?.entityType);
    const [mainBusinessActivity, setMainBusinessActivity] = useState<
        | 'RESEARCH_AND_DEVELOPMENT'
        | 'HOLDING_OR_MANAGING_IP'
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
        | 'OTHER'
        | 'MANUFACTURING'
        | 'OIL_AND_GAS_MARKETING'
        | 'IT_SERVICES'
        | 'SALES_AND_SERVICES'
        | 'ASSET_MANAGEMENT'
        | 'HOLDING'
        | 'OIL_AND_GAS_PRODUCTION'
        | 'ENERGY_TRADING'
        | 'GAS_AND_POWER'
        | 'INVESTMENT_MANAGEMENT'
        | 'OIL_AND_GAS_TRADING'
        | 'OIL_AND_GAS_EXPLORATION'
        | 'REINSURANCE'
        | 'TREASURY_SERVICES'
        | undefined
    >(initialSubsidiary?.mainBusinessActivity);
    const [additionalActivities, setAdditionalActivities] = useState<string | undefined>(initialSubsidiary?.additionalActivities);
    const [isActive, setIsActive] = useState<boolean>(initialSubsidiary?.isActive ?? true);

    return {
        name,
        setName,
        countryId,
        setCountryId,
        leiCode,
        setLeiCode,
        taxIdentificationNumber,
        setTaxIdentificationNumber,
        entityType,
        setEntityType,
        mainBusinessActivity,
        setMainBusinessActivity,
        additionalActivities,
        setAdditionalActivities,
        isActive,
        setIsActive
    };
}
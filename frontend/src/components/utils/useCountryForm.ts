import {useState} from "react";
import type {JurisdictionType, BlacklistStatus, CountryModel} from "../models/CountryModel.ts";

export function useCountryForm(initialCountry?: CountryModel | null) {
    const [countryCode, setCountryCode] = useState<string>(initialCountry?.countryCode || "");
    const [countryName, setCountryName] = useState<string>(initialCountry?.countryName || "");
    const [region, setRegion] = useState<string | undefined>(initialCountry?.region);
    const [jurisdictionType, setJurisdictionType] = useState<JurisdictionType | undefined>(initialCountry?.jurisdictionType);
    const [taxHaven, setTaxHaven] = useState<boolean>(initialCountry?.taxHaven || false);
    const [expectedTaxRate, setExpectedTaxRate] = useState<number | undefined>(initialCountry?.expectedTaxRate);
    const [statutoryTaxRate, setStatutoryTaxRate] = useState<number | undefined>(initialCountry?.statutoryTaxRate);
    const [isEuMember, setIsEuMember] = useState<boolean>(initialCountry?.isEuMember || false);
    const [isOecdMember, setIsOecdMember] = useState<boolean>(initialCountry?.isOecdMember || false);
    const [blacklistStatus, setBlacklistStatus] = useState<BlacklistStatus | undefined>(initialCountry?.blacklistStatus);

    return {
        countryCode,
        setCountryCode,
        countryName,
        setCountryName,
        region,
        setRegion,
        jurisdictionType,
        setJurisdictionType,
        taxHaven,
        setTaxHaven,
        expectedTaxRate,
        setExpectedTaxRate,
        statutoryTaxRate,
        setStatutoryTaxRate,
        isEuMember,
        setIsEuMember,
        isOecdMember,
        setIsOecdMember,
        blacklistStatus,
        setBlacklistStatus
    };
}
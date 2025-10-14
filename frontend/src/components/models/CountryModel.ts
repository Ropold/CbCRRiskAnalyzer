export type JurisdictionType = 'COUNTRY' | 'TERRITORY' | 'OFFSHORE';

export type BlacklistStatus = 'NONE' | 'EU_GREYLIST' | 'EU_BLACKLIST' | 'OECD_NON_COOPERATIVE';

export type CountryModel = {
    id: string;
    countryCode: string;
    countryName: string;
    region?: string;
    jurisdictionType?: JurisdictionType;
    taxHaven: boolean;
    expectedTaxRate?: number;
    statutoryTaxRate?: number;
    isEuMember: boolean;
    isOecdMember: boolean;
    blacklistStatus?: BlacklistStatus;
    createdAt: string;
}
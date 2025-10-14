import type {CbcrReportBasicInfo} from "./CbcrReportResponse.ts";

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type RiskAssessmentResponse = {
    id: string;
    cbcrReport: CbcrReportBasicInfo;
    overallRiskLevel: RiskLevel;
    riskScore?: number;
    lowEtrFlag?: boolean;
    taxHavenFlag?: boolean;
    profitShiftingIndicator?: boolean;
    negativeTaxFlag?: boolean;
    highRevenueLowTaxFlag?: boolean;
    substanceMismatchFlag?: boolean;
    blacklistJurisdictionFlag?: boolean;
    etrVariance?: number;
    revenuePerEmployeeRatio?: number;
    profitPerEmployeeRatio?: number;
    riskExplanation?: string;
    recommendedAction?: string;
    createdAt: string;
    updatedAt: string;
}
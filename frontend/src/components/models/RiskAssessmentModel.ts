export type RiskAssessmentModel = {
    id: string;
    cbcrReportId: string;
    overallRiskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    riskScore?: number;
    lowEtrFlag: boolean;
    taxHavenFlag: boolean;
    profitShiftingIndicator: boolean;
    negativeTaxFlag: boolean;
    highRevenueLowTaxFlag: boolean;
    substanceMismatchFlag: boolean;
    blacklistJurisdictionFlag: boolean;
    etrVariance?: number;
    revenuePerEmployeeRatio?: number;
    profitPerEmployeeRatio?: number;
    riskExplanation?: string;
    recommendedAction?: string;
    createdAt: string;
    updatedAt: string;
};

export const defaultRiskAssessment: RiskAssessmentModel = {
    id: "550e8400-e29b-41d4-a716-446655440050",
    cbcrReportId: "550e8400-e29b-41d4-a716-446655440030",
    overallRiskLevel: "MEDIUM",
    riskScore: 65,
    lowEtrFlag: true,
    taxHavenFlag: false,
    profitShiftingIndicator: false,
    negativeTaxFlag: false,
    highRevenueLowTaxFlag: true,
    substanceMismatchFlag: false,
    blacklistJurisdictionFlag: false,
    etrVariance: 5,
    revenuePerEmployeeRatio: 120000,
    profitPerEmployeeRatio: 24000,
    riskExplanation: "Effective tax rate is lower than expected, suggesting potential tax optimization strategies",
    recommendedAction: "Review transfer pricing documentation and ensure compliance with local tax regulations",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-25T16:45:00Z"
};
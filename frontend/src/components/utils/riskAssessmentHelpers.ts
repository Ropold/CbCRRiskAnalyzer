import type {CbcrReportResponse} from "../dto/CbcrReportResponse.ts";

interface RiskAssessmentFormState {
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
}

export function buildRiskAssessmentPayload(
    formStateRiskAssessment: RiskAssessmentFormState,
    cbcrReportsResponse: CbcrReportResponse[]
) {
    const selectedCbcrReport = cbcrReportsResponse.find(r => r.id === formStateRiskAssessment.cbcrReportId);

    if (!selectedCbcrReport) {
        throw new Error("CbCR Report not found");
    }

    return {
        overallRiskLevel: formStateRiskAssessment.overallRiskLevel,
        riskScore: formStateRiskAssessment.riskScore,
        lowEtrFlag: formStateRiskAssessment.lowEtrFlag,
        taxHavenFlag: formStateRiskAssessment.taxHavenFlag,
        profitShiftingIndicator: formStateRiskAssessment.profitShiftingIndicator,
        negativeTaxFlag: formStateRiskAssessment.negativeTaxFlag,
        highRevenueLowTaxFlag: formStateRiskAssessment.highRevenueLowTaxFlag,
        substanceMismatchFlag: formStateRiskAssessment.substanceMismatchFlag,
        blacklistJurisdictionFlag: formStateRiskAssessment.blacklistJurisdictionFlag,
        etrVariance: formStateRiskAssessment.etrVariance,
        revenuePerEmployeeRatio: formStateRiskAssessment.revenuePerEmployeeRatio,
        profitPerEmployeeRatio: formStateRiskAssessment.profitPerEmployeeRatio,
        riskExplanation: formStateRiskAssessment.riskExplanation,
        recommendedAction: formStateRiskAssessment.recommendedAction,
        cbcrReport: {
            id: selectedCbcrReport.id,
            company: selectedCbcrReport.company,
            reportingYear: selectedCbcrReport.reportingYear,
            country: selectedCbcrReport.country,
            revenuesTotal: selectedCbcrReport.revenuesTotal,
            profitBeforeTax: selectedCbcrReport.profitBeforeTax
        }
    };
}
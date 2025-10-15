import { useState } from "react";
import type { RiskAssessmentModel } from "../models/RiskAssessmentModel";

export function useRiskAssessmentForm(initialRiskAssessment?: RiskAssessmentModel | null) {
    const [overallRiskLevel, setOverallRiskLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | undefined>(initialRiskAssessment?.overallRiskLevel);
    const [riskScore, setRiskScore] = useState<number | undefined>(initialRiskAssessment?.riskScore);
    const [lowEtrFlag, setLowEtrFlag] = useState<boolean>(initialRiskAssessment?.lowEtrFlag || false);
    const [taxHavenFlag, setTaxHavenFlag] = useState<boolean>(initialRiskAssessment?.taxHavenFlag || false);
    const [profitShiftingIndicator, setProfitShiftingIndicator] = useState<boolean>(initialRiskAssessment?.profitShiftingIndicator || false);
    const [negativeTaxFlag, setNegativeTaxFlag] = useState<boolean>(initialRiskAssessment?.negativeTaxFlag || false);
    const [highRevenueLowTaxFlag, setHighRevenueLowTaxFlag] = useState<boolean>(initialRiskAssessment?.highRevenueLowTaxFlag || false);
    const [substanceMismatchFlag, setSubstanceMismatchFlag] = useState<boolean>(initialRiskAssessment?.substanceMismatchFlag || false);
    const [blacklistJurisdictionFlag, setBlacklistJurisdictionFlag] = useState<boolean>(initialRiskAssessment?.blacklistJurisdictionFlag || false);
    const [etrVariance, setEtrVariance] = useState<number | undefined>(initialRiskAssessment?.etrVariance);
    const [revenuePerEmployeeRatio, setRevenuePerEmployeeRatio] = useState<number | undefined>(initialRiskAssessment?.revenuePerEmployeeRatio);
    const [profitPerEmployeeRatio, setProfitPerEmployeeRatio] = useState<number | undefined>(initialRiskAssessment?.profitPerEmployeeRatio);
    const [riskExplanation, setRiskExplanation] = useState<string | undefined>(initialRiskAssessment?.riskExplanation);
    const [recommendedAction, setRecommendedAction] = useState<string | undefined>(initialRiskAssessment?.recommendedAction);

    return {
        overallRiskLevel,
        setOverallRiskLevel,
        riskScore,
        setRiskScore,
        lowEtrFlag,
        setLowEtrFlag,
        taxHavenFlag,
        setTaxHavenFlag,
        profitShiftingIndicator,
        setProfitShiftingIndicator,
        negativeTaxFlag,
        setNegativeTaxFlag,
        highRevenueLowTaxFlag,
        setHighRevenueLowTaxFlag,
        substanceMismatchFlag,
        setSubstanceMismatchFlag,
        blacklistJurisdictionFlag,
        setBlacklistJurisdictionFlag,
        etrVariance,
        setEtrVariance,
        revenuePerEmployeeRatio,
        setRevenuePerEmployeeRatio,
        profitPerEmployeeRatio,
        setProfitPerEmployeeRatio,
        riskExplanation,
        setRiskExplanation,
        recommendedAction,
        setRecommendedAction
    };
}
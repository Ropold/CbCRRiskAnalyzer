import {useNavigate} from "react-router-dom";
import "../../styles/AddEdit.css";
import type {CbcrReportResponse} from "../../dto/CbcrReportResponse.ts";

type RiskAssessmentFormProps = {
    language: string;
    backNavigationPath: string;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    // From useRiskAssessmentForm
    cbcrReportsResponse: CbcrReportResponse[];
    cbcrReportId: string;
    setCbcrReportId: (value: string) => void;
    overallRiskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    setOverallRiskLevel: (value: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | undefined) => void;
    riskScore?: number;
    setRiskScore: (value: number | undefined) => void;
    lowEtrFlag: boolean;
    setLowEtrFlag: (value: boolean) => void;
    taxHavenFlag: boolean;
    setTaxHavenFlag: (value: boolean) => void;
    profitShiftingIndicator: boolean;
    setProfitShiftingIndicator: (value: boolean) => void;
    negativeTaxFlag: boolean;
    setNegativeTaxFlag: (value: boolean) => void;
    highRevenueLowTaxFlag: boolean;
    setHighRevenueLowTaxFlag: (value: boolean) => void;
    substanceMismatchFlag: boolean;
    setSubstanceMismatchFlag: (value: boolean) => void;
    blacklistJurisdictionFlag: boolean;
    setBlacklistJurisdictionFlag: (value: boolean) => void;
    etrVariance?: number;
    setEtrVariance: (value: number | undefined) => void;
    revenuePerEmployeeRatio?: number;
    setRevenuePerEmployeeRatio: (value: number | undefined) => void;
    profitPerEmployeeRatio?: number;
    setProfitPerEmployeeRatio: (value: number | undefined) => void;
    riskExplanation?: string;
    setRiskExplanation: (value: string | undefined) => void;
    recommendedAction?: string;
    setRecommendedAction: (value: string | undefined) => void;
}

export default function RiskAssessmentForm(props: Readonly<RiskAssessmentFormProps>) {

    const {
        backNavigationPath,
        handleSubmit,
        cbcrReportsResponse,
        cbcrReportId,
        setCbcrReportId,
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
    } = props;

    const navigate = useNavigate();
    const isEditMode = backNavigationPath.includes('entity-data/risk-assessments/') && backNavigationPath !== 'entity-data/risk-assessments';

    return (
        <div>
            <h2>{isEditMode ? "Edit Risk Assessment" : "Add Risk Assessment"}</h2>

            <form onSubmit={handleSubmit}>
                <div className="edit-form">
                    {/* CbCR Report */}
                    <label>
                        <span>CbCR Report:</span>
                        <select
                            className="input-small"
                            value={cbcrReportId}
                            onChange={(e) => setCbcrReportId(e.target.value)}
                            required
                        >
                            <option value="">Select CbCR Report</option>
                            {cbcrReportsResponse?.map((report) => (
                                <option key={report.id} value={report.id}>
                                    {report.company.name} - {report.country.countryName} ({report.reportingYear})
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Overall Risk Level */}
                    <label>
                        <span>Overall Risk Level:</span>
                        <select
                            className="input-small"
                            value={overallRiskLevel || ""}
                            onChange={(e) => setOverallRiskLevel(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' || undefined)}
                        >
                            <option value="">Select Level</option>
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                            <option value="CRITICAL">Critical</option>
                        </select>
                    </label>

                    {/* Risk Score */}
                    <label>
                        <span>Risk Score:</span>
                        <input
                            className="input-small"
                            type="number"
                            step="1"
                            min="0"
                            max="100"
                            value={riskScore ?? ""}
                            onChange={(e) => setRiskScore(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Low ETR Flag */}
                    <label>
                        <span>Low ETR Flag:</span>
                        <input
                            type="checkbox"
                            checked={lowEtrFlag}
                            onChange={(e) => setLowEtrFlag(e.target.checked)}
                        />
                    </label>

                    {/* Tax Haven Flag */}
                    <label>
                        <span>Tax Haven Flag:</span>
                        <input
                            type="checkbox"
                            checked={taxHavenFlag}
                            onChange={(e) => setTaxHavenFlag(e.target.checked)}
                        />
                    </label>

                    {/* Profit Shifting Indicator */}
                    <label>
                        <span>Profit Shifting Indicator:</span>
                        <input
                            type="checkbox"
                            checked={profitShiftingIndicator}
                            onChange={(e) => setProfitShiftingIndicator(e.target.checked)}
                        />
                    </label>

                    {/* Negative Tax Flag */}
                    <label>
                        <span>Negative Tax Flag:</span>
                        <input
                            type="checkbox"
                            checked={negativeTaxFlag}
                            onChange={(e) => setNegativeTaxFlag(e.target.checked)}
                        />
                    </label>

                    {/* High Revenue Low Tax Flag */}
                    <label>
                        <span>High Revenue Low Tax Flag:</span>
                        <input
                            type="checkbox"
                            checked={highRevenueLowTaxFlag}
                            onChange={(e) => setHighRevenueLowTaxFlag(e.target.checked)}
                        />
                    </label>

                    {/* Substance Mismatch Flag */}
                    <label>
                        <span>Substance Mismatch Flag:</span>
                        <input
                            type="checkbox"
                            checked={substanceMismatchFlag}
                            onChange={(e) => setSubstanceMismatchFlag(e.target.checked)}
                        />
                    </label>

                    {/* Blacklist Jurisdiction Flag */}
                    <label>
                        <span>Blacklist Jurisdiction Flag:</span>
                        <input
                            type="checkbox"
                            checked={blacklistJurisdictionFlag}
                            onChange={(e) => setBlacklistJurisdictionFlag(e.target.checked)}
                        />
                    </label>

                    {/* ETR Variance */}
                    <label>
                        <span>ETR Variance (%):</span>
                        <input
                            className="input-small"
                            type="number"
                            step="0.01"
                            value={etrVariance ?? ""}
                            onChange={(e) => setEtrVariance(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Revenue Per Employee Ratio */}
                    <label>
                        <span>Revenue Per Employee Ratio:</span>
                        <input
                            className="input-small"
                            type="number"
                            step="0.01"
                            value={revenuePerEmployeeRatio ?? ""}
                            onChange={(e) => setRevenuePerEmployeeRatio(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Profit Per Employee Ratio */}
                    <label>
                        <span>Profit Per Employee Ratio:</span>
                        <input
                            className="input-small"
                            type="number"
                            step="0.01"
                            value={profitPerEmployeeRatio ?? ""}
                            onChange={(e) => setProfitPerEmployeeRatio(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Risk Explanation */}
                    <label>
                        <span>Risk Explanation:</span>
                        <textarea
                            className="textarea-large"
                            value={riskExplanation || ""}
                            onChange={(e) => setRiskExplanation(e.target.value || undefined)}
                        />
                    </label>

                    {/* Recommended Action */}
                    <label>
                        <span>Recommended Action:</span>
                        <textarea
                            className="textarea-large"
                            value={recommendedAction || ""}
                            onChange={(e) => setRecommendedAction(e.target.value || undefined)}
                        />
                    </label>
                </div>

                <button type="submit" className="button-blue margin-top-50">
                    {isEditMode ? "Update Risk Assessment" : "Add Risk Assessment"}
                </button>
                <button type="button" className="button-blue margin-left-20" onClick={() => navigate(backNavigationPath)}>
                    Back
                </button>
            </form>
        </div>
    )
}
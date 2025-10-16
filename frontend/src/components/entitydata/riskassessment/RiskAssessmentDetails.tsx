import type {RiskAssessmentResponse} from "../../dto/RiskAssessmentResponse.ts";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "../../styles/Details.css";

type RiskAssessmentDetailsProps = {
    language: string;
    handleRiskAssessmentDelete: (riskAssessmentId: string) => void;
}

export default function RiskAssessmentDetails(props: Readonly<RiskAssessmentDetailsProps>){
    const [riskAssessment, setRiskAssessment] = useState<RiskAssessmentResponse | null>(null);
    const {id} = useParams<{id: string}>();
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(!id) return;
        axios
            .get(`/api/risk-assessments/${id}`)
            .then((response) => setRiskAssessment(response.data))
            .catch((error) => console.error("Error fetching Risk Assessment details", error));
    }, [id]);

    function handleConfirmDelete(){
        if(!riskAssessment) return;

        axios
            .delete(`/api/risk-assessments/${id}`)
            .then(() => {
                console.log("Successfully deleted Risk Assessment");
                props.handleRiskAssessmentDelete(riskAssessment.id);
            })
            .catch((error) => {
                console.error("Error deleting Risk Assessment", error);
            })
            .finally(() => {
                setShowPopup(false);
                navigate("/entity-data/risk-assessments");
            });
    }

    function handleCancel(){
        setShowPopup(false);
    }

    if (!riskAssessment) {
        return <div>Loading...</div>;
    }

    return(
        <div>
            <h2>Risk Assessment Details</h2>

            <div className="detail-section">
                <h3>CbCR Report Information</h3>
                <p><strong>Company:</strong> {riskAssessment.cbcrReport.company.name}</p>
                <p><strong>Country:</strong> {riskAssessment.cbcrReport.country.countryName}</p>
                <p><strong>Reporting Year:</strong> {riskAssessment.cbcrReport.reportingYear}</p>
                <p><strong>Total Revenue:</strong> {riskAssessment.cbcrReport.revenuesTotal?.toLocaleString()}</p>
                <p><strong>Profit Before Tax:</strong> {riskAssessment.cbcrReport.profitBeforeTax?.toLocaleString()}</p>
            </div>

            <div className="detail-section">
                <h3>Risk Overview</h3>
                <p><strong>Overall Risk Level:</strong> {riskAssessment.overallRiskLevel}</p>
                <p><strong>Risk Score:</strong> {riskAssessment.riskScore ?? 'N/A'}</p>
            </div>

            <div className="detail-section">
                <h3>Risk Flags</h3>
                <p><strong>Low ETR Flag:</strong> {riskAssessment.lowEtrFlag ? 'Yes' : 'No'}</p>
                <p><strong>Tax Haven Flag:</strong> {riskAssessment.taxHavenFlag ? 'Yes' : 'No'}</p>
                <p><strong>Profit Shifting Indicator:</strong> {riskAssessment.profitShiftingIndicator ? 'Yes' : 'No'}</p>
                <p><strong>Negative Tax Flag:</strong> {riskAssessment.negativeTaxFlag ? 'Yes' : 'No'}</p>
                <p><strong>High Revenue Low Tax Flag:</strong> {riskAssessment.highRevenueLowTaxFlag ? 'Yes' : 'No'}</p>
                <p><strong>Substance Mismatch Flag:</strong> {riskAssessment.substanceMismatchFlag ? 'Yes' : 'No'}</p>
                <p><strong>Blacklist Jurisdiction Flag:</strong> {riskAssessment.blacklistJurisdictionFlag ? 'Yes' : 'No'}</p>
            </div>

            <div className="detail-section">
                <h3>Financial Ratios</h3>
                <p><strong>ETR Variance (%):</strong> {riskAssessment.etrVariance ?? 'N/A'}</p>
                <p><strong>Revenue Per Employee Ratio:</strong> {riskAssessment.revenuePerEmployeeRatio?.toLocaleString() ?? 'N/A'}</p>
                <p><strong>Profit Per Employee Ratio:</strong> {riskAssessment.profitPerEmployeeRatio?.toLocaleString() ?? 'N/A'}</p>
            </div>

            <div className="detail-section">
                <h3>Risk Analysis</h3>
                <p><strong>Risk Explanation:</strong></p>
                <p className="text-content">{riskAssessment.riskExplanation ?? 'No explanation provided'}</p>

                <p><strong>Recommended Action:</strong></p>
                <p className="text-content">{riskAssessment.recommendedAction ?? 'No recommendation provided'}</p>
            </div>

            <div className="detail-section">
                <h3>Metadata</h3>
                <p><strong>Created At:</strong> {new Date(riskAssessment.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(riskAssessment.updatedAt).toLocaleString()}</p>
            </div>

            <button className="button-blue" onClick={() => navigate(`/entity-data/risk-assessments/${riskAssessment.id}/edit`)}>
                Edit
            </button>
            <button className="button-delete margin-left-20" onClick={() => setShowPopup(true)}>
                Delete
            </button>
            <button className="button-blue margin-left-20" onClick={() => navigate("/entity-data/risk-assessments")}>
                Back to List
            </button>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete this Risk Assessment?</p>
                        <button className="button-blue" onClick={handleConfirmDelete}>Yes, Delete</button>
                        <button className="button-blue margin-left-20" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}
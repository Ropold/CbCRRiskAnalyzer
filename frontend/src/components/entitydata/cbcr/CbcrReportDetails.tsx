import type {CbcrReportResponse} from "../../dto/CbcrReportResponse.ts";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "../../styles/Details.css"

type CbcrReportDetailsProps = {
    language: string;
    handleCbcrReportDelete: (cbcrReportId: string) => void;
}

export default function CbcrReportDetails(props: Readonly<CbcrReportDetailsProps>){
    const [cbcrReportResponse, setCbcrReportResponse] = useState<CbcrReportResponse | null>(null);
    const {id} = useParams<{id: string}>();
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(!id) return;
        axios
            .get(`/api/cbcr-reports/${id}`)
            .then((response) => setCbcrReportResponse(response.data))
            .catch((error) => console.error("Error fetching Cbcr Report details", error));
    }, [id]);

    function handleConfirmDelete(){
        if(!cbcrReportResponse) return;

        axios
            .delete(`/api/cbcr-reports/${id}`)
            .then(() => {
                console.log("Successfully deleted Cbcr Report");
                props.handleCbcrReportDelete(cbcrReportResponse.id);
            })
            .catch((error) => {
                console.error("Error deleting Cbcr Report", error);
            })
            .finally(() => {
                setShowPopup(false);
                navigate("/cbcr-reports");
            })
    }

    function handleCancel(){
        setShowPopup(false);
    }

    return(
        <div>
            <h2>CbCR Report Details</h2>
            {cbcrReportResponse ? (
                <div className="details-container">
                    <p><strong>ID:</strong> {cbcrReportResponse.id}</p>
                    <p><strong>Company:</strong> {cbcrReportResponse.company.name}</p>
                    <p><strong>Industry:</strong> {cbcrReportResponse.company.industry}</p>
                    <p><strong>Reporting Currency:</strong> {cbcrReportResponse.company.reportingCurrency}</p>
                    <p><strong>Reporting Year:</strong> {cbcrReportResponse.reportingYear}</p>
                    <p><strong>Country:</strong> {cbcrReportResponse.country.countryName} ({cbcrReportResponse.country.countryCode})</p>
                    {cbcrReportResponse.fiscalYearEnd && <p><strong>Fiscal Year End:</strong> {cbcrReportResponse.fiscalYearEnd}</p>}

                    <h3>Financial Data</h3>
                    {cbcrReportResponse.revenuesUnrelatedParty && <p><strong>Revenues Unrelated Party:</strong> {cbcrReportResponse.revenuesUnrelatedParty.toLocaleString()}</p>}
                    {cbcrReportResponse.revenuesRelatedParty && <p><strong>Revenues Related Party:</strong> {cbcrReportResponse.revenuesRelatedParty.toLocaleString()}</p>}
                    {cbcrReportResponse.revenuesTotal && <p><strong>Total Revenues:</strong> {cbcrReportResponse.revenuesTotal.toLocaleString()}</p>}
                    {cbcrReportResponse.profitBeforeTax && <p><strong>Profit Before Tax:</strong> {cbcrReportResponse.profitBeforeTax.toLocaleString()}</p>}
                    {cbcrReportResponse.incomeTaxPaid && <p><strong>Income Tax Paid:</strong> {cbcrReportResponse.incomeTaxPaid.toLocaleString()}</p>}
                    {cbcrReportResponse.incomeTaxAccrued && <p><strong>Income Tax Accrued:</strong> {cbcrReportResponse.incomeTaxAccrued.toLocaleString()}</p>}
                    {cbcrReportResponse.effectiveTaxRate && <p><strong>Effective Tax Rate:</strong> {cbcrReportResponse.effectiveTaxRate}%</p>}
                    {cbcrReportResponse.expectedTaxRate && <p><strong>Expected Tax Rate:</strong> {cbcrReportResponse.expectedTaxRate}%</p>}

                    <h3>Assets & Capital</h3>
                    {cbcrReportResponse.statedCapital && <p><strong>Stated Capital:</strong> {cbcrReportResponse.statedCapital.toLocaleString()}</p>}
                    {cbcrReportResponse.accumulatedEarnings && <p><strong>Accumulated Earnings:</strong> {cbcrReportResponse.accumulatedEarnings.toLocaleString()}</p>}
                    {cbcrReportResponse.tangibleAssets && <p><strong>Tangible Assets:</strong> {cbcrReportResponse.tangibleAssets.toLocaleString()}</p>}
                    {cbcrReportResponse.intangibleAssets && <p><strong>Intangible Assets:</strong> {cbcrReportResponse.intangibleAssets.toLocaleString()}</p>}

                    <h3>Employees</h3>
                    {cbcrReportResponse.numberOfEmployees && <p><strong>Number of Employees:</strong> {cbcrReportResponse.numberOfEmployees}</p>}
                    {cbcrReportResponse.revenuePerEmployee && <p><strong>Revenue per Employee:</strong> {cbcrReportResponse.revenuePerEmployee.toLocaleString()}</p>}

                    <h3>Additional Information</h3>
                    <p><strong>Data Source:</strong> {cbcrReportResponse.dataSource}</p>
                    <p><strong>Audit Status:</strong> {cbcrReportResponse.auditStatus}</p>
                    {cbcrReportResponse.businessActivities && <p><strong>Business Activities:</strong> {cbcrReportResponse.businessActivities}</p>}
                    {cbcrReportResponse.commentReference && <p><strong>Comment Reference:</strong> {cbcrReportResponse.commentReference}</p>}
                    {cbcrReportResponse.taxExplanation && <p><strong>Tax Explanation:</strong> {cbcrReportResponse.taxExplanation}</p>}

                    <p><strong>Created At:</strong> {new Date(cbcrReportResponse.createdAt).toLocaleString()}</p>
                    <p><strong>Updated At:</strong> {new Date(cbcrReportResponse.updatedAt).toLocaleString()}</p>

                    <div className="details-buttons">
                        <button className="button-blue" onClick={() => navigate(`/cbcr-reports/${cbcrReportResponse.id}/edit`)}>Edit</button>
                        <button className="button-delete" onClick={() => setShowPopup(true)}>Delete</button>
                    </div>

                    {showPopup && (
                        <div className="popup-overlay">
                            <div className="popup-content">
                                <h3>Confirm Deletion</h3>
                                <p>Are you sure you want to delete this CbCR Report?</p>
                                <div className="popup-actions">
                                    <button onClick={handleConfirmDelete} className="popup-confirm">Yes, Delete</button>
                                    <button onClick={handleCancel} className="popup-cancel">Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
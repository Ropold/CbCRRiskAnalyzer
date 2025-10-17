import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import type {CompanyModel} from "../models/CompanyModel.ts";
import axios from "axios";
import "../styles/Details.css";

type CompanyDetailsProps = {
    language: string;
    handleCompanyDelete:(companyId: string) => void;
}

export default function CompanyDetails(props: Readonly<CompanyDetailsProps>) {
    const [company, setCompany] = useState<CompanyModel | null>(null);
    const {id} = useParams<{id: string}>();
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(!id) return;
        axios
            .get(`/api/companies/${id}`)
            .then((response) => setCompany(response.data))
            .catch((error) => console.error("Error fetching company details", error));
    }, [id]);

    function handleConfirmDelete(){
        if(!company) return;

        axios
            .delete(`/api/companies/${id}`)
            .then(() => {
                console.log("Successfully deleted company");
                props.handleCompanyDelete(company.id);
            })
            .catch((error) => {
                console.error("Error deleting company", error);
            })
            .finally(() => {
                setShowPopup(false);
                navigate("/companies");
            })
    }

    function handleCancel(){
        setShowPopup(false);
    }

    return(
        <div>
            <h2>Company Details</h2>
            {company ? (
                <div className="details-container">
                    {company.imageUrl && (
                        <div className="details-img-container">
                            <img src={company.imageUrl} alt={`${company.name} logo`} className="details-image"/>
                        </div>
                    )}

                    <h3>Basic Information</h3>
                    <p><strong>Company Name:</strong> {company.name}</p>
                    {company.industry && <p><strong>Industry:</strong> {company.industry}</p>}
                    <p><strong>Reporting Currency:</strong> {company.reportingCurrency}</p>
                    {company.taxIdentificationNumber && <p><strong>Tax ID:</strong> {company.taxIdentificationNumber}</p>}
                    {company.leiCode && <p><strong>LEI Code:</strong> {company.leiCode}</p>}

                    <h3>Corporate Structure</h3>
                    <p><strong>Ultimate Parent:</strong> {company.isUltimateParent ? 'Yes' : 'No'}</p>
                    {company.parentCompanyId && <p><strong>Parent Company ID:</strong> {company.parentCompanyId}</p>}
                    {company.consolidationScope && <p><strong>Consolidation Scope:</strong> {company.consolidationScope}</p>}

                    <h3>Reporting Information</h3>
                    {company.headquartersCountryId && <p><strong>Headquarters Country ID:</strong> {company.headquartersCountryId}</p>}
                    {company.cbcrReportingThreshold != null && <p><strong>CbCR Reporting Threshold:</strong> {company.cbcrReportingThreshold.toLocaleString()}</p>}

                    <h3>Metadata</h3>
                    <p><strong>ID:</strong> {company.id}</p>
                    <p><strong>Created At:</strong> {new Date(company.createdAt).toLocaleString()}</p>
                    <p><strong>Updated At:</strong> {new Date(company.updatedAt).toLocaleString()}</p>

                    <div className="details-buttons">
                        <button className="button-blue" onClick={() => navigate(`/companies/${company.id}/edit`)}>Edit</button>
                        <button className="button-delete" onClick={() => setShowPopup(true)}>Delete</button>
                    </div>

                    {showPopup && (
                        <div className="popup-overlay">
                            <div className="popup-content">
                                <h3>Confirm Deletion</h3>
                                <p>Are you sure you want to delete {company.name}?</p>
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
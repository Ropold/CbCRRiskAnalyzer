import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {SubsidiaryResponse} from "../../dto/SubsidiaryResponse.ts";
import axios from "axios";
import "../../styles/Details.css";

type SubsidiaryDetailsProps = {
    language: string;
    handleSubsidiaryDelete:(subsidiaryId: string) => void;
}

export default function SubsidiaryDetails(props: Readonly<SubsidiaryDetailsProps>){
    const [subsidiary, setSubsidiary] = useState<SubsidiaryResponse | null>(null);
    const {id} = useParams<{id: string}>();
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(!id) return;
        axios
            .get(`/api/subsidiaries/${id}`)
            .then((response) => setSubsidiary(response.data))
            .catch((error) => console.error("Error fetching Subsidiary details", error));
    }, [id]);

    function handleConfirmDelete() {
        if (!subsidiary) return;

        axios
            .delete(`/api/subsidiaries/${id}`)
            .then(() => {
                console.log("Successfully deleted Subsidiary");
                props.handleSubsidiaryDelete(subsidiary.id);
            })
            .catch((error) => {
                console.error("Error deleting Subsidiary", error);
            })
            .finally(() => {
                setShowPopup(false);
                navigate("/entity-data/subsidiaries");
            });
    }

    function handleCancel(){
        setShowPopup(false);
    }

    return(
        <div>
            <h2>Subsidiary Details</h2>
            {subsidiary ? (
                <div className="details-container">
                    <div className="detail-section">
                        <h3>Basic Information</h3>
                        <p><strong>Name:</strong> {subsidiary.name}</p>
                        <p><strong>Company:</strong> {subsidiary.company.name}</p>
                        <p><strong>Country:</strong> {subsidiary.country.countryName} ({subsidiary.country.countryCode})</p>
                        <p><strong>Status:</strong> {subsidiary.isActive ? 'Active' : 'Inactive'}</p>
                    </div>

                    <div className="detail-section">
                        <h3>Entity Information</h3>
                        <p><strong>Entity Type:</strong> {subsidiary.entityType}</p>
                        <p><strong>Main Business Activity:</strong> {subsidiary.mainBusinessActivity}</p>
                    </div>

                    <div className="detail-section">
                        <h3>Identification</h3>
                        <p><strong>LEI Code:</strong> {subsidiary.leiCode ?? 'N/A'}</p>
                        <p><strong>Tax Identification Number:</strong> {subsidiary.taxIdentificationNumber ?? 'N/A'}</p>
                    </div>

                    {subsidiary.additionalActivities && (
                        <div className="detail-section">
                            <h3>Additional Activities</h3>
                            <p className="text-content">{subsidiary.additionalActivities}</p>
                        </div>
                    )}

                    <div className="detail-section">
                        <h3>Metadata</h3>
                        <p><strong>Created At:</strong> {new Date(subsidiary.createdAt).toLocaleString()}</p>
                        <p><strong>Updated At:</strong> {new Date(subsidiary.updatedAt).toLocaleString()}</p>
                    </div>

                    <div className="details-buttons">
                        <button className="button-blue" onClick={() => navigate(`/entity-data/subsidiaries/${subsidiary.id}/edit`)}>
                            Edit
                        </button>
                        <button className="button-delete" onClick={() => setShowPopup(true)}>
                            Delete
                        </button>
                        <button className="button-blue" onClick={() => navigate("/entity-data/subsidiaries")}>
                            Back to List
                        </button>
                    </div>

                    {showPopup && (
                        <div className="popup-overlay">
                            <div className="popup-content">
                                <h3>Confirm Deletion</h3>
                                <p>Are you sure you want to delete this Subsidiary?</p>
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
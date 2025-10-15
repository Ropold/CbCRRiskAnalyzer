import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import type {CountryModel} from "../../models/CountryModel.ts";
import {countryNameToIsoCode, flagImages} from "../../utils/FlagImages.ts";
import "../../styles/Details.css"

type CountryDetailsProps = {
    language: string;
    handleCountryDelete: (countryId: string) => void;
}

export default function CountryDetails(props: Readonly<CountryDetailsProps>){
    const [country, setCountry] = useState<CountryModel | null>(null);
    const {id} = useParams<{id: string}>();
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const isoCode = country ? countryNameToIsoCode[country.countryName] : null;
    const flagSrc = isoCode ? flagImages[isoCode] : null;

    useEffect(() => {
        if(!id) return;
        axios
            .get(`/api/countries/${id}`)
            .then((response) => setCountry(response.data))
            .catch((error) => console.error("Error fetching Country details", error));
    }, [id]);

    function handleConfirmDelete() {
        if (!country) return;

        axios
            .delete(`/api/countries/${id}`)
            .then(() => {
                console.log("Successfully deleted Country");
                props.handleCountryDelete(country.id);
            })
            .catch((error) => {
                console.error("Error deleting Country", error);
            })
            .finally(() => {
                setShowPopup(false);
                navigate("/entity-data/countries");
            });
    }

    function handleCancel(){
        setShowPopup(false);
    }

    return(
        <div>
            <h2>Country Details</h2>
            {country ? (
                <div className="details-container">
                    {flagSrc && (
                        <div className="details-img-container">
                            <img src={flagSrc} alt={`${country.countryName} flag`} className="details-image"/>
                        </div>
                    )}

                    <h3>Basic Information</h3>
                    <p><strong>Country Name:</strong> {country.countryName}</p>
                    <p><strong>Country Code:</strong> {country.countryCode}</p>
                    {country.region && <p><strong>Region:</strong> {country.region}</p>}
                    {country.jurisdictionType && <p><strong>Jurisdiction Type:</strong> {country.jurisdictionType}</p>}

                    <h3>Tax Information</h3>
                    <p><strong>Tax Haven:</strong> {country.taxHaven ? 'Yes' : 'No'}</p>
                    {country.expectedTaxRate !== undefined && <p><strong>Expected Tax Rate:</strong> {country.expectedTaxRate}%</p>}
                    {country.statutoryTaxRate !== undefined && <p><strong>Statutory Tax Rate:</strong> {country.statutoryTaxRate}%</p>}
                    {country.blacklistStatus && <p><strong>Blacklist Status:</strong> {country.blacklistStatus}</p>}

                    <h3>Membership</h3>
                    <p><strong>EU Member:</strong> {country.isEuMember ? 'Yes' : 'No'}</p>
                    <p><strong>OECD Member:</strong> {country.isOecdMember ? 'Yes' : 'No'}</p>

                    <h3>Metadata</h3>
                    <p><strong>ID:</strong> {country.id}</p>
                    <p><strong>Created At:</strong> {new Date(country.createdAt).toLocaleString()}</p>

                    <div className="details-buttons">
                        <button className="button-blue" onClick={() => navigate(`/entity-data/countries/${country.id}/edit`)}>Edit</button>
                        <button className="button-delete" onClick={() => setShowPopup(true)}>Delete</button>
                    </div>

                    {showPopup && (
                        <div className="popup-overlay">
                            <div className="popup-content">
                                <h3>Confirm Deletion</h3>
                                <p>Are you sure you want to delete {country.countryName}?</p>
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
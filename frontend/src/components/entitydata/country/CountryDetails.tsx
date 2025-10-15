import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import type {CountryModel} from "../../models/CountryModel.ts";
import {countryNameToIsoCode, flagImages} from "../../utils/FlagImages.ts";

type CountryDetailsProps = {
    language: string;
    handleCountryDelete: (countryId: string) => void;
}

export default function CountryDetails(props: Readonly<CountryDetailsProps>){
    const [country, setCountry] = useState<CountryModel | null>(null);
    const {id} = useParams<{id: string}>();
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

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

    const isoCode = country ? countryNameToIsoCode[country.countryName] : null;
    const flagSrc = isoCode ? flagImages[isoCode] : null;

    return(
        <div>
            <h2>Country Details</h2>
            <p>This is the Country Details page.</p>
        </div>
    )
}
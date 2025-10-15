import type {CountryModel} from "../../models/CountryModel.ts";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import CountryForm from "./CountryForm.tsx";
import {useCountryForm} from "../../utils/useCountryForm.ts";

type EditCountryProps = {
    language: string;
    handleCountryUpdate: (updatedCountry: CountryModel) => void;
}

export default function EditCountry(props: Readonly<EditCountryProps>){
    const [country, setCountry] = useState<CountryModel | null>(null);
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

    const formStateCountry = useCountryForm();

    useEffect(() => {
        if(!id) return;
        axios
            .get(`/api/countries/${id}`)
            .then((response) => {
                const data = response.data;
                setCountry(data);
                formStateCountry.setCountryCode(data.countryCode);
                formStateCountry.setCountryName(data.countryName);
                formStateCountry.setRegion(data.region);
                formStateCountry.setJurisdictionType(data.jurisdictionType);
                formStateCountry.setTaxHaven(data.taxHaven);
                formStateCountry.setExpectedTaxRate(data.expectedTaxRate);
                formStateCountry.setStatutoryTaxRate(data.statutoryTaxRate);
                formStateCountry.setIsEuMember(data.isEuMember);
                formStateCountry.setIsOecdMember(data.isOecdMember);
                formStateCountry.setBlacklistStatus(data.blacklistStatus);
            })
            .catch((error) => console.error("Error fetching Country Details", error));
    }, [id])

    function handleSaveEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!country) return;

        const updatedCountry = {
            countryCode: formStateCountry.countryCode,
            countryName: formStateCountry.countryName,
            region: formStateCountry.region,
            jurisdictionType: formStateCountry.jurisdictionType,
            taxHaven: formStateCountry.taxHaven,
            expectedTaxRate: formStateCountry.expectedTaxRate,
            statutoryTaxRate: formStateCountry.statutoryTaxRate,
            isEuMember: formStateCountry.isEuMember,
            isOecdMember: formStateCountry.isOecdMember,
            blacklistStatus: formStateCountry.blacklistStatus
        };

        axios
            .put(`/api/countries/${country.id}`, updatedCountry)
            .then((response) => {
                props.handleCountryUpdate(response.data);
                navigate(`/entity-data/countries/${country.id}`);
            })
            .catch((error) => console.error("Error updating country", error));
    }

    const backNavigationPath = country?.id ? `/entity-data/countries/${country.id}` : "/entity-data/countries";

    return(
        <div>
            <CountryForm
                language={props.language}
                backNavigationPath={backNavigationPath}
                handleSubmit={handleSaveEdit}
                {...formStateCountry}
            />
        </div>
    )
}
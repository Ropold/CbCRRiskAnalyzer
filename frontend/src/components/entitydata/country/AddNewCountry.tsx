import type {CountryModel} from "../../models/CountryModel.ts";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import CountryForm from "./CountryForm.tsx";
import {useCountryForm} from "../../utils/useCountryForm.ts";

type AddNewCountryProps = {
    language: string;
    handleNewCountrySubmit:(newCountry: CountryModel) => void;
}

export default function AddNewCountry(props: Readonly<AddNewCountryProps>) {

    const formStateCountry = useCountryForm();
    const navigate = useNavigate();

    function handleNewAddSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newCountry = {
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
            .post('/api/countries', newCountry)
            .then((response) => {
                props.handleNewCountrySubmit(response.data);
                navigate(`/entity-data/countries/${response.data.id}`);
            })
            .catch((error) => console.error("Error creating country", error));
    }

    const backNavigationPath = "/entity-data/countries";


    return(
        <div>
            <CountryForm
                language={props.language}
                backNavigationPath={backNavigationPath}
                handleSubmit={handleNewAddSubmit}
                {...formStateCountry}
            />
        </div>
    )
}
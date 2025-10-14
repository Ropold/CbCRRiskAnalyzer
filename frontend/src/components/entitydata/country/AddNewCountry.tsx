import type {CountryModel, JurisdictionType, BlacklistStatus} from "../../models/CountryModel.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import CountryForm from "./CountryForm.tsx";

type AddNewCountryProps = {
    language: string;
    handleNewCountrySubmit:(newCountry: CountryModel) => void;
}

export default function AddNewCountry(props: Readonly<AddNewCountryProps>) {

    const [countryCode, setCountryCode] = useState<string>("");
    const [countryName, setCountryName] = useState<string>("");
    const [region, setRegion] = useState<string | undefined>(undefined);
    const [jurisdictionType, setJurisdictionType] = useState<JurisdictionType | undefined>(undefined);
    const [taxHaven, setTaxHaven] = useState<boolean>(false);
    const [expectedTaxRate, setExpectedTaxRate] = useState<number | undefined>(undefined);
    const [statutoryTaxRate, setStatutoryTaxRate] = useState<number | undefined>(undefined);
    const [isEuMember, setIsEuMember] = useState<boolean>(false);
    const [isOecdMember, setIsOecdMember] = useState<boolean>(false);
    const [blacklistStatus, setBlacklistStatus] = useState<BlacklistStatus | undefined>(undefined);

    const navigate = useNavigate();

    function handleNewAddSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newCountry = {
            countryCode,
            countryName,
            region,
            jurisdictionType,
            taxHaven,
            expectedTaxRate,
            statutoryTaxRate,
            isEuMember,
            isOecdMember,
            blacklistStatus
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
                countryCode={countryCode}
                setCountryCode={setCountryCode}
                countryName={countryName}
                setCountryName={setCountryName}
                region={region}
                setRegion={setRegion}
                jurisdictionType={jurisdictionType}
                setJurisdictionType={setJurisdictionType}
                taxHaven={taxHaven}
                setTaxHaven={setTaxHaven}
                expectedTaxRate={expectedTaxRate}
                setExpectedTaxRate={setExpectedTaxRate}
                statutoryTaxRate={statutoryTaxRate}
                setStatutoryTaxRate={setStatutoryTaxRate}
                isEuMember={isEuMember}
                setIsEuMember={setIsEuMember}
                isOecdMember={isOecdMember}
                setIsOecdMember={setIsOecdMember}
                blacklistStatus={blacklistStatus}
                setBlacklistStatus={setBlacklistStatus}
            />
        </div>
    )
}
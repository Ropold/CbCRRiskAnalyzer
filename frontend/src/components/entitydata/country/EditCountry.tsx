import type {CountryModel, JurisdictionType, BlacklistStatus} from "../../models/CountryModel.ts";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import CountryForm from "./CountryForm.tsx";

type EditCountryProps = {
    language: string;
    handleCountryUpdate: (updatedCountry: CountryModel) => void;
}

export default function EditCountry(props: Readonly<EditCountryProps>){
    const [country, setCountry] = useState<CountryModel | null>(null);
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

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

    useEffect(() => {
        if(!id) return;
        axios
            .get(`/api/countries/${id}`)
            .then((response) => {
                const data = response.data;
                setCountry(data);
                setCountryCode(data.countryCode);
                setCountryName(data.countryName);
                setRegion(data.region);
                setJurisdictionType(data.jurisdictionType);
                setTaxHaven(data.taxHaven);
                setExpectedTaxRate(data.expectedTaxRate);
                setStatutoryTaxRate(data.statutoryTaxRate);
                setIsEuMember(data.isEuMember);
                setIsOecdMember(data.isOecdMember);
                setBlacklistStatus(data.blacklistStatus);
            })
            .catch((error) => console.error("Error fetching Country Details", error));
    }, [id])

    function handleSaveEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!country) return;

        const updatedCountry = {
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
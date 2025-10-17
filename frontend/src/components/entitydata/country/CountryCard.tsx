import type {CountryModel} from "../../models/CountryModel.ts";
import {useNavigate} from "react-router-dom";
import {translatedCountryNames} from "../../utils/TranslatedCountryNames.ts";
import {countryNameToIsoCode, flagImages} from "../../utils/FlagImages.ts";

type CountryCardProps = {
    country: CountryModel;
    language: string;
}

export default function CountryCard(props: Readonly<CountryCardProps>){
    const navigate = useNavigate();
    const isoCode = countryNameToIsoCode[props.country.countryName];
    const flagSrc = isoCode ? flagImages[isoCode] : null;

    const handleCardClick = () => {
        navigate(`/entity-data/countries/${props.country.id}`);
    }

    return(
        <div className="country-company-card" onClick={handleCardClick}>
            <h3> {translatedCountryNames[props.country.countryName]?.[props.language] ?? props.country.countryName}</h3>
            <img
                src={flagSrc ?? undefined}
                alt={`${props.country.countryName} flag`}
                className="country-company-card-image"
            />
        </div>
    )
}
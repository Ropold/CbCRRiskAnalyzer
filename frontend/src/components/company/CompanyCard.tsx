import type {CompanyModel} from "../models/CompanyModel.ts";
import {useNavigate} from "react-router-dom";
import "../styles/Card.css"

type CompanyCardProps = {
    company: CompanyModel;
    language: string;
}

export default function CompanyCard(props: Readonly<CompanyCardProps>){
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/companies/${props.company.id}`);
    }

    return(
        <div className="country-company-card" onClick={handleCardClick}>
           <h2>{props.company.name}</h2>
            <img
                className="country-company-card-image"
                src={props.company.imageUrl}
                alt={props.company.name}
            />
        </div>
    )
}
import type {CompanyModel} from "../models/CompanyModel.ts";
import {useNavigate} from "react-router-dom";

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
        <div className="card-overview" onClick={handleCardClick}>
           <h2>{props.company.name}</h2>
        </div>
    )
}
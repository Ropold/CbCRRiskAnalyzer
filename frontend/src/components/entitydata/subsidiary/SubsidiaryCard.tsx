import type {SubsidiaryResponse} from "../../dto/SubsidiaryResponse.ts";
import {useNavigate} from "react-router-dom";

type SubsidiaryCardProps = {
    subsidiary: SubsidiaryResponse;
    language: string;
}

export default function SubsidiaryCard(props: Readonly<SubsidiaryCardProps>) {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/entity-data/subsidiaries/${props.subsidiary.id}`);
    }

    return(
        <div className="card-overview" onClick={handleCardClick}>
            <h2>{props.subsidiary.name}</h2>
        </div>
    )
}
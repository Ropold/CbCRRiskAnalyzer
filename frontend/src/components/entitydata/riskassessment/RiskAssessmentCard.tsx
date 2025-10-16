import type {RiskAssessmentModel} from "../../models/RiskAssessmentModel.ts";
import {useNavigate} from "react-router-dom";

type RiskAssessmentCardProps = {
    riskAssessment: RiskAssessmentModel;
    language: string;
}

export default function RiskAssessmentCard(props: Readonly<RiskAssessmentCardProps>) {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/entity-data/risk-assessments/${props.riskAssessment.id}`);
    }

    return(
        <div className="card-overview" onClick={handleCardClick}>
            <h2>{props.riskAssessment.id}</h2>
        </div>
    )
}
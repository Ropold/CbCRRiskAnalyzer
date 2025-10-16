import type {RiskAssessmentResponse} from "../../dto/RiskAssessmentResponse.ts";
import {useNavigate} from "react-router-dom";

type RiskAssessmentCardProps = {
    riskAssessment: RiskAssessmentResponse;
    language: string;
}

export default function RiskAssessmentCard(props: Readonly<RiskAssessmentCardProps>) {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/entity-data/risk-assessments/${props.riskAssessment.id}`);
    }

    return(
        <div className="card-overview" onClick={handleCardClick}>
            <h2>{props.riskAssessment.riskScore}</h2>
            <p><strong>Company:</strong> {props.riskAssessment.cbcrReport.company.name}</p>
            <p><strong>Country:</strong> {props.riskAssessment.cbcrReport.country.countryName}</p>
            <p><strong>Reporting Year:</strong> {props.riskAssessment.cbcrReport.reportingYear}</p>
        </div>
    )
}
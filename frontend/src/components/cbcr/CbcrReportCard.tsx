import {useNavigate} from "react-router-dom";
import type {CbcrReportResponse} from "../dto/CbcrReportResponse.ts";

type CbcrReportCardProps = {
    cbcrReport: CbcrReportResponse;
    language: string;
}

export default function CbcrReportCard(props: Readonly<CbcrReportCardProps>){
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/cbcr-reports/${props.cbcrReport.id}`);
    }

    return(
        <div className="cbcr-report-card" onClick={handleCardClick}>
           <h2>{props.cbcrReport.id}</h2>
        </div>
    )
}
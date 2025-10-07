import type {CbcrReportModel} from "../models/CbcrReportModel.ts";
import {useNavigate} from "react-router-dom";

type CbcrReportCardProps = {
    cbcrReport: CbcrReportModel;
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
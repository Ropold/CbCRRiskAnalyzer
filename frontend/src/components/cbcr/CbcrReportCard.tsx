import {useNavigate} from "react-router-dom";
import type {CbcrReportResponse} from "../dto/CbcrReportResponse.ts";

type CbcrReportCardProps = {
    CbcrReportResponse: CbcrReportResponse;
    language: string;
}

export default function CbcrReportCard(props: Readonly<CbcrReportCardProps>){
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/cbcr-reports/${props.CbcrReportResponse.id}`);
    }

    return(
        <div className="cbcr-report-card" onClick={handleCardClick}>
           <h2>{props.CbcrReportResponse.company.name}</h2>
           <h2>{props.CbcrReportResponse.reportingYear}</h2>
           <h2>{props.CbcrReportResponse.country.countryName}</h2>
        </div>
    )
}
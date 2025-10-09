import type {CbcrReportResponse} from "../../dto/CbcrReportResponse.ts";
import type {CompanyModel} from "../../models/CompanyModel.ts";
import type {CountryModel} from "../../models/CountryModel.ts";
import {useEffect, useState} from "react";
import {type CbcrReportModel, defaultCbcrReport} from "../../models/CbcrReportModel.ts";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";


type EditCbcrReportProps = {
    language: string;
    handleCbcrReportUpdate: (updatedCbcrReport: CbcrReportResponse) => void;
    companies: CompanyModel[];
    countries: CountryModel[];
}

export default function EditCbcrReport(props: Readonly<EditCbcrReportProps>){
    const [cbcrReport, setCbcrReport] = useState<CbcrReportModel>(defaultCbcrReport);
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

    useEffect(() => {
        if(!id) return;
        axios
            .get(`/api/cbcr-reports/${id}`)
            .then((response) => setCbcrReport(response.data))
            .catch((error) => console.error("Error fetching Cbcr report details", error));
    })

    function handleSaveEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(!cbcrReport || cbcrReport === defaultCbcrReport) return;

        const updatedCbcrReport = {

        }
        axios
            .put(`/api/cbcr-reports/${cbcrReport.id}`, updatedCbcrReport)
            .then((response) => {
                props.handleCbcrReportUpdate(response.data);
                navigate(`/cbcr-reports/${cbcrReport.id}`);
            })
            .catch((error) => console.error("Error updating Cbcr report", error));
    }

    const backNavigationPath = cbcrReport?.id
        ? `/cbcr-reports/${cbcrReport.id}`
        : '/cbcr-reports';

    return(
        <div>
            <h2>Edit Cbcr</h2>
            <p>This is the Edit Cbcr page.</p>
        </div>
    )
}
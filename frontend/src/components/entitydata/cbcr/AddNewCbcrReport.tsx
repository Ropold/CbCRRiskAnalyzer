import type {CbcrReportResponse} from "../../dto/CbcrReportResponse.ts";
import {useNavigate} from "react-router-dom";
import type {CompanyModel} from "../../models/CompanyModel.ts";
import type {CountryModel} from "../../models/CountryModel.ts";
import axios from "axios";
import CbcrForm from "./CbcrForm.tsx";
import {useCbcrReportForm} from "../../utils/useCbcrReportForm.ts";
import {buildCbcrReportPayload} from "../../utils/cbcrReportHelpers.ts";

type AddNewCbcrReportProps = {
   language: string;
   handleNewCbcrReportSubmit: (newCbcrReport: CbcrReportResponse) => void;
   companies: CompanyModel[];
   countries: CountryModel[];
}

export default function AddNewCbcrReport(props: Readonly<AddNewCbcrReportProps>) {

    const formStateCbcr = useCbcrReportForm();

    const navigate = useNavigate();

    function handleNewAddSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const newCbcrReport = buildCbcrReportPayload(formStateCbcr, props.companies, props.countries);

            axios
                .post('/api/cbcr-reports', newCbcrReport)
                .then((response) => {
                    props.handleNewCbcrReportSubmit(response.data);
                    navigate(`/entity-data/cbcr-reports/${response.data.id}`);
                })
                .catch((error) => console.error("Error creating Cbcr report", error));
        } catch (error) {
            console.error(error);
        }
    }

    const backNavigationPath = '/entity-data/cbcr-reports';

    return(
        <div>
            <CbcrForm
                language={props.language}
                backNavigationPath={backNavigationPath}
                handleSubmit={handleNewAddSubmit}
                companies={props.companies}
                countries={props.countries}
                {...formStateCbcr}
            />
        </div>
    )
}
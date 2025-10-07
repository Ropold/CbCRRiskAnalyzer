import type {CbcrReportResponse} from "../dto/CbcrReportResponse.ts";
import type {CompanyModel} from "../models/CompanyModel.ts";
import type {CountryModel} from "../models/CountryModel.ts";

type CbcrReportDetailsProps = {
    language: string;
    handleCbcrReportUpdate: (updatedCbcrReport: CbcrReportResponse) => void;
    handleCbcrReportDelete: (cbcrReportId: string) => void;
    companies: CompanyModel[];
    countries: CountryModel[];
}

export default function CbcrReportDetails(props: Readonly<CbcrReportDetailsProps>){
    return(
        <div>
            <h2>Cbcr Details</h2>
            <p>This is the Cbcr Details page.</p>
        </div>
    )
}
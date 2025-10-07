import type {CbcrReportResponse} from "../dto/CbcrReportResponse.ts";
import type {CompanyModel} from "../models/CompanyModel.ts";
import type {CountryModel} from "../models/CountryModel.ts";

type EditCbcrReportProps = {
    language: string;
    handleCbcrReportUpdate: (updatedCbcrReport: CbcrReportResponse) => void;
    companies: CompanyModel[];
    countries: CountryModel[];
}

export default function EditCbcrReport(props: Readonly<EditCbcrReportProps>){
    return(
        <div>
            <h2>Edit Cbcr</h2>
            <p>This is the Edit Cbcr page.</p>
        </div>
    )
}
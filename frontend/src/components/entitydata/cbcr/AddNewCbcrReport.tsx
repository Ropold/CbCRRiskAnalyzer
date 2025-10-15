import type {CbcrReportResponse} from "../../dto/CbcrReportResponse.ts";
import {useNavigate} from "react-router-dom";
import type {CompanyModel} from "../../models/CompanyModel.ts";
import type {CountryModel} from "../../models/CountryModel.ts";
import axios from "axios";
import CbcrForm from "./CbcrForm.tsx";
import {useCbcrReportForm} from "../../utils/useCbcrReportForm.ts";

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

        // Find the selected company and country objects
        const selectedCompany = props.companies.find(c => c.id === formStateCbcr.companyId);
        const selectedCountry = props.countries.find(c => c.id === formStateCbcr.countryId);

        if (!selectedCompany || !selectedCountry) {
            console.error("Company or Country not found");
            return;
        }

        const newCbcrReport = {
            company: selectedCompany,
            reportingYear: formStateCbcr.reportingYear,
            fiscalYearEnd: formStateCbcr.fiscalYearEnd,
            country: selectedCountry,
            revenuesUnrelatedParty: formStateCbcr.revenuesUnrelatedParty,
            revenuesRelatedParty: formStateCbcr.revenuesRelatedParty,
            revenuesTotal: formStateCbcr.revenuesTotal,
            profitBeforeTax: formStateCbcr.profitBeforeTax,
            incomeTaxPaid: formStateCbcr.incomeTaxPaid,
            incomeTaxAccrued: formStateCbcr.incomeTaxAccrued,
            effectiveTaxRate: formStateCbcr.effectiveTaxRate,
            expectedTaxRate: formStateCbcr.expectedTaxRate,
            statedCapital: formStateCbcr.statedCapital,
            accumulatedEarnings: formStateCbcr.accumulatedEarnings,
            tangibleAssets: formStateCbcr.tangibleAssets,
            intangibleAssets: formStateCbcr.intangibleAssets,
            numberOfEmployees: formStateCbcr.numberOfEmployees,
            revenuePerEmployee: formStateCbcr.revenuePerEmployee,
            commentReference: formStateCbcr.commentReference,
            taxExplanation: formStateCbcr.taxExplanation,
            dataSource: formStateCbcr.dataSource,
            auditStatus: formStateCbcr.auditStatus,
            businessActivities: formStateCbcr.businessActivities
        }

        axios
            .post('/api/cbcr-reports', newCbcrReport)
            .then((response) => {
                props.handleNewCbcrReportSubmit(response.data);
                navigate(`/entity-data/cbcr-reports/${response.data.id}`);
            })
            .catch((error) => console.error("Error creating Cbcr report", error));
    }

    const backNavigationPath = '/cbcr-reports';

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
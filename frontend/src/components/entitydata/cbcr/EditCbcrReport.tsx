import type {CbcrReportResponse} from "../../dto/CbcrReportResponse.ts";
import type {CompanyModel} from "../../models/CompanyModel.ts";
import type {CountryModel} from "../../models/CountryModel.ts";
import {useEffect, useState} from "react";
import {type CbcrReportModel, defaultCbcrReport} from "../../models/CbcrReportModel.ts";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import CbcrForm from "./CbcrForm.tsx";
import {useCbcrReportForm} from "../../utils/useCbcrReportForm.ts";


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

    const formStateCbcr = useCbcrReportForm();

    useEffect(() => {
        if(!id) return;
        axios
            .get(`/api/cbcr-reports/${id}`)
            .then((response) => {
                const data = response.data;
                setCbcrReport(data);
                formStateCbcr.setCompanyId(data.company.id);
                formStateCbcr.setReportingYear(data.reportingYear);
                formStateCbcr.setFiscalYearEnd(data.fiscalYearEnd);
                formStateCbcr.setCountryId(data.country.id);
                formStateCbcr.setRevenuesUnrelatedParty(data.revenuesUnrelatedParty);
                formStateCbcr.setRevenuesRelatedParty(data.revenuesRelatedParty);
                formStateCbcr.setRevenuesTotal(data.revenuesTotal);
                formStateCbcr.setProfitBeforeTax(data.profitBeforeTax);
                formStateCbcr.setIncomeTaxPaid(data.incomeTaxPaid);
                formStateCbcr.setIncomeTaxAccrued(data.incomeTaxAccrued);
                formStateCbcr.setEffectiveTaxRate(data.effectiveTaxRate);
                formStateCbcr.setExpectedTaxRate(data.expectedTaxRate);
                formStateCbcr.setStatedCapital(data.statedCapital);
                formStateCbcr.setAccumulatedEarnings(data.accumulatedEarnings);
                formStateCbcr.setTangibleAssets(data.tangibleAssets);
                formStateCbcr.setIntangibleAssets(data.intangibleAssets);
                formStateCbcr.setNumberOfEmployees(data.numberOfEmployees);
                formStateCbcr.setRevenuePerEmployee(data.revenuePerEmployee);
                formStateCbcr.setCommentReference(data.commentReference);
                formStateCbcr.setTaxExplanation(data.taxExplanation);
                formStateCbcr.setDataSource(data.dataSource);
                formStateCbcr.setAuditStatus(data.auditStatus);
                formStateCbcr.setBusinessActivities(data.businessActivities);
            })
            .catch((error) => console.error("Error fetching Cbcr report details", error));
    }, [id])

    function handleSaveEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(!cbcrReport || cbcrReport === defaultCbcrReport) return;

        // Find the selected company and country objects
        const selectedCompany = props.companies.find(c => c.id === formStateCbcr.companyId);
        const selectedCountry = props.countries.find(c => c.id === formStateCbcr.countryId);

        if (!selectedCompany || !selectedCountry) {
            console.error("Company or Country not found");
            return;
        }

        const {companyId, countryId, ...reportData} = formStateCbcr;

        const updatedCbcrReport = {
            ...reportData,
            company: selectedCompany,
            country: selectedCountry
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
            <CbcrForm
                language={props.language}
                backNavigationPath={backNavigationPath}
                handleSubmit={handleSaveEdit}
                companies={props.companies}
                countries={props.countries}
                {...formStateCbcr}
            />
        </div>
    )
}
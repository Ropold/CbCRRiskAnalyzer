import type {CbcrReportResponse} from "../../dto/CbcrReportResponse.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import type {CompanyModel} from "../../models/CompanyModel.ts";
import type {CountryModel} from "../../models/CountryModel.ts";
import axios from "axios";
import CbcrForm from "./CbcrForm.tsx";

type AddNewCbcrReportProps = {
   language: string;
   handleNewCbcrReportSubmit: (newCbcrReport: CbcrReportResponse) => void;
   companies: CompanyModel[];
   countries: CountryModel[];
}

export default function AddNewCbcrReport(props: Readonly<AddNewCbcrReportProps>) {

    const [companyId, setCompanyId] = useState<string>("");
    const [reportingYear, setReportingYear] = useState<number>(new Date().getFullYear());
    const [fiscalYearEnd, setFiscalYearEnd] = useState<string | undefined>(undefined);
    const [countryId, setCountryId] = useState<string>("");
    const [revenuesUnrelatedParty, setRevenuesUnrelatedParty] = useState<number | undefined>(undefined);
    const [revenuesRelatedParty, setRevenuesRelatedParty] = useState<number | undefined>(undefined);
    const [revenuesTotal, setRevenuesTotal] = useState<number | undefined>(undefined);
    const [profitBeforeTax, setProfitBeforeTax] = useState<number | undefined>(undefined);
    const [incomeTaxPaid, setIncomeTaxPaid] = useState<number | undefined>(undefined);
    const [incomeTaxAccrued, setIncomeTaxAccrued] = useState<number | undefined>(undefined);
    const [effectiveTaxRate, setEffectiveTaxRate] = useState<number | undefined>(undefined);
    const [expectedTaxRate, setExpectedTaxRate] = useState<number | undefined>(undefined);
    const [statedCapital, setStatedCapital] = useState<number | undefined>(undefined);
    const [accumulatedEarnings, setAccumulatedEarnings] = useState<number | undefined>(undefined);
    const [tangibleAssets, setTangibleAssets] = useState<number | undefined>(undefined);
    const [intangibleAssets, setIntangibleAssets] = useState<number | undefined>(undefined);
    const [numberOfEmployees, setNumberOfEmployees] = useState<number | undefined>(undefined);
    const [revenuePerEmployee, setRevenuePerEmployee] = useState<number | undefined>(undefined);
    const [commentReference, setCommentReference] = useState<string | undefined>(undefined);
    const [taxExplanation, setTaxExplanation] = useState<string | undefined>(undefined);
    const [dataSource, setDataSource] = useState<string>("");
    const [auditStatus, setAuditStatus] = useState<'DRAFT' | 'IN_REVIEW' | 'SUBMITTED' | 'PUBLISHED' | 'FINALIZED'>('DRAFT');
    const [businessActivities, setBusinessActivities] = useState<string | undefined>(undefined);

    const navigate = useNavigate();

    function handleNewAddSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Find the selected company and country objects
        const selectedCompany = props.companies.find(c => c.id === companyId);
        const selectedCountry = props.countries.find(c => c.id === countryId);

        if (!selectedCompany || !selectedCountry) {
            console.error("Company or Country not found");
            return;
        }

        const newCbcrReport = {
            company: selectedCompany,
            reportingYear,
            fiscalYearEnd,
            country: selectedCountry,
            revenuesUnrelatedParty,
            revenuesRelatedParty,
            revenuesTotal,
            profitBeforeTax,
            incomeTaxPaid,
            incomeTaxAccrued,
            effectiveTaxRate,
            expectedTaxRate,
            statedCapital,
            accumulatedEarnings,
            tangibleAssets,
            intangibleAssets,
            numberOfEmployees,
            revenuePerEmployee,
            commentReference,
            taxExplanation,
            dataSource,
            auditStatus,
            businessActivities
        }

        axios
            .post('/api/cbcr-reports', newCbcrReport)
            .then((response) => {
                props.handleNewCbcrReportSubmit(response.data);
                navigate('/cbcr-reports');
            })
            .catch((error) => console.error("Error creating Cbcr report", error));
    }

    const backNavigationPath = '/cbcr-reports';

    return(
        <div>
            <h2>Add New Cbcr</h2>
            <CbcrForm
                language={props.language}
                backNavigationPath={backNavigationPath}
                handleSubmit={handleNewAddSubmit}
                companies={props.companies}
                countries={props.countries}
                companyId={companyId}
                setCompanyId={setCompanyId}
                reportingYear={reportingYear}
                setReportingYear={setReportingYear}
                fiscalYearEnd={fiscalYearEnd}
                setFiscalYearEnd={setFiscalYearEnd}
                countryId={countryId}
                setCountryId={setCountryId}
                revenuesUnrelatedParty={revenuesUnrelatedParty}
                setRevenuesUnrelatedParty={setRevenuesUnrelatedParty}
                revenuesRelatedParty={revenuesRelatedParty}
                setRevenuesRelatedParty={setRevenuesRelatedParty}
                revenuesTotal={revenuesTotal}
                setRevenuesTotal={setRevenuesTotal}
                profitBeforeTax={profitBeforeTax}
                setProfitBeforeTax={setProfitBeforeTax}
                incomeTaxPaid={incomeTaxPaid}
                setIncomeTaxPaid={setIncomeTaxPaid}
                incomeTaxAccrued={incomeTaxAccrued}
                setIncomeTaxAccrued={setIncomeTaxAccrued}
                effectiveTaxRate={effectiveTaxRate}
                setEffectiveTaxRate={setEffectiveTaxRate}
                expectedTaxRate={expectedTaxRate}
                setExpectedTaxRate={setExpectedTaxRate}
                statedCapital={statedCapital}
                setStatedCapital={setStatedCapital}
                accumulatedEarnings={accumulatedEarnings}
                setAccumulatedEarnings={setAccumulatedEarnings}
                tangibleAssets={tangibleAssets}
                setTangibleAssets={setTangibleAssets}
                intangibleAssets={intangibleAssets}
                setIntangibleAssets={setIntangibleAssets}
                numberOfEmployees={numberOfEmployees}
                setNumberOfEmployees={setNumberOfEmployees}
                revenuePerEmployee={revenuePerEmployee}
                setRevenuePerEmployee={setRevenuePerEmployee}
                commentReference={commentReference}
                setCommentReference={setCommentReference}
                taxExplanation={taxExplanation}
                setTaxExplanation={setTaxExplanation}
                dataSource={dataSource}
                setDataSource={setDataSource}
                auditStatus={auditStatus}
                setAuditStatus={setAuditStatus}
                businessActivities={businessActivities}
                setBusinessActivities={setBusinessActivities}
            />
        </div>
    )
}
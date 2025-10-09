import type {CbcrReportResponse} from "../../dto/CbcrReportResponse.ts";
import type {CompanyModel} from "../../models/CompanyModel.ts";
import type {CountryModel} from "../../models/CountryModel.ts";
import {useEffect, useState} from "react";
import {type CbcrReportModel, defaultCbcrReport} from "../../models/CbcrReportModel.ts";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import CbcrForm from "./CbcrForm.tsx";


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

    useEffect(() => {
        if(!id) return;
        axios
            .get(`/api/cbcr-reports/${id}`)
            .then((response) => {
                const data = response.data;
                setCbcrReport(data);
                setCompanyId(data.companyId);
                setReportingYear(data.reportingYear);
                setFiscalYearEnd(data.fiscalYearEnd);
                setCountryId(data.countryId);
                setRevenuesUnrelatedParty(data.revenuesUnrelatedParty);
                setRevenuesRelatedParty(data.revenuesRelatedParty);
                setRevenuesTotal(data.revenuesTotal);
                setProfitBeforeTax(data.profitBeforeTax);
                setIncomeTaxPaid(data.incomeTaxPaid);
                setIncomeTaxAccrued(data.incomeTaxAccrued);
                setEffectiveTaxRate(data.effectiveTaxRate);
                setExpectedTaxRate(data.expectedTaxRate);
                setStatedCapital(data.statedCapital);
                setAccumulatedEarnings(data.accumulatedEarnings);
                setTangibleAssets(data.tangibleAssets);
                setIntangibleAssets(data.intangibleAssets);
                setNumberOfEmployees(data.numberOfEmployees);
                setRevenuePerEmployee(data.revenuePerEmployee);
                setCommentReference(data.commentReference);
                setTaxExplanation(data.taxExplanation);
                setDataSource(data.dataSource);
                setAuditStatus(data.auditStatus);
                setBusinessActivities(data.businessActivities);
            })
            .catch((error) => console.error("Error fetching Cbcr report details", error));
    }, [id])

    function handleSaveEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(!cbcrReport || cbcrReport === defaultCbcrReport) return;

        const updatedCbcrReport = {
            companyId,
            reportingYear,
            fiscalYearEnd,
            countryId,
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
import type {CbcrReportModel} from "../models/CbcrReportModel.ts";
import {useNavigate} from "react-router-dom";
import {useAutoScrollToTop} from "../utils/ComponentsFunctions.ts";
import {useEffect, useState} from "react";
import SearchBar from "../SearchBar.tsx";
import CbcrReportCard from "./CbcrReportCard.tsx";
import "../styles/CbcrReports.css"

type CbcrReportsProps = {
    language: string;
    cbcrReports: CbcrReportModel[];
}

export default function CbcrReports(props: Readonly<CbcrReportsProps>) {
    useAutoScrollToTop();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredCbcrReports, setFilteredCbcrReports] = useState<CbcrReportModel[]>([]);

    const navigate = useNavigate();

    function filterCbcrReports(cbcrReports: CbcrReportModel[], query: string): CbcrReportModel[] {
        if (!cbcrReports) return [];

        const searchQuery = query.toLowerCase();

        return cbcrReports.filter(report => {
            const id = report.id?.toLowerCase() || "";
            const companyId = report.companyId?.toLowerCase() || "";
            const reportingYear = report.reportingYear?.toString() || "";
            const fiscalYearEnd = report.fiscalYearEnd?.toLowerCase() || "";
            const countryId = report.countryId?.toLowerCase() || "";
            const revenuesUnrelatedParty = report.revenuesUnrelatedParty?.toString() || "";
            const revenuesRelatedParty = report.revenuesRelatedParty?.toString() || "";
            const revenuesTotal = report.revenuesTotal?.toString() || "";
            const profitBeforeTax = report.profitBeforeTax?.toString() || "";
            const incomeTaxPaid = report.incomeTaxPaid?.toString() || "";
            const incomeTaxAccrued = report.incomeTaxAccrued?.toString() || "";
            const effectiveTaxRate = report.effectiveTaxRate?.toString() || "";
            const expectedTaxRate = report.expectedTaxRate?.toString() || "";
            const statedCapital = report.statedCapital?.toString() || "";
            const accumulatedEarnings = report.accumulatedEarnings?.toString() || "";
            const tangibleAssets = report.tangibleAssets?.toString() || "";
            const intangibleAssets = report.intangibleAssets?.toString() || "";
            const numberOfEmployees = report.numberOfEmployees?.toString() || "";
            const revenuePerEmployee = report.revenuePerEmployee?.toString() || "";
            const commentReference = report.commentReference?.toLowerCase() || "";
            const taxExplanation = report.taxExplanation?.toLowerCase() || "";
            const dataSource = report.dataSource?.toLowerCase() || "";
            const auditStatus = report.auditStatus?.toLowerCase() || "";
            const businessActivities = report.businessActivities?.toLowerCase() || "";
            const createdAt = report.createdAt?.toLowerCase() || "";
            const updatedAt = report.updatedAt?.toLowerCase() || "";

            return (
                id.includes(searchQuery) ||
                companyId.includes(searchQuery) ||
                reportingYear.includes(searchQuery) ||
                fiscalYearEnd.includes(searchQuery) ||
                countryId.includes(searchQuery) ||
                revenuesUnrelatedParty.includes(searchQuery) ||
                revenuesRelatedParty.includes(searchQuery) ||
                revenuesTotal.includes(searchQuery) ||
                profitBeforeTax.includes(searchQuery) ||
                incomeTaxPaid.includes(searchQuery) ||
                incomeTaxAccrued.includes(searchQuery) ||
                effectiveTaxRate.includes(searchQuery) ||
                expectedTaxRate.includes(searchQuery) ||
                statedCapital.includes(searchQuery) ||
                accumulatedEarnings.includes(searchQuery) ||
                tangibleAssets.includes(searchQuery) ||
                intangibleAssets.includes(searchQuery) ||
                numberOfEmployees.includes(searchQuery) ||
                revenuePerEmployee.includes(searchQuery) ||
                commentReference.includes(searchQuery) ||
                taxExplanation.includes(searchQuery) ||
                dataSource.includes(searchQuery) ||
                auditStatus.includes(searchQuery) ||
                businessActivities.includes(searchQuery) ||
                createdAt.includes(searchQuery) ||
                updatedAt.includes(searchQuery)
            );
        });
    }

    useEffect(() => {
        setFilteredCbcrReports(filterCbcrReports(props.cbcrReports, searchQuery));
    }, [searchQuery, props.cbcrReports]);



    return (
        <>
            <div className="add-new-button">
                <button className="button-blue" onClick={()=> navigate("add")}>add new CbCR Report</button>
            </div>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <div className="customer-card-container">
                {filteredCbcrReports.map((report: CbcrReportModel) => (
                    <CbcrReportCard
                        key={report.id}
                        cbcrReport={report}
                        language={props.language}
                    />
                ))}
            </div>
        </>
    )
}

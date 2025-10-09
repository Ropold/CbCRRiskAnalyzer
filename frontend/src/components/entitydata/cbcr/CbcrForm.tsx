import {useNavigate} from "react-router-dom";
import type {CompanyModel} from "../../models/CompanyModel.ts";
import type {CountryModel} from "../../models/CountryModel.ts";
import "../../styles/AddEdit.css"

type CbcrFormProps = {
    language: string;
    backNavigationPath: string;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    companies: CompanyModel[];
    countries: CountryModel[];
    companyId: string;
    setCompanyId: React.Dispatch<React.SetStateAction<string>>;
    reportingYear: number;
    setReportingYear: React.Dispatch<React.SetStateAction<number>>;
    fiscalYearEnd: string | undefined;
    setFiscalYearEnd: React.Dispatch<React.SetStateAction<string | undefined>>;
    countryId: string;
    setCountryId: React.Dispatch<React.SetStateAction<string>>;
    revenuesUnrelatedParty: number | undefined;
    setRevenuesUnrelatedParty: React.Dispatch<React.SetStateAction<number | undefined>>;
    revenuesRelatedParty: number | undefined;
    setRevenuesRelatedParty: React.Dispatch<React.SetStateAction<number | undefined>>;
    revenuesTotal: number | undefined;
    setRevenuesTotal: React.Dispatch<React.SetStateAction<number | undefined>>;
    profitBeforeTax: number | undefined;
    setProfitBeforeTax: React.Dispatch<React.SetStateAction<number | undefined>>;
    incomeTaxPaid: number | undefined;
    setIncomeTaxPaid: React.Dispatch<React.SetStateAction<number | undefined>>;
    incomeTaxAccrued: number | undefined;
    setIncomeTaxAccrued: React.Dispatch<React.SetStateAction<number | undefined>>;
    effectiveTaxRate: number | undefined;
    setEffectiveTaxRate: React.Dispatch<React.SetStateAction<number | undefined>>;
    expectedTaxRate: number | undefined;
    setExpectedTaxRate: React.Dispatch<React.SetStateAction<number | undefined>>;
    statedCapital: number | undefined;
    setStatedCapital: React.Dispatch<React.SetStateAction<number | undefined>>;
    accumulatedEarnings: number | undefined;
    setAccumulatedEarnings: React.Dispatch<React.SetStateAction<number | undefined>>;
    tangibleAssets: number | undefined;
    setTangibleAssets: React.Dispatch<React.SetStateAction<number | undefined>>;
    intangibleAssets: number | undefined;
    setIntangibleAssets: React.Dispatch<React.SetStateAction<number | undefined>>;
    numberOfEmployees: number | undefined;
    setNumberOfEmployees: React.Dispatch<React.SetStateAction<number | undefined>>;
    revenuePerEmployee: number | undefined;
    setRevenuePerEmployee: React.Dispatch<React.SetStateAction<number | undefined>>;
    commentReference: string | undefined;
    setCommentReference: React.Dispatch<React.SetStateAction<string | undefined>>;
    taxExplanation: string | undefined;
    setTaxExplanation: React.Dispatch<React.SetStateAction<string | undefined>>;
    dataSource: string;
    setDataSource: React.Dispatch<React.SetStateAction<string>>;
    auditStatus: 'DRAFT' | 'IN_REVIEW' | 'SUBMITTED' | 'PUBLISHED' | 'FINALIZED';
    setAuditStatus: React.Dispatch<React.SetStateAction<'DRAFT' | 'IN_REVIEW' | 'SUBMITTED' | 'PUBLISHED' | 'FINALIZED'>>;
    businessActivities: string | undefined;
    setBusinessActivities: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function CbcrForm(props: Readonly<CbcrFormProps>){

    const {
        backNavigationPath,
        handleSubmit,
        companies,
        countries,
        companyId,
        setCompanyId,
        reportingYear,
        setReportingYear,
        fiscalYearEnd,
        setFiscalYearEnd,
        countryId,
        setCountryId,
        revenuesUnrelatedParty,
        setRevenuesUnrelatedParty,
        revenuesRelatedParty,
        setRevenuesRelatedParty,
        revenuesTotal,
        setRevenuesTotal,
        profitBeforeTax,
        setProfitBeforeTax,
        incomeTaxPaid,
        setIncomeTaxPaid,
        incomeTaxAccrued,
        setIncomeTaxAccrued,
        effectiveTaxRate,
        setEffectiveTaxRate,
        expectedTaxRate,
        setExpectedTaxRate,
        statedCapital,
        setStatedCapital,
        accumulatedEarnings,
        setAccumulatedEarnings,
        tangibleAssets,
        setTangibleAssets,
        intangibleAssets,
        setIntangibleAssets,
        numberOfEmployees,
        setNumberOfEmployees,
        revenuePerEmployee,
        setRevenuePerEmployee,
        commentReference,
        setCommentReference,
        taxExplanation,
        setTaxExplanation,
        dataSource,
        setDataSource,
        auditStatus,
        setAuditStatus,
        businessActivities,
        setBusinessActivities
    } = props;

    const navigate = useNavigate();
    const isEditMode = backNavigationPath.includes('/cbcr-reports/') && backNavigationPath !== '/cbcr-reports';

    return(
        <div>
            <h2>{isEditMode ? "Edit CbCR Report" : "Add CbCR Report"}</h2>

            <form onSubmit={handleSubmit}>
                <div className="edit-form">
                    {/* Company Selection */}
                    <label>
                        <span>Company:</span>
                        <select
                            className="input-small"
                            value={companyId}
                            onChange={(e) => setCompanyId(e.target.value)}
                            required
                        >
                            <option value="">Select Company</option>
                            {companies.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Country Selection */}
                    <label>
                        <span>Country:</span>
                        <select
                            className="input-small"
                            value={countryId}
                            onChange={(e) => setCountryId(e.target.value)}
                            required
                        >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.countryName}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Reporting Year */}
                    <label>
                        <span>Reporting Year:</span>
                        <input
                            className="input-small"
                            type="number"
                            value={reportingYear}
                            onChange={(e) => setReportingYear(Number(e.target.value))}
                            required
                        />
                    </label>

                    {/* Fiscal Year End */}
                    <label>
                        <span>Fiscal Year End:</span>
                        <input
                            className="input-small"
                            type="date"
                            value={fiscalYearEnd || ""}
                            onChange={(e) => setFiscalYearEnd(e.target.value)}
                        />
                    </label>

                    {/* Revenues Unrelated Party */}
                    <label>
                        <span>Revenues Unrelated Party:</span>
                        <input
                            className="input-small"
                            type="number"
                            step="0.01"
                            value={revenuesUnrelatedParty ?? ""}
                            onChange={(e) => setRevenuesUnrelatedParty(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Revenues Related Party */}
                    <label>
                        <span>Revenues Related Party:</span>
                        <input
                            className="input-small"
                            type="number"
                            step="0.01"
                            value={revenuesRelatedParty ?? ""}
                            onChange={(e) => setRevenuesRelatedParty(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Revenues Total */}
                    <label>
                        <span>Revenues Total:</span>
                        <input
                            className="input-small"
                            type="number"
                            step="0.01"
                            value={revenuesTotal ?? ""}
                            onChange={(e) => setRevenuesTotal(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Profit Before Tax */}
                    <label>
                        <span>Profit Before Tax:</span>
                        <input
                            className="input-small"
                            type="number"
                            step="0.01"
                            value={profitBeforeTax ?? ""}
                            onChange={(e) => setProfitBeforeTax(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Income Tax Paid */}
                    <label>
                        <span>Income Tax Paid:</span>
                        <input
                            className="input-small"
                            type="number"
                            step="0.01"
                            value={incomeTaxPaid ?? ""}
                            onChange={(e) => setIncomeTaxPaid(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Income Tax Accrued */}
                    <label>
                        <span>Income Tax Accrued:</span>
                        <input
                            className="input-small"
                            type="number"
                            step="0.01"
                            value={incomeTaxAccrued ?? ""}
                            onChange={(e) => setIncomeTaxAccrued(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Effective Tax Rate */}
                    <label>
                        <span>Effective Tax Rate (%):</span>
                        <input
                            className="input-small"
                            type="number"
                            step="0.01"
                            value={effectiveTaxRate ?? ""}
                            onChange={(e) => setEffectiveTaxRate(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Expected Tax Rate */}
                    <label>
                        <span>Expected Tax Rate (%):</span>
                        <input
                            className="input-small"
                            type="number"
                            step="0.01"
                            value={expectedTaxRate ?? ""}
                            onChange={(e) => setExpectedTaxRate(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Stated Capital */}
                    <label>
                        <span>Stated Capital:</span>
                        <input
                            className="input-small"
                            type="number"
                            step="0.01"
                            value={statedCapital ?? ""}
                            onChange={(e) => setStatedCapital(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Accumulated Earnings */}
                    <label>
                        <span>Accumulated Earnings:</span>
                        <input
                            className="input-small"
                            type="number"
                            step="0.01"
                            value={accumulatedEarnings ?? ""}
                            onChange={(e) => setAccumulatedEarnings(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Tangible Assets */}
                    <label>
                        <span>Tangible Assets:</span>
                        <input
                            className="input-small"
                            type="number"
                            step="0.01"
                            value={tangibleAssets ?? ""}
                            onChange={(e) => setTangibleAssets(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Intangible Assets */}
                    <label>
                        <span>Intangible Assets:</span>
                        <input
                            className="input-small"
                            type="number"
                            step="0.01"
                            value={intangibleAssets ?? ""}
                            onChange={(e) => setIntangibleAssets(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Number of Employees */}
                    <label>
                        <span>Number of Employees:</span>
                        <input
                            className="input-small"
                            type="number"
                            value={numberOfEmployees ?? ""}
                            onChange={(e) => setNumberOfEmployees(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Revenue Per Employee */}
                    <label>
                        <span>Revenue Per Employee:</span>
                        <input
                            className="input-small"
                            type="number"
                            step="0.01"
                            value={revenuePerEmployee ?? ""}
                            onChange={(e) => setRevenuePerEmployee(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Comment Reference */}
                    <label>
                        <span>Comment Reference:</span>
                        <input
                            className="input-small"
                            type="text"
                            value={commentReference || ""}
                            onChange={(e) => setCommentReference(e.target.value)}
                        />
                    </label>

                    {/* Data Source */}
                    <label>
                        <span>Data Source:</span>
                        <input
                            className="input-small"
                            type="text"
                            value={dataSource}
                            onChange={(e) => setDataSource(e.target.value)}
                            required
                        />
                    </label>

                    {/* Audit Status */}
                    <label>
                        <span>Audit Status:</span>
                        <select
                            className="input-small"
                            value={auditStatus}
                            onChange={(e) => setAuditStatus(e.target.value as 'DRAFT' | 'IN_REVIEW' | 'SUBMITTED' | 'PUBLISHED' | 'FINALIZED')}
                            required
                        >
                            <option value="DRAFT">Draft</option>
                            <option value="IN_REVIEW">In Review</option>
                            <option value="SUBMITTED">Submitted</option>
                            <option value="PUBLISHED">Published</option>
                            <option value="FINALIZED">Finalized</option>
                        </select>
                    </label>

                    {/* Tax Explanation - Full Width */}
                    <label style={{gridColumn: "span 4"}}>
                        <span>Tax Explanation:</span>
                        <textarea
                            className="textarea-large"
                            value={taxExplanation || ""}
                            onChange={(e) => setTaxExplanation(e.target.value)}
                        />
                    </label>

                    {/* Business Activities - Full Width */}
                    <label style={{gridColumn: "span 4"}}>
                        <span>Business Activities:</span>
                        <textarea
                            className="textarea-large"
                            value={businessActivities || ""}
                            onChange={(e) => setBusinessActivities(e.target.value)}
                        />
                    </label>
                </div>

                <button type="submit" className="button-blue margin-top-50">
                    {isEditMode ? "Update CbCR Report" : "Add CbCR Report"}
                </button>
                <button type="button" className="button-blue margin-left-20" onClick={() => navigate(backNavigationPath)}>
                    back
                </button>
            </form>
        </div>
    )
}
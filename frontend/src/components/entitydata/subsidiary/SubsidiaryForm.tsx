import {useNavigate} from "react-router-dom";
import type {CompanyModel} from "../../models/CompanyModel.ts";
import type {CountryModel} from "../../models/CountryModel.ts";
import "../../styles/AddEdit.css";

type SubsidiaryFormProps = {
    language: string;
    backNavigationPath: string;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    companies: CompanyModel[];
    countries: CountryModel[];
    companyId: string;
    setCompanyId: (value: string) => void;
    name: string;
    setName: (value: string) => void;
    countryId: string;
    setCountryId: (value: string) => void;
    leiCode?: string;
    setLeiCode: (value: string | undefined) => void;
    taxIdentificationNumber?: string;
    setTaxIdentificationNumber: (value: string | undefined) => void;
    entityType?: 'SUBSIDIARY' | 'BRANCH' | 'PERMANENT_ESTABLISHMENT' | 'JOINT_VENTURE' | 'PARTNERSHIP' | 'SERVICE_COMPANY' | 'HOLDING_COMPANY' | 'OPERATING_COMPANY' | 'PARENT_COMPANY' | 'REINSURANCE_COMPANY';
    setEntityType: (value: 'SUBSIDIARY' | 'BRANCH' | 'PERMANENT_ESTABLISHMENT' | 'JOINT_VENTURE' | 'PARTNERSHIP' | 'SERVICE_COMPANY' | 'HOLDING_COMPANY' | 'OPERATING_COMPANY' | 'PARENT_COMPANY' | 'REINSURANCE_COMPANY' | undefined) => void;
    mainBusinessActivity?: 'RESEARCH_AND_DEVELOPMENT' | 'HOLDING_OR_MANAGING_IP' | 'PURCHASING_OR_PROCUREMENT' | 'MANUFACTURING_OR_PRODUCTION' | 'SALES_MARKETING_OR_DISTRIBUTION' | 'ADMINISTRATIVE_MANAGEMENT_OR_SUPPORT_SERVICES' | 'PROVISION_OF_SERVICES_TO_UNRELATED_PARTIES' | 'INTERNAL_GROUP_FINANCE' | 'REGULATED_FINANCIAL_SERVICES' | 'INSURANCE' | 'HOLDING_SHARES_OR_OTHER_EQUITY_INSTRUMENTS' | 'DORMANT' | 'OTHER' | 'MANUFACTURING' | 'OIL_AND_GAS_MARKETING' | 'IT_SERVICES' | 'SALES_AND_SERVICES' | 'ASSET_MANAGEMENT' | 'HOLDING' | 'OIL_AND_GAS_PRODUCTION' | 'ENERGY_TRADING' | 'GAS_AND_POWER' | 'INVESTMENT_MANAGEMENT' | 'OIL_AND_GAS_TRADING' | 'OIL_AND_GAS_EXPLORATION' | 'REINSURANCE' | 'TREASURY_SERVICES';
    setMainBusinessActivity: (value: 'RESEARCH_AND_DEVELOPMENT' | 'HOLDING_OR_MANAGING_IP' | 'PURCHASING_OR_PROCUREMENT' | 'MANUFACTURING_OR_PRODUCTION' | 'SALES_MARKETING_OR_DISTRIBUTION' | 'ADMINISTRATIVE_MANAGEMENT_OR_SUPPORT_SERVICES' | 'PROVISION_OF_SERVICES_TO_UNRELATED_PARTIES' | 'INTERNAL_GROUP_FINANCE' | 'REGULATED_FINANCIAL_SERVICES' | 'INSURANCE' | 'HOLDING_SHARES_OR_OTHER_EQUITY_INSTRUMENTS' | 'DORMANT' | 'OTHER' | 'MANUFACTURING' | 'OIL_AND_GAS_MARKETING' | 'IT_SERVICES' | 'SALES_AND_SERVICES' | 'ASSET_MANAGEMENT' | 'HOLDING' | 'OIL_AND_GAS_PRODUCTION' | 'ENERGY_TRADING' | 'GAS_AND_POWER' | 'INVESTMENT_MANAGEMENT' | 'OIL_AND_GAS_TRADING' | 'OIL_AND_GAS_EXPLORATION' | 'REINSURANCE' | 'TREASURY_SERVICES' | undefined) => void;
    additionalActivities?: string;
    setAdditionalActivities: (value: string | undefined) => void;
    isActive: boolean;
    setIsActive: (value: boolean) => void;
}

export default function SubsidiaryForm(props: Readonly<SubsidiaryFormProps>){

    const {
        backNavigationPath,
        handleSubmit,
        companies,
        countries,
        companyId,
        setCompanyId,
        name,
        setName,
        countryId,
        setCountryId,
        leiCode,
        setLeiCode,
        taxIdentificationNumber,
        setTaxIdentificationNumber,
        entityType,
        setEntityType,
        mainBusinessActivity,
        setMainBusinessActivity,
        additionalActivities,
        setAdditionalActivities,
        isActive,
        setIsActive,
    } = props;

    const navigate = useNavigate();
    const isEditMode = backNavigationPath.includes('entity-data/subsidiaries/') && backNavigationPath !== 'entity-data/subsidiaries';

    return (
        <div>
            <h2>{isEditMode ? "Edit Subsidiary" : "Add Subsidiary"}</h2>

            <form onSubmit={handleSubmit}>
                <div className="edit-form">
                    {/* Company */}
                    <label>
                        <span>Company:</span>
                        <select
                            className="input-small"
                            value={companyId}
                            onChange={(e) => setCompanyId(e.target.value)}
                            required
                        >
                            <option value="">Select Company</option>
                            {companies?.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Name */}
                    <label>
                        <span>Name:</span>
                        <input
                            className="input-small"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>

                    {/* Country */}
                    <label>
                        <span>Country:</span>
                        <select
                            className="input-small"
                            value={countryId}
                            onChange={(e) => setCountryId(e.target.value)}
                            required
                        >
                            <option value="">Select Country</option>
                            {countries?.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.countryName}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* LEI Code */}
                    <label>
                        <span>LEI Code:</span>
                        <input
                            className="input-small"
                            type="text"
                            value={leiCode || ""}
                            onChange={(e) => setLeiCode(e.target.value || undefined)}
                        />
                    </label>

                    {/* Tax Identification Number */}
                    <label>
                        <span>Tax Identification Number:</span>
                        <input
                            className="input-small"
                            type="text"
                            value={taxIdentificationNumber || ""}
                            onChange={(e) => setTaxIdentificationNumber(e.target.value || undefined)}
                        />
                    </label>

                    {/* Entity Type */}
                    <label>
                        <span>Entity Type:</span>
                        <select
                            className="input-small"
                            value={entityType || ""}
                            onChange={(e) => setEntityType(e.target.value as any)}
                            required
                        >
                            <option value="">Select Entity Type</option>
                            <option value="SUBSIDIARY">Subsidiary</option>
                            <option value="BRANCH">Branch</option>
                            <option value="PERMANENT_ESTABLISHMENT">Permanent Establishment</option>
                            <option value="JOINT_VENTURE">Joint Venture</option>
                            <option value="PARTNERSHIP">Partnership</option>
                            <option value="SERVICE_COMPANY">Service Company</option>
                            <option value="HOLDING_COMPANY">Holding Company</option>
                            <option value="OPERATING_COMPANY">Operating Company</option>
                            <option value="PARENT_COMPANY">Parent Company</option>
                            <option value="REINSURANCE_COMPANY">Reinsurance Company</option>
                        </select>
                    </label>

                    {/* Main Business Activity */}
                    <label>
                        <span>Main Business Activity:</span>
                        <select
                            className="input-small"
                            value={mainBusinessActivity || ""}
                            onChange={(e) => setMainBusinessActivity(e.target.value as any)}
                            required
                        >
                            <option value="">Select Activity</option>
                            <option value="RESEARCH_AND_DEVELOPMENT">Research and Development</option>
                            <option value="HOLDING_OR_MANAGING_IP">Holding or Managing IP</option>
                            <option value="PURCHASING_OR_PROCUREMENT">Purchasing or Procurement</option>
                            <option value="MANUFACTURING_OR_PRODUCTION">Manufacturing or Production</option>
                            <option value="SALES_MARKETING_OR_DISTRIBUTION">Sales, Marketing or Distribution</option>
                            <option value="ADMINISTRATIVE_MANAGEMENT_OR_SUPPORT_SERVICES">Administrative, Management or Support Services</option>
                            <option value="PROVISION_OF_SERVICES_TO_UNRELATED_PARTIES">Provision of Services to Unrelated Parties</option>
                            <option value="INTERNAL_GROUP_FINANCE">Internal Group Finance</option>
                            <option value="REGULATED_FINANCIAL_SERVICES">Regulated Financial Services</option>
                            <option value="INSURANCE">Insurance</option>
                            <option value="HOLDING_SHARES_OR_OTHER_EQUITY_INSTRUMENTS">Holding Shares or Other Equity Instruments</option>
                            <option value="DORMANT">Dormant</option>
                            <option value="OTHER">Other</option>
                            <option value="MANUFACTURING">Manufacturing</option>
                            <option value="OIL_AND_GAS_MARKETING">Oil and Gas Marketing</option>
                            <option value="IT_SERVICES">IT Services</option>
                            <option value="SALES_AND_SERVICES">Sales and Services</option>
                            <option value="ASSET_MANAGEMENT">Asset Management</option>
                            <option value="HOLDING">Holding</option>
                            <option value="OIL_AND_GAS_PRODUCTION">Oil and Gas Production</option>
                            <option value="ENERGY_TRADING">Energy Trading</option>
                            <option value="GAS_AND_POWER">Gas and Power</option>
                            <option value="INVESTMENT_MANAGEMENT">Investment Management</option>
                            <option value="OIL_AND_GAS_TRADING">Oil and Gas Trading</option>
                            <option value="OIL_AND_GAS_EXPLORATION">Oil and Gas Exploration</option>
                            <option value="REINSURANCE">Reinsurance</option>
                            <option value="TREASURY_SERVICES">Treasury Services</option>
                        </select>
                    </label>

                    {/* Additional Activities */}
                    <label>
                        <span>Additional Activities:</span>
                        <textarea
                            className="textarea-large"
                            value={additionalActivities || ""}
                            onChange={(e) => setAdditionalActivities(e.target.value || undefined)}
                        />
                    </label>

                    {/* Is Active */}
                    <label>
                        <span>Is Active:</span>
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                    </label>
                </div>

                <button type="submit" className="button-blue margin-top-50">
                    {isEditMode ? "Update Subsidiary" : "Add Subsidiary"}
                </button>
                <button type="button" className="button-blue margin-left-20" onClick={() => navigate(backNavigationPath)}>
                    Back
                </button>
            </form>
        </div>
    )
}
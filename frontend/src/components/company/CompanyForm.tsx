import {useNavigate} from "react-router-dom";

type CompanyFormProps = {
    language: string;
    backNavigationPath: string;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    // From useCompanyForm
    name: string;
    setName: (value: string) => void;
    industry?: string;
    setIndustry: (value: string | undefined) => void;
    headquartersCountryId?: string;
    setHeadquartersCountryId: (value: string | undefined) => void;
    reportingCurrency: string;
    setReportingCurrency: (value: string) => void;
    taxIdentificationNumber?: string;
    setTaxIdentificationNumber: (value: string | undefined) => void;
    leiCode?: string;
    setLeiCode: (value: string | undefined) => void;
    parentCompanyId?: string;
    setParentCompanyId: (value: string | undefined) => void;
    isUltimateParent: boolean;
    setIsUltimateParent: (value: boolean) => void;
    consolidationScope?: string;
    setConsolidationScope: (value: string | undefined) => void;
    cbcrReportingThreshold?: number;
    setCbcrReportingThreshold: (value: number | undefined) => void;
    // Image handling
    image: File | null;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleImageCancel: () => void;
    existingImageUrl?: string;
    imageDeleted?: boolean;
}

export default function CompanyForm(props: Readonly<CompanyFormProps>) {

    const {
        backNavigationPath,
        name,
        setName,
        industry,
        setIndustry,
        headquartersCountryId,
        setHeadquartersCountryId,
        reportingCurrency,
        setReportingCurrency,
        taxIdentificationNumber,
        setTaxIdentificationNumber,
        leiCode,
        setLeiCode,
        parentCompanyId,
        setParentCompanyId,
        isUltimateParent,
        setIsUltimateParent,
        consolidationScope,
        setConsolidationScope,
        cbcrReportingThreshold,
        setCbcrReportingThreshold,
        image,
        handleFileChange,
        handleImageCancel,
        existingImageUrl,
        imageDeleted,
        handleSubmit
    } = props;

    const navigate = useNavigate();
    const isEditMode = backNavigationPath.includes('/companies/') && backNavigationPath !== '/companies';

    function renderImagePreview() {
        if (image) {
            return (<img src={URL.createObjectURL(image)} alt="image-preview" className="image-preview" />);
        }
        if (existingImageUrl && !imageDeleted) {
            return (<img src={existingImageUrl} alt="existing-image" className="image-preview" />);
        }
        return null;
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="edit-form">
                    <label>
                        <span>Company Name:</span>
                        <input
                            className="input-small"
                            type="text"
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <span>Industry:</span>
                        <input
                            className="input-small"
                            type="text"
                            value={industry || ""}
                            onChange={(e)=> setIndustry(e.target.value || undefined)}
                        />
                    </label>
                    <label>
                        <span>Headquarters Country ID:</span>
                        <input
                            className="input-small"
                            type="text"
                            value={headquartersCountryId || ""}
                            onChange={(e)=> setHeadquartersCountryId(e.target.value || undefined)}
                        />
                    </label>
                    <label>
                        <span>Reporting Currency:</span>
                        <input
                            className="input-small"
                            type="text"
                            value={reportingCurrency}
                            onChange={(e)=> setReportingCurrency(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <span>Tax Identification Number:</span>
                        <input
                            className="input-small"
                            type="text"
                            value={taxIdentificationNumber || ""}
                            onChange={(e)=> setTaxIdentificationNumber(e.target.value || undefined)}
                        />
                    </label>
                    <label>
                        <span>LEI Code:</span>
                        <input
                            className="input-small"
                            type="text"
                            value={leiCode || ""}
                            onChange={(e)=> setLeiCode(e.target.value || undefined)}
                        />
                    </label>
                    <label>
                        <span>Parent Company ID:</span>
                        <input
                            className="input-small"
                            type="text"
                            value={parentCompanyId || ""}
                            onChange={(e)=> setParentCompanyId(e.target.value || undefined)}
                        />
                    </label>
                    <label>
                        <span>Ultimate Parent:</span>
                        <select
                            className="input-small"
                            value={isUltimateParent ? "true" : "false"}
                            onChange={(e) => setIsUltimateParent(e.target.value === "true")}
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </label>
                    <label>
                        <span>Consolidation Scope:</span>
                        <input
                            className="input-small"
                            type="text"
                            value={consolidationScope || ""}
                            onChange={(e)=> setConsolidationScope(e.target.value || undefined)}
                        />
                    </label>
                    <label>
                        <span>CbCR Reporting Threshold:</span>
                        <input
                            className="input-small"
                            type="number"
                            value={cbcrReportingThreshold ?? ""}
                            onChange={(e)=> setCbcrReportingThreshold(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* Image Upload */}
                    <label>
                        <span>Company Logo:</span>
                        <input type="file" onChange={handleFileChange} accept="image/*" />
                    </label>

                    {/* Image Preview */}
                    <div>
                        {renderImagePreview()}
                    </div>

                    {/* Remove Image Button */}
                    <div>
                        {(image || (existingImageUrl && !imageDeleted)) && (
                            <button
                                type="button"
                                onClick={handleImageCancel}
                                className="button-blue button-remove-image"
                            >
                                Remove Image
                            </button>
                        )}
                    </div>
                </div>

                <button type="submit" className="button-blue margin-top-50">
                    {isEditMode ? "Update Company" : "Add Company"}
                </button>
                <button type="button" className="button-blue margin-left-20" onClick={() => navigate(backNavigationPath)}>
                    Back
                </button>
            </form>
        </div>
    )
}
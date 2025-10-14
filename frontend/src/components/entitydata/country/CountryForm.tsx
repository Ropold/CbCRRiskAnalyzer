import {useNavigate} from "react-router-dom";
import type {JurisdictionType, BlacklistStatus} from "../../models/CountryModel.ts";
import "../../styles/AddEdit.css"

type CountryFormProps = {
    language: string;
    backNavigationPath: string;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    countryCode: string;
    setCountryCode: React.Dispatch<React.SetStateAction<string>>;
    countryName: string;
    setCountryName: React.Dispatch<React.SetStateAction<string>>;
    region: string | undefined;
    setRegion: React.Dispatch<React.SetStateAction<string | undefined>>;
    jurisdictionType: JurisdictionType | undefined;
    setJurisdictionType: React.Dispatch<React.SetStateAction<JurisdictionType | undefined>>;
    taxHaven: boolean;
    setTaxHaven: React.Dispatch<React.SetStateAction<boolean>>;
    expectedTaxRate: number | undefined;
    setExpectedTaxRate: React.Dispatch<React.SetStateAction<number | undefined>>;
    statutoryTaxRate: number | undefined;
    setStatutoryTaxRate: React.Dispatch<React.SetStateAction<number | undefined>>;
    isEuMember: boolean;
    setIsEuMember: React.Dispatch<React.SetStateAction<boolean>>;
    isOecdMember: boolean;
    setIsOecdMember: React.Dispatch<React.SetStateAction<boolean>>;
    blacklistStatus: BlacklistStatus | undefined;
    setBlacklistStatus: React.Dispatch<React.SetStateAction<BlacklistStatus | undefined>>;
}

export default function CountryForm(props: Readonly<CountryFormProps>) {

    const {
        backNavigationPath,
        handleSubmit,
        countryCode,
        setCountryCode,
        countryName,
        setCountryName,
        region,
        setRegion,
        jurisdictionType,
        setJurisdictionType,
        taxHaven,
        setTaxHaven,
        expectedTaxRate,
        setExpectedTaxRate,
        statutoryTaxRate,
        setStatutoryTaxRate,
        isEuMember,
        setIsEuMember,
        isOecdMember,
        setIsOecdMember,
        blacklistStatus,
        setBlacklistStatus
    } = props;

    const navigate = useNavigate();
    const isEditMode = backNavigationPath.includes('/entity-data/countries/') && backNavigationPath !== '/entity-data/countries';

    return (
        <div>
            <h2>{isEditMode ? "Edit Country" : "Add Country"}</h2>

            <form onSubmit={handleSubmit}>
                <div className="edit-form">
                    {/* Country Code */}
                    <label>
                        <span>Country Code:</span>
                        <input
                            className="input-small"
                            type="text"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            required
                        />
                    </label>

                    {/* Country Name */}
                    <label>
                        <span>Country Name:</span>
                        <input
                            className="input-small"
                            type="text"
                            value={countryName}
                            onChange={(e) => setCountryName(e.target.value)}
                            required
                        />
                    </label>

                    {/* Region */}
                    <label>
                        <span>Region:</span>
                        <input
                            className="input-small"
                            type="text"
                            value={region || ""}
                            onChange={(e) => setRegion(e.target.value || undefined)}
                        />
                    </label>

                    {/* Jurisdiction Type */}
                    <label>
                        <span>Jurisdiction Type:</span>
                        <select
                            className="input-small"
                            value={jurisdictionType || ""}
                            onChange={(e) => setJurisdictionType(e.target.value as JurisdictionType || undefined)}
                        >
                            <option value="">Select Type</option>
                            <option value="COUNTRY">Country</option>
                            <option value="TERRITORY">Territory</option>
                            <option value="OFFSHORE">Offshore</option>
                        </select>
                    </label>

                    {/* Tax Haven */}
                    <label>
                        <span>Tax Haven:</span>
                        <input
                            type="checkbox"
                            checked={taxHaven}
                            onChange={(e) => setTaxHaven(e.target.checked)}
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

                    {/* Statutory Tax Rate */}
                    <label>
                        <span>Statutory Tax Rate (%):</span>
                        <input
                            className="input-small"
                            type="number"
                            step="0.01"
                            value={statutoryTaxRate ?? ""}
                            onChange={(e) => setStatutoryTaxRate(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </label>

                    {/* EU Member */}
                    <label>
                        <span>EU Member:</span>
                        <input
                            type="checkbox"
                            checked={isEuMember}
                            onChange={(e) => setIsEuMember(e.target.checked)}
                        />
                    </label>

                    {/* OECD Member */}
                    <label>
                        <span>OECD Member:</span>
                        <input
                            type="checkbox"
                            checked={isOecdMember}
                            onChange={(e) => setIsOecdMember(e.target.checked)}
                        />
                    </label>

                    {/* Blacklist Status */}
                    <label>
                        <span>Blacklist Status:</span>
                        <select
                            className="input-small"
                            value={blacklistStatus || ""}
                            onChange={(e) => setBlacklistStatus(e.target.value as BlacklistStatus || undefined)}
                        >
                            <option value="">Select Status</option>
                            <option value="NONE">None</option>
                            <option value="EU_GREYLIST">EU Greylist</option>
                            <option value="EU_BLACKLIST">EU Blacklist</option>
                            <option value="OECD_NON_COOPERATIVE">OECD Non-Cooperative</option>
                        </select>
                    </label>
                </div>

                <button type="submit" className="button-blue margin-top-50">
                    {isEditMode ? "Update Country" : "Add Country"}
                </button>
                <button type="button" className="button-blue margin-left-20" onClick={() => navigate(backNavigationPath)}>
                    back
                </button>
            </form>
        </div>
    )
}
import type {SubsidiaryResponse} from "../../dto/SubsidiaryResponse.ts";
import type {CompanyModel} from "../../models/CompanyModel.ts";
import type {CountryModel} from "../../models/CountryModel.ts";
import {useSubsidiaryForm} from "../../utils/useSubsidiaryForm.ts";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {buildSubsidiaryPayload} from "../../utils/subsidiaryHelpers.ts";
import SubsidiaryForm from "./SubsidiaryForm.tsx";

type AddNewSubsidiaryPros = {
    language: string;
    handleNewSubsidiarySubmit: (newSubsidiary: SubsidiaryResponse) => void;
    companies: CompanyModel[];
    countries: CountryModel[];
}

export default function AddNewSubsidiary(props: Readonly<AddNewSubsidiaryPros>) {

    const formStateSubsidiary = useSubsidiaryForm()
    const navigate = useNavigate();

    function handleNewAddSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const newSubsidiary = buildSubsidiaryPayload(formStateSubsidiary, props.companies, props.countries);

            axios
                .post('/api/subsidiaries', newSubsidiary)
                .then((response) => {
                    props.handleNewSubsidiarySubmit(response.data);
                    navigate(`/entity-data/subsidiaries/${response.data.id}`);
                })
                .catch((error) => console.error("Error creating subsidiary:", error));
        } catch (error) {
            console.error(error);
        }
    }

    const backNavigationPath = "/entity-data/subsidiaries";

    return(
        <div>
            <SubsidiaryForm
                language={props.language}
                backNavigationPath={backNavigationPath}
                handleSubmit={handleNewAddSubmit}
                companies={props.companies}
                countries={props.countries}
                {...formStateSubsidiary}
            />
        </div>
    )
}
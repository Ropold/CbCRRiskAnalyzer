import type {SubsidiaryResponse} from "../../dto/SubsidiaryResponse.ts";
import type {CompanyModel} from "../../models/CompanyModel.ts";
import type {CountryModel} from "../../models/CountryModel.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSubsidiaryForm} from "../../utils/useSubsidiaryForm.ts";
import axios from "axios";
import SubsidiaryForm from "./SubsidiaryForm.tsx";
import {buildSubsidiaryPayload} from "../../utils/subsidiaryHelpers.ts";

type EditSubsidiaryProps = {
    language: string;
    handleSubsidiaryUpdate: (updatedSubsidiary: SubsidiaryResponse) => void;
    companies: CompanyModel[];
    countries: CountryModel[];
}

export default function EditSubsidiary(props: Readonly<EditSubsidiaryProps>) {
    const [subsidiary, setSubsidiary] = useState<SubsidiaryResponse | null>(null);
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

    const formStateSubsidiary = useSubsidiaryForm();

    useEffect(() => {
        if(!id) return;
        axios
            .get(`/api/subsidiaries/${id}`)
            .then((response) => {
                const data = response.data;
                setSubsidiary(data);
                formStateSubsidiary.setCompanyId(data.company.id);
                formStateSubsidiary.setName(data.name);
                formStateSubsidiary.setCountryId(data.country.id);
                formStateSubsidiary.setLeiCode(data.leiCode);
                formStateSubsidiary.setTaxIdentificationNumber(data.taxIdentificationNumber);
                formStateSubsidiary.setEntityType(data.entityType);
                formStateSubsidiary.setMainBusinessActivity(data.mainBusinessActivity);
                formStateSubsidiary.setAdditionalActivities(data.additionalActivities);
                formStateSubsidiary.setIsActive(data.isActive);
            })
            .catch((error) => console.error("Error fetching subsidiary details", error));
    }, [id])

    function handleSaveEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(!subsidiary) return;

        try {
            const updatedSubsidiary = buildSubsidiaryPayload(formStateSubsidiary, props.companies, props.countries);

            axios
                .put(`/api/subsidiaries/${subsidiary.id}`, updatedSubsidiary)
                .then((response) => {
                    props.handleSubsidiaryUpdate(response.data);
                    navigate(`/entity-data/subsidiaries/${subsidiary.id}`);
                })
                .catch((error) => console.error("Error updating subsidiary", error));
        } catch (error) {
            console.error(error);
        }
    }

    const backNavigationPath = subsidiary?.id ? `/entity-data/subsidiaries/${subsidiary.id}` : "/entity-data/subsidiaries";

    return(
        <div>
            <SubsidiaryForm
                language={props.language}
                backNavigationPath={backNavigationPath}
                handleSubmit={handleSaveEdit}
                companies={props.companies}
                countries={props.countries}
                {...formStateSubsidiary}
            />
        </div>
    )
}
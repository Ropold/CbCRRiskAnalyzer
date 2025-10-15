import type {CompanyModel} from "../models/CompanyModel.ts";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useCompanyForm} from "../utils/useCompanyForm.ts";
import axios from "axios";
import {onFileChange, onImageCancel} from "../utils/ComponentsFunctions.tsx";
import CompanyForm from "./CompanyForm.tsx";

type EditCompanyProps = {
    language: string;
    handleCompanyUpdate: (updatedCompany: CompanyModel) => void;
}

export default function EditCompany(props: Readonly<EditCompanyProps>) {
    const [company, setCompany] = useState<CompanyModel | null>(null);
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

    const [image, setImage] = useState<File | null>(null);
    const [imageChanged, setImageChanged] = useState(false);
    const [imageDeleted, setImageDeleted] = useState(false);

    const formStateCompany = useCompanyForm();

    useEffect(() => {
        if(!id) return;
        axios
            .get(`/api/companies/${id}`)
            .then((response) => {
                const data = response.data;
                setCompany(data);
                formStateCompany.setName(data.name);
                formStateCompany.setIndustry(data.industry);
                formStateCompany.setHeadquartersCountryId(data.headquartersCountryId);
                formStateCompany.setReportingCurrency(data.reportingCurrency);
                formStateCompany.setTaxIdentificationNumber(data.taxIdentificationNumber);
                formStateCompany.setLeiCode(data.leiCode);
                formStateCompany.setParentCompanyId(data.parentCompanyId);
                formStateCompany.setIsUltimateParent(data.isUltimateParent);
                formStateCompany.setConsolidationScope(data.consolidationScope);
                formStateCompany.setCbcrReportingThreshold(data.cbcrReportingThreshold);
                formStateCompany.setImageUrl(data.imageUrl);
            })
            .catch((error) => console.error("Error fetching company details", error));
    }, [id]);

    function handleSaveEdit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        if(!company) return;

        // Image-URL Logik
        let updatedImageUrl = company.imageUrl;
        if (imageChanged) {
            if (image) {
                updatedImageUrl = "temp-image"; // Backend ersetzt das mit echter URL
            } else if (imageDeleted) {
                updatedImageUrl = undefined; // Image wurde gelöscht
            }
        }

        const updatedCompanyData = {
            name: formStateCompany.name,
            industry: formStateCompany.industry,
            headquartersCountryId: formStateCompany.headquartersCountryId,
            reportingCurrency: formStateCompany.reportingCurrency,
            taxIdentificationNumber: formStateCompany.taxIdentificationNumber,
            leiCode: formStateCompany.leiCode,
            parentCompanyId: formStateCompany.parentCompanyId,
            isUltimateParent: formStateCompany.isUltimateParent,
            consolidationScope: formStateCompany.consolidationScope,
            cbcrReportingThreshold: formStateCompany.cbcrReportingThreshold,
            imageUrl: updatedImageUrl
        };

        const data = new FormData();
        if (imageChanged && image) {
            data.append("image", image);
        }
        data.append("companyModel", new Blob([JSON.stringify(updatedCompanyData)], { type: "application/json" }));

        axios
            .put(`/api/companies/${company.id}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                props.handleCompanyUpdate(response.data);
                navigate(`/companies/${company.id}`);
            })
            .catch((error) => {
                console.error("Error updating company:", error);
            });
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFileChange(e, setImage);
        setImageChanged(true);
    };

    const handleImageCancel = () => {
        onImageCancel(setImage);
        setImageChanged(true);
        setImageDeleted(true);
    };

    const backNavigationPath = company?.id
        ? `/companies/${company.id}`
        : "/companies";

    return(
        <div>
            <h2>Edit Company</h2>
            <CompanyForm
                language={props.language}
                backNavigationPath={backNavigationPath}
                handleSubmit={handleSaveEdit}
                {...formStateCompany}
                image={image}
                handleFileChange={handleFileChange}
                handleImageCancel={handleImageCancel}
                existingImageUrl={company?.imageUrl}
                imageDeleted={imageDeleted}
            />
        </div>
    )
}
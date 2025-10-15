import type {CompanyModel} from "../models/CompanyModel.ts";
import {useCompanyForm} from "../utils/useCompanyForm.ts";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import {onFileChange, onImageCancel} from "../utils/ComponentsFunctions.tsx";
import CompanyForm from "./CompanyForm.tsx";

type AddNewCompanyProps = {
    language: string;
    handleNewCompanySubmit: (newCompany: CompanyModel) => void;
}

export default function AddNewCompany(props: Readonly<AddNewCompanyProps>) {
    const formStateCompany = useCompanyForm();
    const navigate = useNavigate();

    const [image, setImage] = useState<File | null>(null);

    function handleNewAddSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const companyData = {
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
            imageUrl: image ? "temp-image" : undefined
        };

        const data = new FormData();

        if (image) {
            data.append("image", image);
        }

        data.append("companyModel", new Blob(
            [JSON.stringify(companyData)],
            {type: "application/json"}
        ));

        axios
            .post("/api/companies", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                props.handleNewCompanySubmit(response.data);
                navigate(`/companies/${response.data.id}`);
            })
            .catch((error) => {
                console.error("Error creating company:", error);
            });
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFileChange(e, setImage);
    };

    const handleImageCancel = () => {
        onImageCancel(setImage);
    };

    const backNavigationPath = "/companies";


    return(
        <div>
            <h2>Add New Company</h2>
            <CompanyForm
                language={props.language}
                backNavigationPath={backNavigationPath}
                handleSubmit={handleNewAddSubmit}
                {...formStateCompany}
                image={image}
                handleFileChange={handleFileChange}
                handleImageCancel={handleImageCancel}
                existingImageUrl={undefined}
            />
        </div>
    )
}
import type {CompanyModel} from "../models/CompanyModel.ts";
import {useAutoScrollToTop} from "../utils/ComponentsFunctions.tsx";
import {useEffect, useState} from "react";
import SearchBar from "../SearchBar.tsx";
import CompanyCard from "./CompanyCard.tsx";

type CompaniesProps = {
    language: string;
    companies: CompanyModel[];
}

export default function Companies(props: Readonly<CompaniesProps>) {
    useAutoScrollToTop();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredCompanies, setFilteredCompanies] = useState<CompanyModel[]>([]);

    function filterCompanies(companies: CompanyModel[], query: string): CompanyModel[] {
        if (!companies) return [];

        const searchQuery = query.toLowerCase();

        return companies.filter(company => {
            return (
                company.name.toLowerCase().includes(searchQuery) ||
                company.industry?.toLowerCase().includes(searchQuery) ||
                company.taxIdentificationNumber?.toLowerCase().includes(searchQuery) ||
                company.leiCode?.toLowerCase().includes(searchQuery) ||
                company.reportingCurrency.toLowerCase().includes(searchQuery) ||
                company.consolidationScope?.toLowerCase().includes(searchQuery) ||
                company.id.toLowerCase().includes(searchQuery)
            );
        });
    }

    useEffect(() => {
        setFilteredCompanies(filterCompanies(props.companies, searchQuery));
    }, [searchQuery, props.companies]);

    return(
        <>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <div className="country-company-card-container">
                {filteredCompanies.map((company) => (
                    <CompanyCard
                        key={company.id}
                        company={company}
                        language={props.language}
                    />
                ))}
            </div>
        </>
    )
}
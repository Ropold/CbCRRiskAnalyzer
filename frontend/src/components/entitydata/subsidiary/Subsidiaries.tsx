import type {SubsidiaryResponse} from "../../dto/SubsidiaryResponse.ts";
import {useAutoScrollToTop} from "../../utils/ComponentsFunctions.tsx";
import {useEffect, useState} from "react";
import SearchBar from "../../SearchBar.tsx";
import SubsidiaryCard from "./SubsidiaryCard.tsx";

type SubsidiariesProps = {
    language: string;
    subsidiaries: SubsidiaryResponse[];
}

export default function Subsidiaries(props: Readonly<SubsidiariesProps>){
    useAutoScrollToTop()
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredSubsidiaries, setFilteredSubsidiaries] = useState<SubsidiaryResponse[]>([]);

    function filterSubsidiaries(subsidiaries: SubsidiaryResponse[], query: string): SubsidiaryResponse[] {
        if (!subsidiaries) return [];
        if (!query.trim()) return subsidiaries;

        const searchQuery = query.toLowerCase();
        return subsidiaries.filter(subsidiary => {
            return (
                subsidiary.id.toLowerCase().includes(searchQuery) ||
                subsidiary.name.toLowerCase().includes(searchQuery) ||
                subsidiary.company.name.toLowerCase().includes(searchQuery) ||
                subsidiary.country.countryName.toLowerCase().includes(searchQuery) ||
                subsidiary.leiCode?.toLowerCase().includes(searchQuery) ||
                subsidiary.taxIdentificationNumber?.toLowerCase().includes(searchQuery) ||
                subsidiary.entityType.toLowerCase().includes(searchQuery) ||
                subsidiary.mainBusinessActivity.toLowerCase().includes(searchQuery) ||
                subsidiary.additionalActivities?.toLowerCase().includes(searchQuery)
            );
        });
    }

    useEffect(() => {
        setFilteredSubsidiaries(filterSubsidiaries(props.subsidiaries, searchQuery));
    }, [searchQuery, props.subsidiaries]);

    return(
        <div>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <div className="cards-container">
                {filteredSubsidiaries.map((subsidiary:SubsidiaryResponse) => (
                <SubsidiaryCard
                    key={subsidiary.id}
                    subsidiary={subsidiary}
                    language={props.language}
                />
                ))}
            </div>
        </div>
    )
}
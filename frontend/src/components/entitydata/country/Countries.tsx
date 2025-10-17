import type {CountryModel} from "../../models/CountryModel.ts";
import {useAutoScrollToTop} from "../../utils/ComponentsFunctions.tsx";
import {useEffect, useState} from "react";
import SearchBar from "../../SearchBar.tsx";
import CountryCard from "./CountryCard.tsx";
import "../../styles/Card.css"

type CountriesProps = {
    language: string;
    countries: CountryModel[];
}

export default function Countries(props: Readonly<CountriesProps>) {
    useAutoScrollToTop();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredCountries, setFilteredCountries] = useState<CountryModel[]>([]);

    function filterCountries(countries: CountryModel[], query: string): CountryModel[] {
        if (!countries) return [];
        if (!query.trim()) return countries;

        const searchQuery = query.toLowerCase();

        return countries.filter(country => {
            return (
                country.countryName.toLowerCase().includes(searchQuery) ||
                country.countryCode.toLowerCase().includes(searchQuery) ||
                country.region?.toLowerCase().includes(searchQuery) ||
                country.jurisdictionType?.toLowerCase().includes(searchQuery) ||
                country.blacklistStatus?.toLowerCase().includes(searchQuery) ||
                country.id.toLowerCase().includes(searchQuery)
            );
        });
    }

    useEffect(() => {
        setFilteredCountries(filterCountries(props.countries, searchQuery));
    }, [searchQuery, props.countries]);

    return(
        <>
            <h2>Countries</h2>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <div className="country-company-card-container">
                {filteredCountries.map((country) => (
                    <CountryCard
                        key={country.id}
                        country={country}
                        language={props.language}
                    />
                ))}
            </div>
        </>
    )
}
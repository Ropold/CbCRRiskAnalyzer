import type {RiskAssessmentResponse} from "../../dto/RiskAssessmentResponse.ts";
import {useAutoScrollToTop} from "../../utils/ComponentsFunctions.tsx";
import {useEffect, useState} from "react";
import SearchBar from "../../SearchBar.tsx";
import RiskAssessmentCard from "./RiskAssessmentCard.tsx";

type RiskAssessmentProps = {
    language: string;
    riskAssessments: RiskAssessmentResponse[];
}

export default function RiskAssessments(props: Readonly<RiskAssessmentProps>) {
    useAutoScrollToTop()
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredRiskAssessments, setFilteredRiskAssessments] = useState<RiskAssessmentResponse[]>([]);

    function filterRiskAssessments(riskAssessments: RiskAssessmentResponse[], query: string): RiskAssessmentResponse[] {
        if (!riskAssessments) return [];
        if (!query.trim()) return riskAssessments;

        const searchQuery = query.toLowerCase();
        return riskAssessments.filter(assessment => {
            return (
                assessment.id.toLowerCase().includes(searchQuery) ||
                assessment.cbcrReport.id.toLowerCase().includes(searchQuery) ||
                assessment.cbcrReport.company.name.toLowerCase().includes(searchQuery) ||
                assessment.cbcrReport.country.countryName.toLowerCase().includes(searchQuery) ||
                assessment.overallRiskLevel?.toLowerCase().includes(searchQuery) ||
                assessment.riskScore?.toString().includes(searchQuery) ||
                assessment.riskExplanation?.toLowerCase().includes(searchQuery) ||
                assessment.recommendedAction?.toLowerCase().includes(searchQuery)
            );
        });
    }

    useEffect(() => {
        setFilteredRiskAssessments(filterRiskAssessments(props.riskAssessments, searchQuery));
    }, [searchQuery, props.riskAssessments]);

    return(
        <div>
            <h2>Risk Assessments</h2>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <div className="cards-container">
                {filteredRiskAssessments.map((assessment:RiskAssessmentResponse) => (
                    <RiskAssessmentCard
                        key={assessment.id}
                        riskAssessment={assessment}
                        language={props.language}
                    />
                ))}
            </div>
        </div>
    )
}
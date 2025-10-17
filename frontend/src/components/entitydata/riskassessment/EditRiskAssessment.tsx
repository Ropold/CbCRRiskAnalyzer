import type {CbcrReportResponse} from "../../dto/CbcrReportResponse.ts";
import type {RiskAssessmentResponse} from "../../dto/RiskAssessmentResponse.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useRiskAssessmentForm} from "../../utils/useRiskAssessmentForm.ts";
import axios from "axios";
import RiskAssessmentForm from "./RiskAssessmentForm.tsx";
import {buildRiskAssessmentPayload} from "../../utils/riskAssessmentHelpers.ts";

type EditRiskAssessmentProps = {
    language: string;
    handleRiskAssessmentUpdate: (updatedRiskAssessment: RiskAssessmentResponse) => void;
    cbcrReportsResponse: CbcrReportResponse[];
}

export default function EditRiskAssessment(props: Readonly<EditRiskAssessmentProps>) {
    const [riskAssessment, setRiskAssessment] = useState<RiskAssessmentResponse | null>(null);
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

    const formStateRiskAssessment = useRiskAssessmentForm();

    useEffect(() => {
        if (!id) return;
        axios
            .get(`/api/risk-assessments/${id}`)
            .then((response) => {
                const data = response.data;
                setRiskAssessment(data);
                formStateRiskAssessment.setCbcrReportId(data.cbcrReport.id);
                formStateRiskAssessment.setOverallRiskLevel(data.overallRiskLevel);
                formStateRiskAssessment.setRiskScore(data.riskScore);
                formStateRiskAssessment.setLowEtrFlag(data.lowEtrFlag);
                formStateRiskAssessment.setTaxHavenFlag(data.taxHavenFlag);
                formStateRiskAssessment.setProfitShiftingIndicator(data.profitShiftingIndicator);
                formStateRiskAssessment.setNegativeTaxFlag(data.negativeTaxFlag);
                formStateRiskAssessment.setHighRevenueLowTaxFlag(data.highRevenueLowTaxFlag);
                formStateRiskAssessment.setSubstanceMismatchFlag(data.substanceMismatchFlag);
                formStateRiskAssessment.setBlacklistJurisdictionFlag(data.blacklistJurisdictionFlag);
                formStateRiskAssessment.setEtrVariance(data.etrVariance);
                formStateRiskAssessment.setRevenuePerEmployeeRatio(data.revenuePerEmployeeRatio);
                formStateRiskAssessment.setProfitPerEmployeeRatio(data.profitPerEmployeeRatio);
                formStateRiskAssessment.setRiskExplanation(data.riskExplanation);
                formStateRiskAssessment.setRecommendedAction(data.recommendedAction);
            })
            .catch((error) => console.error("Error fetching risk assessment details", error));
    }, [id]);

    function handleSaveEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!riskAssessment) return;

        try {
            const updatedRiskAssessmentData = buildRiskAssessmentPayload(formStateRiskAssessment, props.cbcrReportsResponse);

            axios
                .put(`/api/risk-assessments/${riskAssessment.id}`, updatedRiskAssessmentData)
                .then((response) => {
                    props.handleRiskAssessmentUpdate(response.data);
                    navigate(`/entity-data/risk-assessments/${riskAssessment.id}`);
                })
                .catch((error) => console.error("Error updating risk assessment:", error));
        } catch (error) {
            console.error(error);
        }
    }

    const backNavigationPath = riskAssessment?.id
        ? `/entity-data/risk-assessments/${riskAssessment.id}`
        : "/entity-data/risk-assessments";

    return(
        <div>
            <RiskAssessmentForm
                language={props.language}
                backNavigationPath={backNavigationPath}
                handleSubmit={handleSaveEdit}
                cbcrReportsResponse={props.cbcrReportsResponse}
                {...formStateRiskAssessment}
            />
        </div>
    )
}
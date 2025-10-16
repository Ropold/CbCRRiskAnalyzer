import type {RiskAssessmentModel} from "../../models/RiskAssessmentModel.ts";
import {useRiskAssessmentForm} from "../../utils/useRiskAssessmentForm.ts";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import RiskAssessmentForm from "./RiskAssessmentForm.tsx";
import type {CbcrReportResponse} from "../../dto/CbcrReportResponse.ts";
import {buildRiskAssessmentPayload} from "../../utils/riskAssessmentHelpers.ts";
import type {RiskAssessmentResponse} from "../../dto/RiskAssessmentResponse.ts";

type AddNewRiskAssessmentProps = {
    language: string;
    handleNewRiskAssessmentSubmit:(newRiskAssessment: RiskAssessmentResponse)=>void;
    cbcrReportsResponse: CbcrReportResponse[];
    riskAssessments: RiskAssessmentResponse[];
}

export default function AddNewRiskAssessment(props:Readonly<AddNewRiskAssessmentProps>) {

    const formStateRiskAssessment = useRiskAssessmentForm()
    const navigate = useNavigate();

    // Filter out CbCR Reports that already have a Risk Assessment
    const availableCbcrReports = props.cbcrReportsResponse.filter(
        report => !props.riskAssessments?.some(assessment => assessment.cbcrReport.id === report.id)
    );

    function handleNewAddSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const newRiskAssessmentData = buildRiskAssessmentPayload(formStateRiskAssessment, props.cbcrReportsResponse);

            axios
                .post('/api/risk-assessments', newRiskAssessmentData)
                .then((response) => {
                    props.handleNewRiskAssessmentSubmit(response.data);
                    navigate(`/entity-data/risk-assessments/${response.data.id}`);
                })
                .catch((error) => console.error("Error creating risk assessment:", error));
        } catch (error) {
            console.error(error);
        }
    }
    const backNavigationPath = "/entity-data/risk-assessments";

    return (
        <div>
            <RiskAssessmentForm
                language={props.language}
                backNavigationPath={backNavigationPath}
                handleSubmit={handleNewAddSubmit}
                cbcrReportsResponse={availableCbcrReports}
                {...formStateRiskAssessment}
            />
        </div>
    )
}
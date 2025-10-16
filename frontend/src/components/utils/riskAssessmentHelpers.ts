import type {CbcrReportResponse} from "../dto/CbcrReportResponse.ts";

export function buildRiskAssessmentPayload(
    formStateRiskAssessment: any,
    cbcrReportsResponse: CbcrReportResponse[]
) {
    const selectedCbcrReport = cbcrReportsResponse.find(r => r.id === formStateRiskAssessment.cbcrReportId);

    if (!selectedCbcrReport) {
        throw new Error("CbCR Report not found");
    }

    const {cbcrReportId, ...assessmentData} = formStateRiskAssessment;

    return {
        ...assessmentData,
        cbcrReport: {
            id: selectedCbcrReport.id,
            company: selectedCbcrReport.company,
            reportingYear: selectedCbcrReport.reportingYear,
            country: selectedCbcrReport.country,
            revenuesTotal: selectedCbcrReport.revenuesTotal,
            profitBeforeTax: selectedCbcrReport.profitBeforeTax
        }
    };
}
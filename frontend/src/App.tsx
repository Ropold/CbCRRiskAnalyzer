import './App.css'
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Welcome from "./components/Welcome.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import {useEffect, useState} from "react";
import NotFound from "./components/NotFound.tsx";
import axios from "axios";
import CbcrReports from "./components/entitydata/cbcr/CbcrReports.tsx";
import {DefaultUser, type UserModel} from "./components/models/UserModel.ts";
import Profile from "./components/Profile.tsx";
import type {AuditLogModel} from "./components/models/AuditLogModel.ts";
import type {CompanyModel} from "./components/models/CompanyModel.ts";
import type {RiskAssessmentResponse} from "./components/dto/RiskAssessmentResponse.ts";
import EntityData from "./components/entitydata/EntityData.tsx";
import Insert from "./components/Insert.tsx";
import CbcrReportDetails from "./components/entitydata/cbcr/CbcrReportDetails.tsx";
import AddNewCbcrReport from "./components/entitydata/cbcr/AddNewCbcrReport.tsx";
import EditCbcrReport from "./components/entitydata/cbcr/EditCbcrReport.tsx";
import type {CbcrReportResponse} from "./components/dto/CbcrReportResponse.ts";
import type {CountryModel} from "./components/models/CountryModel.ts";
import AddNewCompany from "./components/company/AddNewCompany.tsx";
import AddNewCountry from "./components/entitydata/country/AddNewCountry.tsx";
import AddNewRiskAssessment from "./components/entitydata/riskassessment/AddNewRiskAssessment.tsx";
import AddNewSubsidiary from "./components/entitydata/subsidiary/AddNewSubsidiary.tsx";
import Companies from "./components/company/Companies.tsx";
import CompanyDetails from "./components/company/CompanyDetails.tsx";
import EditCompany from "./components/company/EditCompany.tsx";
import Countries from "./components/entitydata/country/Countries.tsx";
import CountryDetails from "./components/entitydata/country/CountryDetails.tsx";
import EditCountry from "./components/entitydata/country/EditCountry.tsx";
import RiskAssessments from "./components/entitydata/riskassessment/RiskAssessments.tsx";
import RiskAssessmentDetails from "./components/entitydata/riskassessment/RiskAssessmentDetails.tsx";
import EditRiskAssessment from "./components/entitydata/riskassessment/EditRiskAssessment.tsx";
import Subsidiaries from "./components/entitydata/subsidiary/Subsidiaries.tsx";
import SubsidiaryDetails from "./components/entitydata/subsidiary/SubsidiaryDetails.tsx";
import EditSubsidiary from "./components/entitydata/subsidiary/EditSubsidiary.tsx";
import AuditLogDetails from "./components/auditlog/AuditLogDetails.tsx";
import AuditLogs from "./components/auditlog/AuditLogs.tsx";
import type {SubsidiaryResponse} from "./components/dto/SubsidiaryResponse.ts";

export default function App() {
    const [user, setUser] = useState<string>("anonymousUser");
    const [userDetails, setUserDetails] = useState<UserModel | null>(DefaultUser);
    const [language, setLanguage] = useState<string>("de");

    const [auditLogs, setAuditLogs] = useState<AuditLogModel[]>([]);
    const [cbcrReportsResponse, setCbcrReportsResponse] = useState<CbcrReportResponse[]>([]);
    const [companies, setCompanies] = useState<CompanyModel[]>([]);
    const [riskAssessments, setRiskAssessments] = useState<RiskAssessmentResponse[]>([]);
    const [subsidiaries, setSubsidiaries] = useState<SubsidiaryResponse[]>([]);
    const [countries, setCountries]= useState<CountryModel[]>([]);

    function getUser() {
        axios.get("/api/users/me")
            .then((response) => {
                setUser(response.data.toString());
            })
            .catch((error) => {
                console.error(error);
                setUser("anonymousUser");
            });
    }

    function getUserDetails() {
        axios.get("/api/users/me/details")
            .then((response) => {
                setUserDetails(response.data as UserModel);
            })
            .catch((error) => {
                console.error(error);
                setUserDetails(null);
            });
    }

    function getAllAuditLogs() {
        axios.get("/api/audit-logs")
            .then((response) => {
                setAuditLogs(response.data as AuditLogModel[]);
            })
            .catch((error) => {
                console.error("Error fetching audit logs:", error);
            });
    }

    function getAllCbcrReports() {
        axios.get("/api/cbcr-reports")
            .then((response) => {
                setCbcrReportsResponse(response.data as CbcrReportResponse[]);
            })
            .catch((error) => {
                console.error("Error fetching CbCR reports:", error);
            });
    }

    function getAllCompanies() {
        axios.get("/api/companies")
            .then((response) => {
                setCompanies(response.data as CompanyModel[]);
            })
            .catch((error) => {
                console.error("Error fetching companies:", error);
            });
    }

    function getAllRiskAssessments() {
        axios.get("/api/risk-assessments")
            .then((response) => {
                setRiskAssessments(response.data as RiskAssessmentResponse[]);
            })
            .catch((error) => {
                console.error("Error fetching risk assessments:", error);
            });
    }

    function getAllSubsidiaries() {
        axios.get("/api/subsidiaries")
            .then((response) => {
                setSubsidiaries(response.data as SubsidiaryResponse[]);
            })
            .catch((error) => {
                console.error("Error fetching subsidiaries:", error);
            });
    }

    function getAllCountries() {
        axios.get("/api/countries")
            .then((response) => {
                setCountries(response.data as CountryModel[]);
            })
            .catch((error) => {
                console.error("Error fetching countries:", error);
            });
    }

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if(user !== "anonymousUser"){
            getAllAuditLogs();
            getAllCbcrReports();
            getAllCompanies();
            getAllRiskAssessments();
            getAllSubsidiaries();
            getAllCountries();
            getUserDetails();
        }
    }, [user]);

    function handleNewCbcrReportSubmit(newReport: CbcrReportResponse) {
        setCbcrReportsResponse((prevReports) => [...prevReports, newReport]);
    }

    function handleNewCompanySubmit(newCompany: CompanyModel) {
        setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
    }

    function handleNewCountrySubmit(newCountry: CountryModel) {
        setCountries((prevCountries) => [...prevCountries, newCountry]);
    }

    function handleNewRiskAssessmentSubmit(newRiskAssessment: RiskAssessmentResponse) {
        setRiskAssessments((prevRiskAssessments) => [...prevRiskAssessments, newRiskAssessment]);
    }

    function handleNewSubsidiarySubmit(newSubsidiary: SubsidiaryResponse) {
        setSubsidiaries((prevSubsidiaries) => [...prevSubsidiaries, newSubsidiary]);
    }

    function handleCbcrReportUpdate(updatedReport: CbcrReportResponse) {
        setCbcrReportsResponse((prevReports) =>
            prevReports.map((report) =>
                report.id === updatedReport.id ? updatedReport : report
            )
        );
    }

    function handleCompanyUpdate(updatedCompany: CompanyModel) {
        setCompanies((prevCompanies) =>
            prevCompanies.map((company) =>
                company.id === updatedCompany.id ? updatedCompany : company
            )
        );
    }

    function handleCountryUpdate(updatedCountry: CountryModel) {
        setCountries((prevCountries) =>
            prevCountries.map((country) =>
                country.id === updatedCountry.id ? updatedCountry : country
            )
        );
    }

    function handleRiskAssessmentUpdate(updatedRiskAssessment: RiskAssessmentResponse) {
        setRiskAssessments((prevRiskAssessments) =>
            prevRiskAssessments.map((riskAssessment) =>
                riskAssessment.id === updatedRiskAssessment.id ? updatedRiskAssessment : riskAssessment
            )
        );
    }

    function handleSubsidiaryUpdate(updatedSubsidiary: SubsidiaryResponse) {
        setSubsidiaries((prevSubsidiaries) =>
            prevSubsidiaries.map((subsidiary) =>
                subsidiary.id === updatedSubsidiary.id ? updatedSubsidiary : subsidiary
            )
        );
    }

    function handleCbcrReportDelete(deletedReportId: string) {
        setCbcrReportsResponse((prevReports) =>
            prevReports.filter((report) => report.id !== deletedReportId)
        );
    }

    function handleCompanyDelete(deletedCompanyId: string) {
        setCompanies((prevCompanies) =>
            prevCompanies.filter((company) => company.id !== deletedCompanyId)
        );
    }

    function handleCountryDelete(deletedCountryId: string) {
        setCountries((prevCountries) =>
            prevCountries.filter((country) => country.id !== deletedCountryId)
        );
    }

    function handleRiskAssessmentDelete(deletedRiskAssessmentId: string) {
        setRiskAssessments((prevRiskAssessments) =>
            prevRiskAssessments.filter((riskAssessment) => riskAssessment.id !== deletedRiskAssessmentId)
        );
    }

    function handleSubsidiaryDelete(deletedSubsidiaryId: string) {
        setSubsidiaries((prevSubsidiaries) =>
            prevSubsidiaries.filter((subsidiary) => subsidiary.id !== deletedSubsidiaryId)
        );
    }

  return (
    <>
      <Navbar user={user} getUser={getUser}/>
      <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Welcome />}/>
              <Route element={<ProtectedRoute user={user}/>}>
                  <Route path="/companies" element={<Companies language={language} companies={companies}/>} />
                  <Route path="/companies/:id" element={<CompanyDetails language={language} handleCompanyDelete={handleCompanyDelete}/>} />
                  <Route path="/companies/:id/edit" element={<EditCompany language={language} handleCompanyUpdate={handleCompanyUpdate} companies={companies} />} />
                  <Route path="/entity-data" element={<EntityData language={language}/>} />
                  <Route path="/entity-data/cbcr-reports" element={<CbcrReports language={language} cbcrReports={cbcrReportsResponse} />} />
                  <Route path="/entity-data/cbcr-reports/:id" element={<CbcrReportDetails language={language} handleCbcrReportDelete={handleCbcrReportDelete} />} />
                  <Route path="/entity-data/cbcr-reports/:id/edit" element={<EditCbcrReport language={language} handleCbcrReportUpdate={handleCbcrReportUpdate} companies={companies} countries={countries}/>} />
                  <Route path="/entity-data/countries" element={<Countries language={language} countries={countries} />} />
                  <Route path="/entity-data/countries/:id" element={<CountryDetails language={language} handleCountryDelete={handleCountryDelete}/>} />
                  <Route path="/entity-data/countries/:id/edit" element={<EditCountry language={language} handleCountryUpdate={handleCountryUpdate}/>} />
                  <Route path="/entity-data/risk-assessments" element={<RiskAssessments language={language} riskAssessments={riskAssessments} />} />
                  <Route path="/entity-data/risk-assessments/:id" element={<RiskAssessmentDetails language={language} handleRiskAssessmentDelete={handleRiskAssessmentDelete}/>} />
                  <Route path="/entity-data/risk-assessments/:id/edit" element={<EditRiskAssessment language={language} handleRiskAssessmentUpdate={handleRiskAssessmentUpdate} cbcrReportsResponse={cbcrReportsResponse} />} />
                  <Route path="/entity-data/subsidiaries" element={<Subsidiaries language={language} subsidiaries={subsidiaries} />} />
                  <Route path="/entity-data/subsidiaries/:id" element={<SubsidiaryDetails language={language} handleSubsidiaryDelete={handleSubsidiaryDelete}/>} />
                  <Route path="/entity-data/subsidiaries/:id/edit" element={<EditSubsidiary language={language} handleSubsidiaryUpdate={handleSubsidiaryUpdate}/>} />
                  <Route path="/insert" element={<Insert language={language} />} />
                  <Route path="/insert/add-new-company" element={<AddNewCompany language={language} handleNewCompanySubmit={handleNewCompanySubmit} companies={companies}/>} />
                  <Route path="/insert/add-new-cbcr-report" element={<AddNewCbcrReport language={language} handleNewCbcrReportSubmit={handleNewCbcrReportSubmit} companies={companies} countries={countries}/>} />
                  <Route path="/insert/add-new-country" element={<AddNewCountry language={language} handleNewCountrySubmit={handleNewCountrySubmit}/>} />
                  <Route path="/insert/add-new-risk-assessment" element={<AddNewRiskAssessment language={language} handleNewRiskAssessmentSubmit={handleNewRiskAssessmentSubmit} cbcrReportsResponse={cbcrReportsResponse} riskAssessments={riskAssessments} />} />
                  <Route path="/insert/add-new-subsidiary" element={<AddNewSubsidiary language={language} handleNewSubsidiarySubmit={handleNewSubsidiarySubmit} companies={companies} countries={countries}/>} />
                  <Route path="/profile" element={<Profile language={language} user={user} userDetails={userDetails} setLanguage={setLanguage}/>} />
                  <Route path="/profile/audit-logs" element={<AuditLogs language={language} auditLogs={auditLogs} />} />
                  <Route path="/profile/audit-logs/:id" element={<AuditLogDetails language={language} auditLogs={auditLogs} />} />
              </Route>
      </Routes>
    </>
  )
}


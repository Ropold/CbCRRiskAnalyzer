import './App.css'
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Welcome from "./components/Welcome.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import {useEffect, useState} from "react";
import NotFound from "./components/NotFound.tsx";
import axios from "axios";
import CbcrReports from "./components/cbcr/CbcrReports.tsx";
import {DefaultUser, type UserModel} from "./components/models/UserModel.ts";
import Profile from "./components/Profile.tsx";
import type {AuditLogModel} from "./components/models/AuditLogModel.ts";
import type {CbcrReportModel} from "./components/models/CbcrReportModel.ts";
import type {CompanyModel} from "./components/models/CompanyModel.ts";
import type {RiskAssessmentModel} from "./components/models/RiskAssessmentModel.ts";
import type {SubsidiaryModel} from "./components/models/SubsidiaryModel.ts";
import EntityData from "./components/entitydata/EntityData.tsx";
import Insert from "./components/Insert.tsx";
import CbcrReportDetails from "./components/cbcr/CbcrReportDetails.tsx";
import AddNewCbcrReport from "./components/cbcr/AddNewCbcrReport.tsx";
import EditCbcrReport from "./components/cbcr/EditCbcrReport.tsx";
import type {CbcrReportResponse} from "./components/dto/CbcrReportResponse.ts";

export default function App() {
    const [user, setUser] = useState<string>("anonymousUser");
    const [userDetails, setUserDetails] = useState<UserModel | null>(DefaultUser);
    const [language, setLanguage] = useState<string>("de");

    const [auditLogs, setAuditLogs] = useState<AuditLogModel[]>([]);
    const [cbcrReportsResponse, setCbcrReportsResponse] = useState<CbcrReportResponse[]>([]);
    const [companies, setCompanies] = useState<CompanyModel[]>([]);
    const [riskAssessments, setRiskAssessments] = useState<RiskAssessmentModel[]>([]);
    const [subsidiaries, setSubsidiaries] = useState<SubsidiaryModel[]>([]);

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
                setRiskAssessments(response.data as RiskAssessmentModel[]);
            })
            .catch((error) => {
                console.error("Error fetching risk assessments:", error);
            });
    }

    function getAllSubsidiaries() {
        axios.get("/api/subsidiaries")
            .then((response) => {
                setSubsidiaries(response.data as SubsidiaryModel[]);
            })
            .catch((error) => {
                console.error("Error fetching subsidiaries:", error);
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
            getUserDetails();
        }
    }, [user]);

  return (
    <>
      <Navbar user={user} getUser={getUser}/>
      <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Welcome />}/>
              <Route element={<ProtectedRoute user={user}/>}>
                  <Route path="/cbcr-reports" element={<CbcrReports language={language} cbcrReports={cbcrReportsResponse} />} />
                  <Route path="/cbcr-reports/add" element={<AddNewCbcrReport />} />
                  <Route path="/cbcr-reports/:id" element={<CbcrReportDetails language={language} />} />
                  <Route path="/cbcr-reports/:id/edit" element={<EditCbcrReport />} />
                  <Route path="/entity-data/*" element={<EntityData />} />
                  <Route path="/insert" element={<Insert />} />
                  <Route path="/profile/*" element={<Profile language={language} user={user} userDetails={userDetails} setLanguage={setLanguage}/>} />
              </Route>
      </Routes>
    </>
  )
}


import './App.css'
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Welcome from "./components/Welcome.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import {useEffect, useState} from "react";
import NotFound from "./components/NotFound.tsx";
import axios from "axios";
import CbCR from "./components/CbCR.tsx";
import {DefaultUser, type UserModel} from "./components/models/UserModel.ts";
import Profile from "./components/Profile.tsx";
import type {AuditLogModel} from "./components/models/AuditLogModel.ts";
import type {CbcrReportModel} from "./components/models/CbcrReportModel.ts";
import type {CompanyModel} from "./components/models/CompanyModel.ts";
import type {RiskAssessmentModel} from "./components/models/RiskAssessmentModel.ts";
import type {SubsidiaryModel} from "./components/models/SubsidiaryModel.ts";

export default function App() {
    const [user, setUser] = useState<string>("anonymousUser");
    const [userDetails, setUserDetails] = useState<UserModel | null>(DefaultUser);
    const [language, setLanguage] = useState<string>("de");

    const [auditLogs, setAuditLogs] = useState<AuditLogModel[]>([]);
    const [cbcrReports, setCbcrReports] = useState<CbcrReportModel[]>([]);
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
                setCbcrReports(response.data as CbcrReportModel[]);
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
                  <Route path="/cbcr" element={<CbCR />} />
                  <Route path="/profile" element={<Profile user={user} userDetails={userDetails} />} />
              </Route>
      </Routes>
    </>
  )
}


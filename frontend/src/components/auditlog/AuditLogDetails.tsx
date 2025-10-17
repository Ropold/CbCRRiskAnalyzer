import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {AuditLogResponse} from "../dto/AuditLogResponse.ts";
import axios from "axios";
import "../styles/Details.css";

type AuditLogDetailsProps = {
    language: string;
}

export default function AuditLogDetails(props: Readonly<AuditLogDetailsProps>) {
    const [auditLog, setAuditLog] = useState<AuditLogResponse | null>(null);
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

    useEffect(() => {
        if(!id) return
        axios
            .get(`/api/audit-logs/${id}`)
            .then((response) => setAuditLog(response.data))
            .catch((error) => console.error("Error fetching Audit Log details", error));
    }, [id]);

    return(
        <div>
            <h2>Audit Log Details</h2>
            <p>Language: {props.language}</p>
            {auditLog ? (
                <div className="details-container">
                    <div className="detail-section">
                        <h3>Change Information</h3>
                        <p><strong>Action:</strong> {auditLog.action}</p>
                        <p><strong>Table:</strong> {auditLog.tableName}</p>
                        <p><strong>Record ID:</strong> {auditLog.recordId}</p>
                        <p><strong>Field:</strong> {auditLog.fieldName}</p>
                    </div>

                    <div className="detail-section">
                        <h3>Values</h3>
                        <p><strong>Old Value:</strong> {auditLog.oldValue || 'N/A'}</p>
                        <p><strong>New Value:</strong> {auditLog.newValue || 'N/A'}</p>
                    </div>

                    <div className="detail-section">
                        <h3>User Information</h3>
                        <p><strong>Username:</strong> {auditLog.username}</p>
                        <p><strong>User ID:</strong> {auditLog.user.id}</p>
                        <p><strong>IP Address:</strong> {auditLog.ipAddress}</p>
                    </div>

                    <div className="detail-section">
                        <h3>Timestamp</h3>
                        <p><strong>Created At:</strong> {new Date(auditLog.createdAt).toLocaleString()}</p>
                    </div>

                    <div className="details-buttons">
                        <button className="button-blue" onClick={() => navigate("/profile/audit-logs")}>
                            Back to List
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
import type {AuditLogResponse} from "../dto/AuditLogResponse.ts";
import {useNavigate} from "react-router-dom";

type AuditLogCardProps = {
    auditLog: AuditLogResponse
    language: string;
}

export default function AuditLogCard(props: Readonly<AuditLogCardProps>) {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/profile/audit-logs/${props.auditLog.id}`);
    }

    return (
        <div className="card-overview" onClick={handleCardClick}>
            <h2>{props.auditLog.action} - {props.auditLog.tableName}</h2>
            <p><strong>User:</strong> {props.auditLog.username}</p>
            <p><strong>Field:</strong> {props.auditLog.fieldName}</p>
            <p><strong>Time:</strong> {new Date(props.auditLog.createdAt).toLocaleString()}</p>
        </div>
    )
}
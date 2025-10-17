import type {AuditLogResponse} from "../dto/AuditLogResponse.ts";
import {useAutoScrollToTop} from "../utils/ComponentsFunctions.tsx";
import {useEffect, useState} from "react";
import SearchBar from "../SearchBar.tsx";
import AuditLogCard from "./AuditLogCard.tsx";

type AuditLogsProps = {
    language: string;
    auditLogs: AuditLogResponse[]
};

export default function AuditLogs(props: Readonly<AuditLogsProps>) {
    useAutoScrollToTop()
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredAuditLogs, setFilteredAuditLogs] = useState<AuditLogResponse[]>([]);

    function filterAuditLogs(auditLogs: AuditLogResponse[], query: string): AuditLogResponse[] {
        if (!auditLogs) return [];
        if (!query.trim()) return auditLogs;

        const searchQuery = query.toLowerCase();
        return auditLogs.filter(auditLog => {
            return (
                auditLog.id.toLowerCase().includes(searchQuery) ||
                auditLog.tableName.toLowerCase().includes(searchQuery) ||
                auditLog.recordId.toLowerCase().includes(searchQuery) ||
                auditLog.action.toLowerCase().includes(searchQuery) ||
                auditLog.fieldName?.toLowerCase().includes(searchQuery) ||
                auditLog.oldValue?.toLowerCase().includes(searchQuery) ||
                auditLog.newValue?.toLowerCase().includes(searchQuery) ||
                auditLog.username.toLowerCase().includes(searchQuery) ||
                auditLog.ipAddress?.toLowerCase().includes(searchQuery)
            );
        });
    }

useEffect(() => {
    setFilteredAuditLogs(filterAuditLogs(props.auditLogs, searchQuery));
}, [searchQuery, props.auditLogs]);

    return(
        <div>
            <h2>Audit Logs</h2>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <div className="cards-container">
                {filteredAuditLogs.map((auditLog:AuditLogResponse) => (
                    <AuditLogCard
                        key={auditLog.id}
                        auditLog={auditLog}
                        language={props.language}
                    />
                ))}
            </div>
        </div>
    )
}
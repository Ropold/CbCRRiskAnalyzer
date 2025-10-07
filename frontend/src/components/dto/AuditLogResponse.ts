import type {UserBasicInfo} from "./CbcrReportResponse.ts";

export type AuditLogResponse = {
    id: string;
    tableName: string;
    recordId: string;
    action: string;
    fieldName: string;
    oldValue: string;
    newValue: string;
    user: UserBasicInfo;
    username: string;
    ipAddress: string;
    createdAt: string;
}
export type AuditLogModel = {
    id: string;
    tableName: string;
    recordId: string;
    action: string;
    fieldName?: string;
    oldValue?: string;
    newValue?: string;
    userId?: string;
    username?: string;
    ipAddress?: string;
    createdAt: string;
};

export const defaultAuditLog: AuditLogModel = {
    id: "550e8400-e29b-41d4-a716-446655440001",
    tableName: "companies",
    recordId: "550e8400-e29b-41d4-a716-446655440010",
    action: "UPDATE",
    fieldName: "name",
    oldValue: "TechCorp Inc",
    newValue: "TechCorp International",
    userId: "550e8400-e29b-41d4-a716-446655440020",
    username: "admin",
    ipAddress: "192.168.1.1",
    createdAt: "2024-01-15T10:30:00Z"
};
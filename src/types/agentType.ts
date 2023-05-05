export default interface AgentType {
    id?: string;
    idNo: string;
    firstName: string;
    secondName: string;
    profileImage?: string;
    role: string;
    phone: string;
    email?: string;
    level: number;
    sacco: string;
    station: string;
    rating?: number;
    employedOn?: Date;
    addedOn: Date;
    addedBy: string;
    updatedOn?: Date;
}

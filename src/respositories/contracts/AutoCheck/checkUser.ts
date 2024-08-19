import { AutoCheckUser } from "../../../entities/AutoCheckUser";

export interface CheckUser {
    check(): Promise<AutoCheckUser[]>
}
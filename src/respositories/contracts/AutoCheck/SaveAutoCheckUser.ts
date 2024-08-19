import { AutoCheckUser } from "../../../entities/AutoCheckUser";

export interface SaveAutoCheckUser {
    save(data: AutoCheckUser): Promise<void>
}
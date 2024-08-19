import { AutoCheckUser } from "../../../entities/AutoCheckUser";

export interface FindAutoCheckUserById {
    Find(id: string): Promise<AutoCheckUser | null>
}



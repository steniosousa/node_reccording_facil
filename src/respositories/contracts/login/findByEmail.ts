import { User } from "../../../entities/user";

export interface findByEmail {
    find( email:string): Promise<User | null>;
}
import { AutoCheckUser } from "../../../entities/AutoCheckUser";
import { CheckUser } from "../../contracts/AutoCheck/checkUser";
import { prisma } from "../../prisma/prisma.service";

export class CheckUserImplementation implements CheckUser {
    async check(): Promise<AutoCheckUser[]> {
        const users = await prisma.autoCheckUser.findMany({
            where: { photo: { not: null } }, 
        });

        return users
    }
}
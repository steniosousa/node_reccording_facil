import { AutoCheckUser } from "../../../entities/AutoCheckUser";
import { FindAutoCheckUserById } from "../../contracts/AutoCheck/FindAutoCheckUserById";
import { SaveAutoCheckUser } from "../../contracts/AutoCheck/SaveAutoCheckUser";
import { prisma } from "../../prisma/prisma.service";

export class AutoCheckCreateUserRepositorie implements FindAutoCheckUserById, SaveAutoCheckUser {
    async save(data: AutoCheckUser): Promise<void> {
        try {
            await prisma.autoCheckUser.create({
                data: {
                    id: data.id,
                    name: data.name,
                    plate: data.plate,
                    photo: data.photo,
                }
            })
        } catch (error) {
            let message = "Erro ao salvar motorista"
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }

    }
    async Find(id: string): Promise<AutoCheckUser> {
        try {
            const user = await prisma.autoCheckUser.findUnique({
                where: {
                    plate:id
                }
            })
            return user
        } catch (error) {
            let message = "Erro ao buscar motorista"
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }


}
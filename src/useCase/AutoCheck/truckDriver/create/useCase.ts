import { AutoCheckUser } from "../../../../entities/AutoCheckUser"
import { FindAutoCheckUserById } from "../../../../respositories/contracts/AutoCheck/FindAutoCheckUserById"
import { SaveAutoCheckUser } from "../../../../respositories/contracts/AutoCheck/SaveAutoCheckUser"

export class TruckDriverUseCase {
    constructor(
        private CustomerRepository: FindAutoCheckUserById,
        private saveAutoCheckUser: SaveAutoCheckUser,
    ) { }

    async execute(AutoCheckUserBody: AutoCheckUser) {

        const AutoCheckUserExist = await this.CustomerRepository.Find(AutoCheckUserBody.plate)
        if (AutoCheckUserExist) {
            throw new Error('Motorista já cadastrado')
        }

        const user = new AutoCheckUser({
            name: AutoCheckUserBody.name,
            plate: AutoCheckUserBody.plate,
            photo: AutoCheckUserBody.photo,
            descritor: AutoCheckUserBody.descritor
        })
        await this.saveAutoCheckUser.save(user)
    }

}
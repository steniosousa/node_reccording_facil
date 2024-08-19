import { AutoCheckUser } from "../../../../entities/AutoCheckUser"
import { FindAutoCheckUserById } from "../../../../respositories/contracts/AutoCheck/FindAutoCheckUserById"
import { SaveAutoCheckUser } from "../../../../respositories/contracts/AutoCheck/SaveAutoCheckUser"

export class TruckDriverUseCase {
    constructor(
        private CustomerRepository: FindAutoCheckUserById,
        private saveAutoCheckUser: SaveAutoCheckUser,
    ) { }

    async execute(AutoCheckUser: AutoCheckUser) {
        const AutoCheckUserExist = await this.CustomerRepository.Find(AutoCheckUser.plate)
        if (AutoCheckUserExist) {
            throw new Error('Motorista já cadastrado')
        }
        await this.saveAutoCheckUser.save(AutoCheckUser)
    }
}
import { CheckUserImplementation } from "../../respositories/implementation/AutoCheck/checkUser";
import { CheckTruckDriverIdentifyController } from "../../useCase/AutoCheck/truckDriver/check/controller";
import { CheckUserUseCase } from "../../useCase/AutoCheck/truckDriver/check/useCase";

export function AutoCheckIdentifyUser() {
    const implementation = new CheckUserImplementation()
    const iUseCase = new CheckUserUseCase(implementation)
    const iController = new CheckTruckDriverIdentifyController(iUseCase)

    return iController
}
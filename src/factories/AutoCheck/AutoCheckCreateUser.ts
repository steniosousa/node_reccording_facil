import { AutoCheckCreateUserRepositorie } from "../../respositories/implementation/AutoCheck/AutocheckCreateUser";
import { CreateTruckDriverController } from "../../useCase/AutoCheck/truckDriver/create/controller";
import { TruckDriverUseCase } from "../../useCase/AutoCheck/truckDriver/create/useCase";

export function AutoCheckCreateUser() {
    const iRepositorie = new AutoCheckCreateUserRepositorie()
    const iUseCase = new TruckDriverUseCase(iRepositorie, iRepositorie)
    const iController = new CreateTruckDriverController(iUseCase)

    return iController
}
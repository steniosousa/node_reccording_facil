import { Login } from "../../respositories/implementation/login/login";
import { loginController } from "../../useCase/login/login.controller";
import { LoginUseCase } from "../../useCase/login/login.useCase";

export function LoginFactore() {
    const iImplementation = new Login()
    const loginUseCase = new LoginUseCase(iImplementation, iImplementation,iImplementation)
    const iloginController = new loginController(loginUseCase)
    return iloginController
}
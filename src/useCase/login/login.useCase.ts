import { LoginContract } from "../../respositories/contracts/login/login.contract";
import { JwtContract } from "../../respositories/contracts/login/jwt.contract";
import { findByEmail } from "../../respositories/contracts/login/findByEmail";

export class LoginUseCase {
    constructor(
        private readonly login: LoginContract,
        private readonly findByEmail: findByEmail,
        private readonly jwt: JwtContract
    ) { }
    async execute(password: string, email: string) {
        const accountExist = await this.findByEmail.find(email)
        if (accountExist) {
            const customerLogin = await this.login.login(accountExist.password, password)
            if (!customerLogin) throw new Error("Email ou senha inválidos")
            const webToken = await this.jwt.sign(accountExist.id as string)
            
            return webToken
        } 
        else {

            throw new Error('Email ou senha inválidos')
        }
    }
}
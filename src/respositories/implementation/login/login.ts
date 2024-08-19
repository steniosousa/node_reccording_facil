import { ZodError } from "zod";

import { JwtContract } from "../../contracts/login/jwt.contract";
import { LoginContract } from "../../contracts/login/login.contract";
import { prisma } from "../../prisma/prisma.service";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { findByEmail } from "../../contracts/login/findByEmail";
import { User } from "../../../entities/user";


export class Login implements findByEmail, LoginContract, JwtContract {
  
    async find(email: string): Promise<User> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            const userFound: User = user
            return userFound
        }
        catch (error) {
            throw new Error('Usuário não encontrado')
        }

    }

    async login(bdPass: string, password: string): Promise<Boolean | null> {

        const matchPassword = await bcrypt.compare(password, bdPass)
        if (!matchPassword) return null


        return matchPassword
    }

    async sign(userId: string) {

        const jwtSecret = process.env.JWT_SECRET_TOKEN as string
        const maxAge = 5 * 60 * 60;
        const token = jwt.sign(
            { id: userId },
            jwtSecret,
            {
                expiresIn: maxAge,
            }
        );

        return token
    }
}
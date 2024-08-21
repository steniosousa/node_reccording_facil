import '@tensorflow/tfjs-node';
import * as faceapi from 'face-api.js';
import path from 'path'
import { createCanvas, Canvas, Image, ImageData } from 'canvas';
import { CheckUser } from '../../../../respositories/contracts/AutoCheck/checkUser';
import { AutoCheckUser } from '../../../../entities/AutoCheckUser';
export class CheckUserUseCase {
    constructor(
        private iCheckUser: CheckUser,
    ) { }

    async execute() {
        try {
            const users: AutoCheckUser[] = await this.iCheckUser.check()
            const usersPhotos = users.map((item) => ({
                photo: item.photo,
                name: item.name
            }));
            return usersPhotos;
        } catch (error) {
            throw new Error('Erro interno do servidor')
        }
    }

}

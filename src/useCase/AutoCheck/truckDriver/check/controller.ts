import { Request, Response } from 'express';
import { CheckUserUseCase } from './useCase';
import * as faceapi from 'face-api.js';
import path from 'path'
export class CheckTruckDriverIdentifyController {
    constructor(private readonly service: CheckUserUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { photo } = req.body;
           
            const identifyUser = await this.service.execute(photo)
            res.status(200).json({ identifyUser });
        } catch (error: unknown) {
            let errorMessage = "Falha ao criar o motorista do caminhão";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            res.status(400).json({ error: errorMessage });
        }
    }
}

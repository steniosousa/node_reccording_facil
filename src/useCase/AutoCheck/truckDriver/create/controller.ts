import { Request, Response } from 'express';
import { TruckDriverUseCase } from './useCase';

export class CreateTruckDriverController {
    constructor(private readonly service: TruckDriverUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { name, plate, photo, descriptor } = req.body;
            console.log(req.body)
            if (!name || !plate || !photo || !descriptor) {
                throw new Error('Envie todos os dados necessários');
            }

            const iTruckDriverUseCase = await this.service.execute({
                name, plate, photo, descritor: descriptor
            });

            res.status(200).json('iTruckDriverUseCase');
        } catch (error: unknown) {
            let errorMessage = "Falha ao criar o motorista do caminhão";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            res.status(400).json({ error: errorMessage });
        }
    }
}

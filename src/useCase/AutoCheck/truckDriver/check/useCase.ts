import * as faceapi from 'face-api.js';
import path from 'path'
import { createCanvas, Canvas, Image } from 'canvas';
import { CheckUser } from '../../../../respositories/contracts/AutoCheck/checkUser';
import { AutoCheckUser } from '../../../../entities/AutoCheckUser';
export class CheckUserUseCase {
    constructor(
        private iCheckUser: CheckUser,
    ) { }

    async execute(photo: string) {

        async function loadModels() {
            const modelPath = path.join(__dirname, './models');
            await faceapi.nets.tinyFaceDetector.loadFromDisk(modelPath);
            await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
            await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
        }
        faceapi.env.monkeyPatch({ Canvas, Image });
        await loadModels()
        try {
            const users = await this.iCheckUser.check()

            const imageBuffer = await this.base64ToBuffer(photo);
            const img = new Image();
            img.src = imageBuffer;


            const canvasTradution: any = createCanvas(img.width, img.height);
            const ctx = canvasTradution.getContext('2d');
            ctx.drawImage(img, 0, 0);


            const detections = await faceapi.detectAllFaces(canvasTradution, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptors();


            const labeledDescriptors = await this.createLabeledDescriptors(users);
            const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
            const results: any = detections.map(d => faceMatcher.findBestMatch(d.descriptor));

            return results[0]._label;
        } catch (error) {
            return 'Erro interno do servidor';
        }
    }

    async createLabeledDescriptors(users: AutoCheckUser[]) {
        const labeledDescriptors = [];

        for (const user of users) {
            const imageBuffer = await this.base64ToBuffer(user.photo);
            const img = new Image();
            img.src = imageBuffer;

            const canvas: any = createCanvas(img.width, img.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const detections = await faceapi.detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptors();


            if (detections.length > 0) {
                const [descriptor] = detections.map(d => d.descriptor);
                if (descriptor) {
                    labeledDescriptors.push(new faceapi.LabeledFaceDescriptors(user.name, [descriptor]));
                }
            }

        }

        return labeledDescriptors;
    }

    async base64ToBuffer(base64: string) {
        const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
        return Buffer.from(base64Data, 'base64');
    }
}

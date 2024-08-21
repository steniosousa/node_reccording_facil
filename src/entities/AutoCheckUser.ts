import { v4 as uuidv4 } from 'uuid';


export class AutoCheckUser {
    public readonly id?: string;
    public name: string = '';
    public plate: string = '';
    public photo?: string = '';
    public descritor?: string;
    constructor(props: AutoCheckUser, id?: string) {
        Object.assign(this, props);
        if (!id) {
            this.id = uuidv4();
        }
    }
}
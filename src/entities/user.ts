import { v4 as uuidv4 } from 'uuid';
export class User {
    public readonly id?: string;
    public name: string = '';
    public password: string = '';
    public email: string = '';
    public phone: string = '';


    constructor(props: User, id?: string) {
        Object.assign(this, props);
        if (!id) {
            this.id = uuidv4();
        }
    }
}
export const clients = []
export class Client{
    constructor({name, pass}){
        this.id = Date.now(),
        this.name = name,
        this.pass = pass
    }
}
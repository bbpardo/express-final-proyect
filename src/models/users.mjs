export const users = []
export class User{
    constructor({name, pass}){
        this.id = Date.now(),
        this.name = name,
        this.pass = pass
    }
}
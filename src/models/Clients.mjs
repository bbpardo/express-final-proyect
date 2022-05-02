export class Client{
    constructor({name, dni, phone, address, cp}){
        this.id = Date.now(),
        this.name = name,
        this.dni = dni,
        this.phone = phone,
        this.address = address,
        this.cp = cp
    }
}
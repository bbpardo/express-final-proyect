export const articles = []
export class Article{
    constructor({description, name, price}){
        this.id = Date.now(),
        this.name= name,
        this.description = description,
        this.price = price
    }
}
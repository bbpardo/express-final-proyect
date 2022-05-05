export class Article{
    constructor({name, description, photo, stock, price }){
        this.id = uuidv4(),
        this.name= name,
        this.description = description,
        this.stock = stock,
        this.photo = photo,
        this.price = price
    };
}
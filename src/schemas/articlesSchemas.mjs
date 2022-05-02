export const ArticlesSchema = {
    $id: "/user",
    type: "object",
    properties: {
        name:{
            description: "Name of the article",
            type: "string"
        },
        description: {
            description: "Description of the article",
            type: "string"
        },
        stock: {
            description: "Stock of the article",
            type: "number"
        },
        photo: {
            description: "Link photo of the article",
            type: "string"
        },
        price: {
            description: "Price of the article",
            type: "number"
        },
    },
    additionalProperties: false
}

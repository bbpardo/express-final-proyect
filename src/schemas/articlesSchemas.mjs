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
        price: {
            description: "Prices of the article",
            type: "number"
        },
    },
    additionalProperties: false
}

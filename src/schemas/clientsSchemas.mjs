export const clientSchema = {
    $id: "/user",
    type: "object",
    properties: {
        id:{
            description: "Unique id",
            type: "integer"
        },
        name: {
            description: "Client unique name",
            type: "string"
        },
        dni: {
            description: "Client secret",
            type: "string"
        },
        phone: {
            description: "Client secret",
            type: "string"
        },
        address: {
            description: "Client secret",
            type: "string"
        },
        cp: {
            description: "Client secret",
            type: "string"
        },
    },
    additionalProperties: false
}
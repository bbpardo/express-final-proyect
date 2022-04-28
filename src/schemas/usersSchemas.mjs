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
        pass: {
            description: "Client secret",
            type: "string"
        },
    },
    additionalProperties: false
}
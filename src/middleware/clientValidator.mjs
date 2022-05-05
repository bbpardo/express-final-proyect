import { validate } from "jsonschema";

import {clientSchema } from "../schemas/clientsSchemas.mjs";

export function validateClientJSON ( request, response, next) {
    try {
        const validation = validate(request.body, clientSchema);
        if (validation.valid) {
            next();
        } else {
            response.status(400);
            response.send("Invalid client data provided");
            console.error("Invalid client data provided");
        };
    } catch (err) {
        throw "Error validating data";
    };
};

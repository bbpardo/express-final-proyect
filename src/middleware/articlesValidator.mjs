import { validate } from "jsonschema";

import { ArticlesSchema } from "../schemas/articlesSchemas.mjs";

export function validateArticleJSON ( request, response, next) {
    try {
        const validation = validate(request.body, ArticlesSchema)
        if (validation.valid) {
            next();
        } else {
            response.status(400);
            response.send("Invalid article data provided");
            console.error("Invalid article data provided");
        }
    } catch (err) {
        throw "Error validating data"
    }
}

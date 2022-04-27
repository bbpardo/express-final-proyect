export function requestLog ( request, response, next ) {
    next();
    const { url, method, body } = request
    console.log( method, url, body );
}
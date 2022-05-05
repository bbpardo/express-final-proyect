import { deleteIt, findIt, getIt, insertIt, sqlCallback, updateArticle } from "./dbcontrollers.mjs";

export function getArticlesController(request,response){
    try {
        const keys = "id, name, description, stock, photo, price";
        getIt(keys, "articles", (error, data)=>{
            if ( error ) {
                console.error(error);
                response.status(500);
                response.send("Database error.");
                return
            };
            if ( data ){
                const json = JSON.stringify(data);
                response.send(json);
                return
            };
        });
    } catch (err) {
        response.status(500);
        console.log(err);
        response.send(err);
        return
    }
}

export function postArticleController(request, response) {
    try {
        const {name, description, photo, stock, price} = request.body;
        if ( !name || !description || !photo || !price ) {
            response.status(400);
            response.send("Algun campo esta vacio");
            return
        }
        findIt("articles", "name", name, (error, data)=>{
            if (error) {
                console.error(error);
                throw error;
            }
            if ( data ) {
                response.status(401);
                response.send("El articulo ya existe");
                return
            } else {
                insertIt(request.body,"articles",sqlCallback);
                response.send("Articulo registrado correctamente");
                return
            }
        });
    } catch (err) {
        response.status(500);
        response.send(err);
        return
    }
}

export function deleteArticleController (request, response) {
    const { id }= request.body
    findIt("articles", "id", id, (error, data)=>{
        if (error) {
            console.error(error);
            throw error;
        }
        if(data) {
            deleteIt("articles", "id", data.id);
            response.send("Articulo borrado correctamente");
        }else{
            response.send("Articulo no encontrado");
        }
    });
}

export function putArticleController (request, response) {
    const {id} = request.body;
    findIt("articles", "id", id, (error, data)=>{
        if (error) {
            console.error(error);
            throw error;
        }
        if(data) {
            updateArticle(data.id, request.body);
            response.send("Datos del articulo modificado");
        }else{
            response.send("Articulo no encontrado");
        }
    });
}
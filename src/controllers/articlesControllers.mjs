import { findArticle, insertArticle, sqlCallback } from "../db.mjs";
import { Article } from "../models/Articles.mjs";
import { findIt, getIt, insertIt } from "./dbcontrollers.mjs";

export function getArticlesController(request,response){
    try {
        const keys = "id, name, description, stock, photo, price"
        getIt(keys, "articles", (error, data)=>{
            if ( error ) {
                console.error(error);
                response.status(500)
                response.send("Database error.")
                return
            }
            if ( data ){
                const json = JSON.stringify(data)
                response.send(json);
                return
            }
        });
    } catch (err) {
        response.status(500)
        console.log(err)
        response.send(err)
        return
    }
}

export function postArticleController(request, response) {
    try {
        const { id, name, description, photo, stock, price  } = request.body;
        if ( ! name ) {
            response.status(400)
            response.send("Must provide 'userName' and 'password' JSON");
            return
        }
        findIt("articles","id",id,(error, data)=>{
            if (error) {
                console.error(error)
                throw error;
            }
            if ( data ) {
                response.status(401);
                response.send("El articulo ya existe");
                return
            } else {
                const newArticle = new Article({name, description, photo, stock, price });
                insertIt(newArticle,"articles",sqlCallback);
                response.send("Articulo registrado correctamente")
                return
            }
        });
    } catch (err) {
        response.status(500)
        response.send(err)
        return
    }
}

export function deleteArticleController (request, response) {
    const { name }= request.body
    findArticle(id, (error, data)=>{
        if (error) {
            console.error(error)
            throw error;
        }
        if(data) {
            deleteArticle(data.id)
            response.send("Articulo borrado correctamente")
        }else{
            response.send("Articulo no encontrado")
        }
    });
}

export function putArticleController (request, response) {
    const {name, description, photo, stock, price } = request.body;
    findClient(id, (error, data)=>{
        if (error) {
            console.error(error)
            throw error;
        }
        if(data) {
            const updateClients = {name, description, photo, stock, price};
            updateClient(data.id, updateClients);
            response.send("Datos del articulo modificado")
        }else{
            response.send("Articulo no encontrado")
        }
    });
}
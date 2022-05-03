import { Client } from "../models/Clients.mjs";
import {  deleteIt, findIt, getIt, insertIt, updateIt, sqlCallback  } from "./dbcontrollers.mjs";

export function getClientsController(request,response){
    try {
        const keys = "id, name, dni, phone, address, cp"
        getIt(keys, "clients", (error, data)=>{
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

export function postClientController(request, response) {
    try {
        const {name, dni, phone, address, cp } = request.body;
        if ( ! name || ! dni || ! address || ! cp ) {
            response.status(400)
            response.send("Must provide 'userName' and 'password' JSON");
            return
        }
        findIt("clients","dni",dni,(error, data)=>{
            if (error) {
                console.error(error)
                throw error;
            }
            if ( data ) {
                response.status(401);
                response.send("El cliente ya existe");
                return
            } else {
                const newclient = new Client({name, dni, phone, address, cp });
                insertIt(newclient,"clients",sqlCallback);
                response.send("cliente registrado correctamente")
                return
            }
        });
    } catch (err) {
        response.status(500)
        response.send(err)
        return
    }
}

export function deleteClientController (request, response) {
    const { dni }= request.body
    findIt("clients","dni",dni,(error, data)=>{
        if (error) {
            console.error(error)
            throw error;
        }
        if(data) {
            deleteIt(data.id)
            response.send("Cliente eliminado correctamente")
        }else{
            response.send("Cliente no encontrado")
        }
    });
}

export function putClientController (request, response) {
    const {dni } = request.body;
    findIt("clients","dni",dni,(error, data)=>{
        if (error) {
            console.error(error)
            throw error;
        }
        if(data) {
            updateIt("clients", data.id, request.body);
            response.send("Datos del cliente modificado")
        }else{
            response.send("Cliente no encontrado")
        }
    });
}
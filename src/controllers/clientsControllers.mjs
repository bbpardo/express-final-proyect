import {  deleteIt, findIt, getIt, insertIt, sqlCallback, updateClient  } from "./dbcontrollers.mjs";

export function getClientsController(request,response){
    try {
        const keys = "id, name, dni, phone, address, cp"
        getIt(keys, "clients", (error, data)=>{
            if ( error ) {
                console.error(error);
                response.status(500);
                response.send("Database error.");
                return
            }
            if ( data ){
                const json = JSON.stringify(data);
                response.send(json);
                return
            }
        });
    } catch (err) {
        response.status(500);
        console.log(err);
        response.send(err);
        return
    }
}

export function postClientController(request, response) {
    try {
        const {name, dni, phone, address, cp } = request.body;
        if ( !name || !dni || !phone || !address || !cp ) {
            response.status(400);
            response.send("Algun datos esta vacio");
            return
        }
        findIt("clients", "dni", dni, (error, data)=>{
            if (error) {
                console.error(error);
                throw error;
            }
            if ( data ) {
                response.status(401);
                response.send("El cliente ya existe");
                return
            } else {
                insertIt(request.body, "clients", sqlCallback);
                response.send("cliente registrado correctamente")
                return
            }
        });
    } catch (err) {
        response.status(500);
        response.send(err);
        return
    }
}

export function deleteClientController (request, response) {
    const { id }= request.body
    findIt("clients", "id", id, (error, data)=>{
        if (error) {
            console.error(error);
            throw error;
        }
        if(data) {
            deleteIt("clients", "id", data.id);
            response.send("Cliente eliminado correctamente");
        }else{
            response.send("Cliente no encontrado");
        }
    });
}

export function putClientController (request, response) {
    const {id } = request.body;
    findIt("clients", "id", id, (error, data)=>{
        if (error) {
            console.error(error);
            throw error;
        }
        if(data) {
            updateClient(data.id, request.body);
            response.send("Datos del cliente modificado");
        }else{
            response.send("Cliente no encontrado");
        }
    });
}
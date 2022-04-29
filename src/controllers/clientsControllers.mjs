import { Client, clients } from "../models/Clients.mjs";
import { findClient, deleteClient, updateClient , insertClient, sqlCallback, getClients} from "../db.mjs";

export function getClientsController(request,response){
    try {
        getClients((error, data)=>{
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
        response.send(err)
        return
    }
}

export function postClientController(request, response) {
    try {
        const { id, name, dni, phone, address, cp } = request.body;
        if ( ! name || ! dni || ! address || ! cp ) {
            response.status(400)
            response.send("Must provide 'userName' and 'password' JSON");
            return
        }
        findClient(dni, (error, data)=>{
            if (error) {
                console.error(error)
                throw error;
            }
            if ( data ) {
                response.status(401);
                response.send("Usuario ya registrado");
                return
            } else {
                const newClient = new Client({name, dni, phone, address, cp});
                insertClient(newClient,sqlCallback);
                response.send("Usuario creado correctamente")
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
    findClient(dni, (error, data)=>{
        if (error) {
            console.error(error)
            throw error;
        }
        if(data) {
            deleteClient(data.id)
            response.send("Usuario borrado correctamente")
        }else{
            response.send("Cliente no encontrado")
        }
    });
}

export function putClientController (request, response) {
    const { name, dni, phone, address, cp } = request.body;
    findClient(dni, (error, data)=>{
        if (error) {
            console.error(error)
            throw error;
        }
        if(data) {
            const updateClients = {name, dni, phone, address, cp};
            updateClient(data.id, updateClients);
            response.send("Usuario modificado")
        }else{
            response.send("Cliente no encontrado")
        }
    });
}
import { Client, clients } from "../models/Clients.mjs";

export function getClientsController(request,response){
    response.json(clients)
}

export function postClientController(request, response) {
    try {
        clients.push(new Client(request.body));
        response.sendStatus(201);
    } catch (err) {
        console.error(err);
        response.sendStatus(500);
    }
}

export function deleteClientController (request, response) {
    const updatedTask = request.body;
    const oldTaskIdx = clients.findIndex(
        item => item.id === updatedTask.id
    )
    clients.splice(oldTaskIdx,1);
    response.sendStatus(200)
}

export function putClientController (request, response) {
    const updatedTask = request.body;
    const oldTaskIdx = clients.findIndex(
        item => item.id === updatedTask.id
    )
    clients[oldTaskIdx] = updatedTask;
    response.sendStatus(200);
}
import { User , users } from "../models/users.mjs";

export function getUsersController(request,response){
    response.json(users)
}

export function postUserController(request, response) {
    try {
        users.push(new User(request.body));
        response.sendStatus(201);
    } catch (err) {
        console.error(err);
        response.sendStatus(500);
    }
}

export function deleteUserController (request, response) {
    const updatedTask = request.body;
    const oldTaskIdx = users.findIndex(
        item => item.id === updatedTask.id
    )
    users.splice(oldTaskIdx,1);
    response.sendStatus(200)
}

export function putUserController (request, response) {
    const updatedTask = request.body;
    const oldTaskIdx = users.findIndex(
        item => item.id === updatedTask.id
    )
    users[oldTaskIdx] = updatedTask;
    response.sendStatus(200);
}
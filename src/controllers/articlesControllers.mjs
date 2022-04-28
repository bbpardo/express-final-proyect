import { articles, Article } from "../models/Articles.mjs";
export function getArticlesController(request,response){
    response.json(articles)
}

export function postArticleController(request, response) {
    try {
        articles.push(new Article(request.body));
        response.sendStatus(201);
    } catch (err) {
        console.error(err);
        response.sendStatus(500);
    }
}

export function deleteArticleController (request, response) {
    const updatedTask = request.body;
    const oldTaskIdx = articles.findIndex(
        item => item.id === updatedTask.id
    )
    articles.splice(oldTaskIdx,1);
    response.sendStatus(200)
}

export function putArticleController (request, response) {
    const updatedTask = request.body;
    const oldTaskIdx = articles.findIndex(
        item => item.id === updatedTask.id
    )
    articles[oldTaskIdx] = updatedTask;
    response.sendStatus(200);
}
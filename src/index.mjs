import express from "express";

import { requestLog } from "./middleware/requestLog.mjs";
import { getClientsController, postClientController, deleteClientController, putClientController } from "./controllers/clientsControllers.mjs";
import { postArticleController, getArticlesController,putArticleController,deleteArticleController } from "./controllers/articlesControllers.mjs";
import { validateClientJSON } from "./middleware/clientValidator.mjs";
import { validateArticleJSON } from "./middleware/articlesValidator.mjs";


const PATH_PREFIX = "/api/v0.0"
const app = express();
const port = 3000;

try{
    const jsonParser = express.json();
    app.use(requestLog);
//clients
    app.get(PATH_PREFIX+"/Clients/",getClientsController);
    app.post(PATH_PREFIX+"/Clients/",jsonParser, validateClientJSON , postClientController);
    app.delete(PATH_PREFIX+"/Clients/",jsonParser,validateClientJSON, deleteClientController);
    app.put(PATH_PREFIX+"/Clients/", jsonParser,validateClientJSON, putClientController);
//Articles
    app.get(PATH_PREFIX+"/articles/",getArticlesController)
    app.post(PATH_PREFIX+"/articles/",jsonParser,validateArticleJSON, postArticleController);
    app.delete(PATH_PREFIX+"/articles/",jsonParser,validateArticleJSON, deleteArticleController);
    app.put(PATH_PREFIX+"/articles/", jsonParser,validateArticleJSON, putArticleController);
//Port
    app.listen(port,()=>{
        console.log("Express running...")});
}catch(err){
    console.log("Algo va mal")
}
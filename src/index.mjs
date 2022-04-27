import express from "express";

import { requestLog } from "./middleware/requestLog.mjs";
import { getUsersController, postUserController, deleteUserController, putUserController } from "./controllers/usersControllers.mjs";


const PATH_PREFIX = "/api/v0.0"
const app = express();
const port = 3000;

try{
    const jsonParser = express.json();
    app.use(requestLog);

    app.get(PATH_PREFIX+"/users/",getUsersController);
    app.post(PATH_PREFIX+"/users/",jsonParser, postUserController);
    app.delete(PATH_PREFIX+"/users/",jsonParser, deleteUserController);
    app.put(PATH_PREFIX+"/users/", jsonParser, putUserController)
    
    app.listen(port,()=>{
        console.log("Express running...")});
}catch(err){
    console.log("Algo va mal")
}
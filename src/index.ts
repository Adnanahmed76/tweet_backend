import express, { Express } from "express";
import http from "http";
import cors from 'cors';

import bodyParser from "body-parser";
import router from "./routes/routes";
import dotenv from "dotenv"
import mongoose from "mongoose";
import { error } from "console";
const app: Express = express();
const server = http.createServer(app);

// Express configuration
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("PORT", 3000);
app.set("BASE_URL", "localhost");
dotenv.config()
// Define the route
app.use("/api/v1", router);

//MONGO connection

const mongoURI=process.env.MONGO_DB_URI

if(!mongoURI){
    console.error("Mongo db is not defined")
    process.exit(1);
}
mongoose.connect(mongoURI,{}).then(()=>
{
console.log("Mongo db is connected");
}
)
.catch((error)=>{
    console.log(error);
})

// Start the server
try {
    const port: number = app.get("PORT");
    const baseURL: string = app.get("BASE_URL");
    
    server.listen(port, (): void => {
        console.log(`Server is listening on http://${baseURL}:${port}`);
    });
} catch (e) {
    console.log(e);
}

export default server;

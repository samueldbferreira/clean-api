import { Express } from "express";
import { bodyParser, cors } from "@/main/middlewares";

const setupMiddlewares = (app: Express) => {
	app.use(cors);
	app.use(bodyParser);
};

export default setupMiddlewares;

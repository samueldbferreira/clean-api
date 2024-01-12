import { Express, Router } from "express";
import { registerRoute } from "@/main/routes";

const setupRoutes = (app: Express) => {
	const router = Router();

	registerRoute(router);

	app.use("/api", router);
};

export default setupRoutes;

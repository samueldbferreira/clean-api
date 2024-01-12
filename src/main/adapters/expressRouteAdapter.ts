import { RegisterUserOnMailingListController } from "@/controllers";
import { IHttpRequest } from "@/controllers/ports";
import { Request, Response } from "express";

function expressRouteAdapter(controller: RegisterUserOnMailingListController) {
	return async (req: Request, res: Response) => {
		const httpRequest: IHttpRequest = {
			body: req.body,
		};

		const httpResponse = await controller.handle(httpRequest);

		return res.status(httpResponse.statusCode).json(httpResponse.body);
	};
}

export { expressRouteAdapter };

import { IHttpResponse } from "@/controllers/ports";

export function created(bodyContent: any): IHttpResponse {
	return {
		statusCode: 201,
		body: bodyContent,
	};
}

export function badRequest(bodyContent: any): IHttpResponse {
	return {
		statusCode: 400,
		body: bodyContent,
	};
}

export function internalServerError(bodyContent: any): IHttpResponse {
	return {
		statusCode: 500,
		body: bodyContent,
	};
}

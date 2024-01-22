import { IHttpResponse } from "@/controllers/ports";

export function ok(bodyContent: any): IHttpResponse {
	return {
		statusCode: 200,
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

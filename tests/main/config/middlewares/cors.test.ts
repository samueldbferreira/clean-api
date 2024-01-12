import app from "@/main/config/app";
import request from "supertest";

describe("CORS middleware", () => {
	test("Should enable CORS", async () => {
		app.get("/cors", (_, res) => {
			res.send();
		});

		const response = await request(app).get("/cors");

		expect(response.headers["access-control-allow-origin"]).toEqual("*");
		expect(response.headers["access-control-allow-headers"]).toEqual("*");
		expect(response.headers["access-control-allow-methods"]).toEqual("*");
	});
});

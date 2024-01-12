import request from "supertest";
import app from "@/main/config/app";

describe("Body parser middleware", () => {
	test("Should parse a json request body", async () => {
		app.post("/json-body-parser", (req, res) => {
			res.send(req.body);
		});

		const response = await request(app).post("/json-body-parser").send({
			name: "Any Name",
			email: "any@mail.com",
		});

		expect(response.body.name).toEqual("Any Name");
		expect(response.body.email).toEqual("any@mail.com");
	});
});

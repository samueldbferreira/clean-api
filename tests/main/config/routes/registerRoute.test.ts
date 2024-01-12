import { MongoHelper } from "@/external/repositories/mongodb/helper";
import app from "@/main/config/app";
import request from "supertest";

describe("Register user on mailing list route", () => {
	beforeAll(async () => {
		await MongoHelper.connect(process.env.MONGO_URL || "");
	});

	beforeEach(async () => {
		await MongoHelper.clearCollection("users");
	});

	afterAll(async () => {
		await MongoHelper.disconnect();
	});

	test("should return 201 after the register", async () => {
		const response = await request(app).post("/api/register").send({
			name: "Any Name",
			email: "any@mail.com",
		});

		expect(response.statusCode).toEqual(201);
	});
});

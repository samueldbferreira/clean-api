import { UserRepositoryMongo } from "@/external/repositories/mongodb";
import { MongoHelper } from "@/external/repositories/mongodb/helper";

describe("MongoDB user repository", () => {
	beforeAll(async () => {
		await MongoHelper.connect(process.env.MONGO_URL || "");
	});

	beforeEach(async () => {
		await MongoHelper.clearCollection("users");
	});

	afterAll(async () => {
		await MongoHelper.disconnect();
	});

	test("should return null if the user is not found", async () => {
		const sut = new UserRepositoryMongo();
		const user = await sut.findUserByEmail("any@mail.com");
		expect(user).toBeNull;
	});

	test("should return the user if it is found in the repository", async () => {
		const sut = new UserRepositoryMongo();
		await sut.add({
			name: "Second User",
			email: "second_user@mail.com",
		});
		const returnedUser = await sut.findUserByEmail("second_user@mail.com");

		expect(returnedUser?.name).toEqual("Second User");
	});

	test("should return all users in the repository", async () => {
		const sut = new UserRepositoryMongo();

		await sut.add({
			name: "First User",
			email: "first_user@mail.com",
		});

		await sut.add({
			name: "Second User",
			email: "second_user@mail.com",
		});

		const returnedUsers = await sut.findAll();

		expect(returnedUsers.length).toEqual(2);
	});
});

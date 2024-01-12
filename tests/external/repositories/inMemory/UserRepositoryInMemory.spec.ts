import { UserRepositoryInMemory } from "@tests/external/repositories/inMemory";

describe("In memory user repository", () => {
	test("should return null if the user is not found", async () => {
		const sut = new UserRepositoryInMemory();
		const user = await sut.findUserByEmail("any@mail.com");
		expect(user).toBeNull;
	});

	test("should return the user if it is found in the repository", async () => {
		const sut = new UserRepositoryInMemory();
		await sut.add({
			name: "Second User",
			email: "second_user@mail.com",
		});
		const returnedUser = await sut.findUserByEmail("second_user@mail.com");
		expect(returnedUser?.name).toEqual("Second User");
	});

	test("should return all users in the repository", async () => {
		const sut = new UserRepositoryInMemory([
			{
				name: "First User",
				email: "first_user@mail.com",
			},
			{
				name: "Second User",
				email: "second_user@mail.com",
			},
		]);
		const returnedUsers = await sut.findAll();
		expect(returnedUsers.length).toEqual(2);
	});
});

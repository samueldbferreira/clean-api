import { User } from "@/entities";

describe("User domain entity", () => {
	test("should not create a user with invalid email address", () => {
		const invalidEmail = "invalid_email";
		const error = User.create({ name: "any_name", email: invalidEmail })
			.value as Error;
		expect(error.name).toEqual("InvalidEmailError");
	});

	test("should not create a user with invalid name (length less than 2 chars)", () => {
		const invalidName = "o              ";
		const error = User.create({
			name: invalidName,
			email: "any@mail.com",
		}).value as Error;
		expect(error.name).toEqual("InvalidNameError");
	});

	test("should not create a user with invalid name (length greater than 256 chars)", () => {
		const invalidName = "a".repeat(257);
		const error = User.create({
			name: invalidName,
			email: "any@mail.com",
		}).value as Error;
		expect(error.name).toEqual("InvalidNameError");
	});

	test("should create a user with valid data", () => {
		const validName = "any name";
		const validEmail = "any@mail.com";

		const user = User.create({ name: validName, email: validEmail })
			.value as User;

		expect(user.name.value).toEqual(validName);
		expect(user.email.value).toEqual(validEmail);
	});
});

import { IUserRepository } from "@/usecases/ports";
import { UserRepositoryInMemory } from "@tests/external/repositories/inMemory";
import { RegisterUserOnMailingList } from "@/usecases";

describe("Register user on mailing list use case", () => {
	let userRepository: IUserRepository;
	let usecase: RegisterUserOnMailingList;

	beforeEach(() => {
		userRepository = new UserRepositoryInMemory();
		usecase = new RegisterUserOnMailingList(userRepository);
	});

	test("should register a user to the mailing list", async () => {
		const name = "any_name";
		const email = "any@email.com";

		const response = (await usecase.execute({ name, email })).value;
		const user = await userRepository.findUserByEmail("any@email.com");

		expect(response.name).toEqual(user?.name);
		expect(user?.name).toEqual("any_name");
	});

	test("should not register a user with invalid name", async () => {
		const invalidName = "o                 ";
		const email = "any@mail.com";

		const response = (await usecase.execute({ name: invalidName, email }))
			.value as Error;
		const user = await userRepository.findUserByEmail("any@email.com");

		expect(response.name).toEqual("InvalidNameError");
		expect(user).toBeNull();
	});

	test("should not register a user with invalid email", async () => {
		const name = "any_name";
		const invalidEmail = "invalid-email";

		const response = (
			await usecase.execute({
				name,
				email: invalidEmail,
			})
		).value as Error;
		const user = await userRepository.findUserByEmail("invalid-email");

		expect(response.name).toEqual("InvalidEmailError");
		expect(user).toBeNull();
	});
});

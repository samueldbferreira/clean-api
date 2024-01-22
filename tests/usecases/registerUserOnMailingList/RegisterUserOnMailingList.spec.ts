import { IUserRepository } from "@/usecases/ports";
import { UserRepositoryInMemory } from "@tests/external/repositories/inMemory";
import { RegisterUserOnMailingList } from "@/usecases/registerUserOnMailingList";
import { User } from "@/entities";

describe("Register user on mailing list use case", () => {
	let userRepository: IUserRepository;
	let usecase: RegisterUserOnMailingList;

	beforeEach(() => {
		userRepository = new UserRepositoryInMemory();
		usecase = new RegisterUserOnMailingList(userRepository);
	});

	test("should register a user to the mailing list", async () => {
		const user = User.create({
			name: "any_name",
			email: "any@email.com",
		}).value as User;

		const response = await usecase.execute(user);
		const registeredUser = await userRepository.findUserByEmail(
			"any@email.com"
		);

		expect(response.name).toEqual(user?.name.value);
		expect(registeredUser?.name).toEqual("any_name");
	});
});

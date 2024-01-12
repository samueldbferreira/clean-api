import { IUserData, User } from "@/entities";
import { InvalidEmailError, InvalidNameError } from "@/entities/errors";
import { IUserRepository } from "@/usecases/ports";
import { Either, left, right } from "@/shared";

export class RegisterUserOnMailingList {
	private readonly userRepository: IUserRepository;

	constructor(userRepository: IUserRepository) {
		this.userRepository = userRepository;
	}

	public async execute(
		userData: IUserData
	): Promise<Either<InvalidNameError | InvalidEmailError, IUserData>> {
		const userOrError = User.create(userData);
		if (userOrError.isLeft()) {
			return left(userOrError.value);
		}

		if (
			(await this.userRepository.findUserByEmail(userData.email)) === null
		) {
			await this.userRepository.add(userData);
		}

		return right(userData);
	}
}

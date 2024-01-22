import { IUserData, User } from "@/entities";
import { IUserRepository } from "@/usecases/ports";

export class RegisterUserOnMailingList {
	private readonly userRepository: IUserRepository;

	constructor(userRepository: IUserRepository) {
		this.userRepository = userRepository;
	}

	public async execute(user: User): Promise<IUserData> {
		const userData: IUserData = {
			name: user.name.value,
			email: user.email.value,
		};

		if (
			(await this.userRepository.findUserByEmail(userData.email)) === null
		) {
			await this.userRepository.add(userData);
		}

		return userData;
	}
}

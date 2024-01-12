import { IUserData } from "@/entities";
import { IUserRepository } from "@/usecases/ports";

export class UserRepositoryInMemory implements IUserRepository {
	private readonly users: IUserData[];

	constructor(users?: IUserData[]) {
		this.users = users ? users : [];
	}

	async add(data: IUserData): Promise<void> {
		const userAlreadyExists = await this.findUserByEmail(data.email);
		if (userAlreadyExists) {
			return;
		}

		this.users.push(data);
	}

	async findUserByEmail(email: string): Promise<IUserData | null> {
		return this.users.find((u) => u.email === email) || null;
	}

	async findAll(): Promise<IUserData[]> {
		return this.users;
	}
}

import { IUserData } from "@/entities";
import { IUserRepository } from "@/usecases/ports";
import { MongoHelper } from "@/external/repositories/mongodb/helper";

export class UserRepositoryMongo implements IUserRepository {
	async add(data: IUserData): Promise<void> {
		const usersCollection = MongoHelper.getCollection<IUserData>("users");

		const userAlreadyExists = await this.findUserByEmail(data.email);
		if (userAlreadyExists) {
			return;
		}

		await usersCollection.insertOne({ ...data });
	}

	async findUserByEmail(email: string): Promise<IUserData | null> {
		const usersCollection = MongoHelper.getCollection<IUserData>("users");

		const userOrNull = await usersCollection.findOne({ email });

		return userOrNull;
	}

	async findAll(): Promise<IUserData[]> {
		const usersCollection = MongoHelper.getCollection<IUserData>("users");

		const users = await usersCollection.find({}).toArray();

		return users;
	}
}

import { IUserData } from "@/entities";

export interface IUserRepository {
	add(data: IUserData): Promise<void>;
	findUserByEmail(email: string): Promise<IUserData | null>;
	findAll(): Promise<IUserData[]>;
}

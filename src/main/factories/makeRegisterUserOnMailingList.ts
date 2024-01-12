import { RegisterUserOnMailingListController } from "@/controllers";
import { UserRepositoryMongo } from "@/external/repositories/mongodb";
import { RegisterUserOnMailingList } from "@/usecases";

const makeRegisterUserOnMailingList = () => {
	const userRepository = new UserRepositoryMongo();
	const useCase = new RegisterUserOnMailingList(userRepository);
	const controller = new RegisterUserOnMailingListController(useCase);

	return controller;
};

export { makeRegisterUserOnMailingList };

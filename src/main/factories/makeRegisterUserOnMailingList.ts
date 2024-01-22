import { RegisterUserOnMailingListController } from "@/controllers";
import { UserRepositoryMongo } from "@/external/repositories/mongodb";
import { RegisterAndEmailUser } from "@/usecases/registerAndEmailUser";
import { RegisterUserOnMailingList } from "@/usecases/registerUserOnMailingList";
import { SendEmail } from "@/usecases/sendEmail";
import setupEmailOptions from "../config/setupEmailOptions";
import { NodemailerService } from "@/external/services/nodemailer";

const makeRegisterUserOnMailingList = () => {
	const userRepository = new UserRepositoryMongo();
	const registerUserOnMailingList = new RegisterUserOnMailingList(
		userRepository
	);
	const mailerService = new NodemailerService();
	const sendEmail = new SendEmail(mailerService, setupEmailOptions());

	const useCase = new RegisterAndEmailUser(
		registerUserOnMailingList,
		sendEmail
	);
	const controller = new RegisterUserOnMailingListController(useCase);

	return controller;
};

export { makeRegisterUserOnMailingList };

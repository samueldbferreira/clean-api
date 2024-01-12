import { IHttpRequest, IHttpResponse } from "@/controllers/ports";
import { IUserData } from "@/entities";
import { badRequest, created, internalServerError } from "@/controllers/util";
import { InternalServerError, MissingParamError } from "@/controllers/errors";
import { IUseCase } from "@/usecases/ports";

export class RegisterUserOnMailingListController {
	private readonly registerUserOnMailingListUseCase: IUseCase;

	constructor(usecase: IUseCase) {
		this.registerUserOnMailingListUseCase = usecase;
	}

	public async handle(request: IHttpRequest): Promise<IHttpResponse> {
		try {
			if (!request.body.name || !request.body.email) {
				const missingParams = [];
				if (!request.body.name) missingParams.push("name");
				if (!request.body.email) missingParams.push("email");

				return badRequest(new MissingParamError(missingParams));
			}

			const userData: IUserData = request.body;

			const useCaseResponse =
				await this.registerUserOnMailingListUseCase.execute(userData);
			if (useCaseResponse.isLeft()) {
				return badRequest(useCaseResponse.value);
			}

			return created(useCaseResponse.value);
		} catch (e) {
			return internalServerError(new InternalServerError());
		}
	}
}

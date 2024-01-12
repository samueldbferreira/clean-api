import { IUseCase } from "@/usecases/ports";

export class ErrorThrowerUseCase implements IUseCase {
	constructor(repository: any) {}

	execute(request: any): Promise<any> {
		throw new Error("Unexpected Error!");
	}
}

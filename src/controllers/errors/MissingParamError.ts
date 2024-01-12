export class MissingParamError extends Error {
	public readonly name = "MissingParamError";

	constructor(missingParams: string[]) {
		super(`The following params are missing: [${missingParams}].`);
	}
}

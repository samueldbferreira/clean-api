export class InternalServerError extends Error {
	public readonly name = "InternalServerError";

	constructor() {
		super("A server error has occurred.");
	}
}

export class MailerServiceError extends Error {
	public readonly name = "MailerServiceError";

	constructor() {
		super("Mailer service error.");
	}
}

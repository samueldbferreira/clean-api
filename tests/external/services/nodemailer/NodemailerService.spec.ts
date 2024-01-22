import { NodemailerService } from "@/external/services/nodemailer";
import { IEmailOptions } from "@/usecases/ports";

const nodemailer = require("nodemailer");
jest.mock("nodemailer");
const sendMailMock = jest.fn().mockImplementation(() => "ok");
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

describe("Nodemailer service", () => {
	const emailOptions: IEmailOptions = {
		host: "TEST",
		port: 867,
		username: "USER TEST",
		password: "PASS TEST",
		from: "FROM TEST",
		to: "TO TEST",
		subject: "SUBJECT TEST",
		text: "TEXT TEST",
		html: "HTML TEST",
		attachments: [],
	};

	test("should return the email options when it's sent", async () => {
		const nodemailerService = new NodemailerService();

		const responseValue = (await nodemailerService.send(emailOptions))
			.value;

		expect(responseValue).toEqual({
			host: "TEST",
			port: 867,
			from: "FROM TEST",
			to: "TO TEST",
			subject: "SUBJECT TEST",
			text: "TEXT TEST",
			html: "HTML TEST",
			attachments: [],
		});
	});

	test("should return error when the email is not sent", async () => {
		const nodemailerService = new NodemailerService();

		sendMailMock.mockImplementationOnce(() => {
			throw new Error();
		});

		const responseValue = (await nodemailerService.send(emailOptions))
			.value as Error;

		expect(responseValue.name).toEqual("MailerServiceError");
	});
});

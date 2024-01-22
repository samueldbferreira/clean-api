import { IDefaultEmailOptions } from "@/usecases/ports";

export default function setupEmailOptions(): IDefaultEmailOptions {
	return {
		host: process.env.MAIL_HOST || "",
		port: Number(process.env.MAIL_PORT),
		username: process.env.MAIL_USER || "",
		password: process.env.PASSWORD || "",
		from: process.env.FROM || "",
	};
}

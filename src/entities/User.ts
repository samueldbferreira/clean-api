import { IUserData, Name, Email } from "@/entities";
import { Either, left, right } from "@/shared";
import { InvalidEmailError, InvalidNameError } from "@/entities/errors";

export class User {
	public readonly name: Name;
	public readonly email: Email;

	private constructor(name: Name, email: Email) {
		this.name = name;
		this.email = email;
	}

	static create(
		userData: IUserData
	): Either<InvalidNameError | InvalidEmailError, User> {
		const nameOrError = Name.create(userData.name);
		if (nameOrError.isLeft()) {
			return left(nameOrError.value);
		}

		const emailOrError = Email.create(userData.email);
		if (emailOrError.isLeft()) {
			return left(emailOrError.value);
		}

		const name = nameOrError.value;
		const email = emailOrError.value;

		return right(new User(name, email));
	}
}

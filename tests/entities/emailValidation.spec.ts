import { Email } from "@/entities";

describe("Email validation", () => {
	test("should accept a valid email", () => {
		const email = "valid@mail.com";
		expect(Email.validate(email)).toBeTruthy();
	});

	test("should not accept empty strings", () => {
		const email = "";
		expect(Email.validate(email)).toBeFalsy();
	});

	test("should not accept strings greater than 320 chars", () => {
		const email =
			"l".repeat(64) + "@" + "d".repeat(128) + "." + "d".repeat(127);
		expect(Email.validate(email)).toBeFalsy();
	});

	test("should not accept a email with empty local part", () => {
		const email = "@mail.com";
		expect(Email.validate(email)).toBeFalsy();
	});

	test("should not accept a email with its local part greater than 64", () => {
		const email = "a".repeat(65) + "@mail.com";
		expect(Email.validate(email)).toBeFalsy();
	});

	test("should not accept a email with empty domain", () => {
		const email = "local@";
		expect(Email.validate(email)).toBeFalsy();
	});

	test("should not accept a email with its domain part greater than 255", () => {
		const email = "local@" + "d".repeat(128) + "." + "d".repeat(127);
		expect(Email.validate(email)).toBeFalsy();
	});

	test("should not accept a domain with a part greater than 63", () => {
		const email = "any@" + "d".repeat(64) + ".com";
		expect(Email.validate(email)).toBeFalsy();
	});

	test("should not accept local part with invalid char", () => {
		const email = "any email@mail.com";
		expect(Email.validate(email)).toBeFalsy();
	});

	test("should not accept local part with two dots", () => {
		const email = "any..email@mail.com";
		expect(Email.validate(email)).toBeFalsy();
	});

	test("should not accept local part with ending dot", () => {
		const email = "any.@mail.com";
		expect(Email.validate(email)).toBeFalsy();
	});

	test("should not accept email without an at-sign", () => {
		const email = "anymail.com";
		expect(Email.validate(email)).toBeFalsy();
	});
});

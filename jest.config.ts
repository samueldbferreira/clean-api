import type { Config } from "jest";

const config: Config = {
	bail: 1,
	preset: "@shelf/jest-mongodb",
	roots: ["<rootDir>/tests"],
	transform: {
		".+\\.ts$": "ts-jest",
	},
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@tests/(.*)$": "<rootDir>/tests/$1",
	},
};

export default config;

import { Router } from "express";
import { expressRouteAdapter } from "@/main/adapters";
import { makeRegisterUserOnMailingList } from "@/main/factories";

const registerRoute = (router: Router) => {
	router.post(
		"/register",
		expressRouteAdapter(makeRegisterUserOnMailingList())
	);
};

export { registerRoute };

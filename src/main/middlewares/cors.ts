import { Request, Response, NextFunction } from "express";

const cors = (_: Request, res: Response, next: NextFunction) => {
	res.setHeader("access-control-allow-origin", "*");
	res.setHeader("access-control-allow-headers", "*");
	res.setHeader("access-control-allow-methods", "*");
	return next();
};

export { cors };

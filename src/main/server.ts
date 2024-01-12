import "module-alias/register";
import app from "@/main/config/app";
import { MongoHelper } from "@/external/repositories/mongodb/helper";

MongoHelper.connect("mongodb://localhost:27017")
	.then(() => {
		app.listen(5000, () =>
			console.log("Server running at http://localhost/5000")
		);
	})
	.catch(console.error);

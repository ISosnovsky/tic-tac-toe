import * as Router from "koa-router";

import AuthControllerFactory from "../controllers/AuthController";
import AuthServiceFactory from "../services/AuthService";
import AuthRepositoryFactory from "../repositories/AuthRepository";

const AuthRepository = new AuthRepositoryFactory();
const AuthService = new AuthServiceFactory(AuthRepository);
const AuthController = new AuthControllerFactory(AuthService);

class ApiRouter {
	constructor(public router: Router) {
		this.router = router;
	}

	post() {
		this.router.post("/join", async ctx => {
			await AuthController.join(ctx);
		});
	}
}

export default ApiRouter;

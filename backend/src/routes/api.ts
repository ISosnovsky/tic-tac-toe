import * as Router from "koa-router";
import { Middleware } from "koa-compose";
import { Context } from "koa";

class ApiRouter {
	constructor(public router: Router) {
		this.router = router;
	}

	post(path: string, middleware: Middleware<Context>): void {
		this.router.post(`v1/api/${path}`, middleware);
	}
}

export default ApiRouter;

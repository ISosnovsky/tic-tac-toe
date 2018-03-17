import * as Router from "koa-router";
import * as passport from "koa-passport";

class PassportRouter {
	constructor(public router: Router) {
		this.router = router;
	}

	askUserCredentials(
		link: string,
		strategyName: string,
		userData?: { scope: string | Array<string> }
	) {
		this.authenticate(link, strategyName, userData);
	}

	getAccessToken(callbackLink: string, strategyName: string, settings?: any) {
		this.authenticate(callbackLink, strategyName, settings);
	}
	authenticate(link: string, strategyName: string, settings?: any) {
		this.router.get(
			link,
			passport.authenticate(strategyName, Object.assign({}, settings))
		);
	}
}

export default PassportRouter;

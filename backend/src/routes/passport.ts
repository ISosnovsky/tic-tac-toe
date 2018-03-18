import * as Router from "koa-router";
import * as passport from "passport";

class PassportRouter {
	constructor(
		public router: Router,
		public settings: {
			authLink: string;
			authCallbackLink: string;
			strategyName: string;
			userCredentional?: passport.AuthenticateOptions;
			options?: passport.AuthenticateOptions;
		}
	) {}

	private askUserCredentials(): void {
		this.router.get(
			this.settings.authLink,
			passport.authenticate(
				this.settings.strategyName,
				Object.assign({}, this.settings.userCredentional)
			)
		);
	}

	private getAccessToken(): void {
		this.router.get(
			this.settings.authCallbackLink,
			passport.authenticate(
				this.settings.strategyName,
				Object.assign({}, this.settings.options)
			)
		);
	}

	public init(): void {
		this.askUserCredentials();
		this.getAccessToken();
	}
}

export default PassportRouter;

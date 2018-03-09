import { Context } from "koa";

class AuthController {
	constructor(public authService: any) {}
	join(ctx: Context) {
		const {
			name: userName,
			password: userPassword,
			email: userEmail
		}: {
			name: string;
			password: string;
			email: string;
		} = ctx.request.body;

		this.authService.join({ userName, userPassword, userEmail });
	}
}

export default AuthController;

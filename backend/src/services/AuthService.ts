import { Context } from "koa";
import User from "../models/User";

class AuthService {
	constructor(authRepository: AuthRepository) {}
	login({
		userName,
		userPassword
	}: {
		userName: string;
		userPassword: string;
	}) {
		console.log(userName, userPassword);
	}
}
export default AuthService;

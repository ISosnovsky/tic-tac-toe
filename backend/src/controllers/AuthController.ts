import { Context } from "koa";
import AuthService from "../services/AuthService";

class AuthController {
  constructor(public authService: AuthService) {}
  login(ctx: Context) {
    const userName: string = ctx.request.body.name;
    const userPassword = <string>ctx.request.body.password;
    this.authService.login({ userName, userPassword });
  }
}

export default AuthController;

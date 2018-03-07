import { Context } from "koa";

class AuthService {
  constructor(authRepository: any) {}
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

class AuthService {
  registeredUser: any;
  constructor(public authRepository: any) {}
  async join({
    userName,
    userPassword,
    userEmail
  }: {
    userName: string;
    userPassword: string;
    userEmail: string;
  }) {
    try {
      this.registeredUser = await this.authRepository.createUser({
        userName,
        userPassword,
        userEmail
      });
    } catch (e) {
      console.log("опачки нихуя се", e);
    }

    const user = await this.authRepository.checkIfUserExistsByEmail(userEmail);
    if (user) {
      console.log("а такой уже есть!!!!!!!!!!!", user);
      return;
    }
  }
}
export default AuthService;

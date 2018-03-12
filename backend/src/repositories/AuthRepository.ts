import User from "./../db/models/User";

class AuthRepository {
  createUser({
    userName,
    userPassword,
    userEmail
  }: {
    userName: string;
    userPassword: string;
    userEmail: string;
  }) {
    console.log(userName, userPassword, userEmail);
    return User.create({
      name: userName,
      password: userPassword,
      email: userEmail
    });
  }

  checkIfUserExistsByEmail(userEmail: string) {
    return User.findOne({ where: { email: userEmail } });
  }
}

export default AuthRepository;

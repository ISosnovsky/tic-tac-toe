"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./../db/models/User");
class AuthRepository {
    createUser({ userName, userPassword, userEmail }) {
        return User_1.default.create({
            name: userName,
            password: userPassword,
            email: userEmail
        });
    }
    checkIfExistsUserByEmail(userEmail) {
        return User_1.default.findOne({ where: { email: userEmail } });
    }
}
exports.default = AuthRepository;
//# sourceMappingURL=AuthRepository.js.map
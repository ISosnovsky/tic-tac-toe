"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    join({ userName, userPassword, userEmail }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authRepository.checkIfUserExistsByEmail(userEmail);
                if (user) {
                    console.log("а такой уже есть!!!!!!!!!!!", user);
                    return;
                }
                this.registeredUser = yield this.authRepository.createUser({
                    userName,
                    userPassword,
                    userEmail
                });
            }
            catch (e) {
                console.log("опачки нихуя се", e);
            }
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=AuthService.js.map
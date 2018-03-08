"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(ctx) {
        const userName = ctx.request.body.name;
        const userPassword = ctx.request.body.password;
        this.authService.login({ userName, userPassword });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map
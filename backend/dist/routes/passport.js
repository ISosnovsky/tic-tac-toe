"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("koa-passport");
class PassportRouterTemplate {
    constructor(router) {
        this.router = router;
        this.router = router;
    }
    askUserCredentials(link, strategyName, userData) {
        this.authenticate(link, strategyName, userData);
    }
    getAccessToken(callbackLink, strategyName, settings) {
        this.authenticate(callbackLink, strategyName, settings);
    }
    authenticate(link, strategyName, settings) {
        this.router.get(link, passport.authenticate(strategyName, Object.assign({}, settings)));
    }
}
class VkPassportRouter extends PassportRouterTemplate {
    constructor(router) {
        super(router);
        this.router = router;
    }
}
exports.default = PassportRouter;
//# sourceMappingURL=passport.js.map
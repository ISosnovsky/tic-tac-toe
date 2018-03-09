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
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const db_1 = require("./db");
const config_1 = require("./config");
const AuthController_1 = require("./controllers/AuthController");
const AuthService_1 = require("./services/AuthService");
const AuthRepository_1 = require("./repositories/AuthRepository");
const AuthRepository = new AuthRepository_1.default();
const AuthService = new AuthService_1.default(AuthRepository);
const AuthController = new AuthController_1.default(AuthService);
const app = new Koa();
const router = new Router();
db_1.default.sync({ force: true });
app.use(bodyParser());
router.post("/join", (ctx) => __awaiter(this, void 0, void 0, function* () {
    AuthController.join(ctx);
}));
app.use(router.routes());
app.listen(config_1.default.port, () => {
    console.log(`Server running on ${config_1.default.port}`);
});
//# sourceMappingURL=server.js.map
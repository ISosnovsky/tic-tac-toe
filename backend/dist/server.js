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
const bodyParser = require("koa-bodyparser");
const passport = require("koa-passport");
const session = require("koa-session");
const db_1 = require("./db");
const config_1 = require("./config");
const routes_1 = require("./routes");
require("./passport");
const app = new Koa();
db_1.default.sync({ force: true });
app.keys = ["asdasd"];
app
    .use(bodyParser())
    .use(session(app))
    .use(passport.initialize())
    .use(passport.session())
    .use(routes_1.default.routes());
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    if (ctx.isAuthenticated()) {
        ctx.type = "html";
        ctx.body = { success: true };
        yield next();
    }
    else {
        ctx.body = { success: false };
        ctx.throw(401);
    }
}));
app.listen(config_1.default.port, () => {
    console.log(`Server running on ${config_1.default.port}`);
});
//# sourceMappingURL=server.js.map
import * as Koa from "koa";
import * as Router from "koa-router";

const app = new Koa();
const router = new Router();

router.get("/*", async ctx => {
  ctx.body = "Hello2 2";
});

app.use(router.routes());

app.listen(3000);

console.log("Server running on  3000");

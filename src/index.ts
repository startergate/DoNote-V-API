import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";

import apiRouter from "./api";

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.use("/api", apiRouter.routes());

router.get("/", (ctx) => {
  ctx.status = 200;
});

router.all("*", (ctx) => {
  ctx.status = 400;
});

app.use(router.routes());
app.use(router.allowedMethods());

export default app;

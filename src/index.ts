import Koa from "koa";
import * as Router from "koa-router";
import bodyParser from "koa-bodyparser";

import apiRouter from "./api";

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 4000;

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

import * as Router from "koa-router";
import { loginFlow } from "./auth.controller";

const router = new Router();

router.get("/catch", loginFlow);

export default router;

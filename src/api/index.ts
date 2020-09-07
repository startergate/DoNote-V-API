import * as Router from "koa-router";

import v1 from "./v1";
import v2 from "./v2";

const router = new Router();

router.use("/v1", v1.routes());
router.use("/v2", v2.routes());

export default router;

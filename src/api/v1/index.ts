import * as Router from "koa-router";

import {
  findCategory,
  createCategory,
  findCategorizedNote,
  findAllNote,
  createNote,
  findSharedNote,
  findNote,
  updateNote,
  deleteNote,
} from "./api.v1.controller";
import { sidAuthMiddleware } from "../../modules/donoteMiddleware";

const router = new Router();

router.use(sidAuthMiddleware);

router.get("/category", findCategory);
router.post("/category", createCategory);
router.get("/category/:cateid", findCategorizedNote);

router.get("/note", findAllNote);
router.post("/note", createNote);
router.get("/note/shared", findSharedNote);
router.get("/note/:noteid", findNote);
router.put("/note/:noteid", updateNote);
router.delete("/note/:noteid", deleteNote);

export default router;

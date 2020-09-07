import * as Router from "koa-router";

import { graphqlEndpoint } from "./api.v2.controller";

import { sidAuthMiddleware } from "../../modules/donoteMiddleware";

const router = new Router();

router.use(sidAuthMiddleware);

// GraphQL
router.all("/graphql", graphqlEndpoint);

export default router;

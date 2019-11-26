const Router = require('koa-router');
const apiV2Ctrl = require('./api.v2.controller');
const dmw = require("modules/donoteMiddleware");

const router = new Router();

router.use(dmw.sidAuthMiddleware);

// GraphQL
router.all('/graphql', apiV2Ctrl.graphqlEndpoint);

module.exports = router;
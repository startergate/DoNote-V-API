const Router = require('koa-router');

const v1Router = require('./v1');
const v2Router = require('./v2');

const router = new Router();

router.use('/v1', v1Router.routes());
router.use('/v2', v2Router.routes());

module.exports = router;
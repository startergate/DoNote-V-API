const Router = require('koa-router');

const v1Router = require('./v1');

const router = new Router();

router.use('/v1', v1Router.routes());

module.exports = router;
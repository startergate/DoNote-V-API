const Router = require('koa-router');
const authCtrl = require('auth.controller');

const router = new Router();

router.get('/catch', authCtrl.loginFlow);

module.exports = router;
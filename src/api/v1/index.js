const Router = require('koa-router');
const apiCtrl = require('./api.v1.controller');

const router = new Router();

router.get('/:sessid/:noteid', apiCtrl.get);

module.exports = router;
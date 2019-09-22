const Router = require('koa-router');
const apiCtrl = require('./api.v1.controller');

const router = new Router();

router.get('/:sessid/:noteid', apiCtrl.get);

router.post('/:sessid/:noteid', apiCtrl.post);
router.put('/:sessid/:noteid', apiCtrl.put);
router.delete('/:sessid/:noteid', apiCtrl.delete);

module.exports = router;
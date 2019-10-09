const Router = require('koa-router');
const apiV1Ctrl = require('./api.v1.controller');

const router = new Router();

router.use(apiV1Ctrl.sidAuthMiddleware);

router.get('/category', apiV1Ctrl.findCategory);
router.post('/category', apiV1Ctrl.createCategory);
router.get('/category/:cateid', apiV1Ctrl.findCategorizedNote);

router.get('/note', apiV1Ctrl.findAllNote);
router.post('/note', apiV1Ctrl.createNote);
router.get('/note/:noteid', apiV1Ctrl.findNote);
router.put('/note/:noteid', apiV1Ctrl.updateNote);
router.delete('/note/:noteid', apiV1Ctrl.deleteNote);

module.exports = router;
const Koa = require('koa');
const Router = require('koa-router');
const apiRouter = require('./api');

const app = new Koa();
const router = new Router();

router.use('/api/v1', apiRouter);

app.listen(4000, () => {
    console.log(4000);
});
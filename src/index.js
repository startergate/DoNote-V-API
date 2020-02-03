const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const apiRouter = require('./api');

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 4000;

app.use(bodyParser());

router.use('/api', apiRouter.routes());

router.get('/', ctx => {
  ctx.status = 400;
});

router.all('*', ctx => {
  //
  ctx.status = 400;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(port);
});
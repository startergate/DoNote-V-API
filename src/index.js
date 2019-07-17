const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.listen(4000, () => {
    console.log(4000)
});
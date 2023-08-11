const Router = require('koa-router');
const router = new Router();
const { db } = require('../config/firebase')
const { currentUser, login} = require('./firebaseUser')
const bookDbName = 'mammoth-user'

// Route to get all books
router.post('/user/register', async (ctx) => {
  const { app } = ctx
  let params = ctx.request.body
  let name = params.name
  let password = params.password
  let res = await login(name, password)
  ctx.body = res.data
});

router.post('/user/login', async (ctx, next) => {
  const { app } = ctx
  let params = ctx.request.body
  let name = params.name
  let password = params.password
  let res = await login(name, password)
  if (res.status == "-1") {
    ctx.status = 500;
  } else {
    ctx.status = 201;
  }
  ctx.body = res.data;
});

module.exports = router;
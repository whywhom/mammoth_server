const Router = require('koa-router');
const router = new Router();
const {currentUser} = require("../service/home")
const bookDbName = 'mammoth-user'

router.get('/admin', async (ctx) => {
  let user = currentUser()
  if (user == null) {
    ctx.status = 500;
  } else {
    if (user.email == "whywhom@163.com") {
      ctx.status = 201;
    } else {
      ctx.status = 500;
    }
    ctx.body = user;
  }
});

module.exports = router;
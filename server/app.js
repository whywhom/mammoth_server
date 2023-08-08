const Koa = require('koa')
const router = require('./src/router/router')
const middleware = require('./src/middleware')

const bookRoutes = require('./src/book/bookRoutes');
const userRoutes = require('./src/user/userRoutes');
const adminRoutes = require('./src/admin/adminRoutes');

const app = new Koa()

middleware(app)
router(app)
app.use(bookRoutes.routes());
app.use(userRoutes.routes());
app.use(adminRoutes.routes());

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
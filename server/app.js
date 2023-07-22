const Koa = require('koa')
const router = require('./src/router/router')
const bookRoutes = require('./src/book/bookRoutes');
const middleware = require('./src/middleware')

const app = new Koa()

middleware(app)
router(app)
app.use(bookRoutes.routes());

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
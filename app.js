const Koa = require('koa')
const router = require('./src/router')
const middleware = require('./src/middleware')

const app = new Koa()
middleware(app)
router(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
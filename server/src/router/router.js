const router = require('koa-router')()
// const bookRoutes = require('../book/bookRoutes');
// const userRoutes = require('../user/userRoutes');
// const adminRoutes = require('../admin/adminRoutes');

module.exports = (app) => {
  router.get( '/', app.controller.home.index )
  
  router.get('/home', app.controller.home.home)
  
  router.get('/home/:id/:name', app.controller.home.homeParams)

  // router.get( '/admin', app.controller.admin.index )

  // router.post( '/admin/login', app.controller.admin.login )

 

  app.use(router.routes())
     .use(router.allowedMethods())
}
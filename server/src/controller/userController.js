const {readAll, currentUser} = require("../service/home")
module.exports = {
  register: async(ctx, next) => {
    const { app } = ctx
    let params = ctx.request.body
    let name = params.name
    let password = params.password
    let res = await app.service.home.register(name,password)

    if(res.status == "-1"){
      await ctx.render("home/login", res.data)
    }else{
      ctx.state.title = "个人中心"
      await ctx.render("home/success", res.data)
    }
  },

  login: async(ctx, next) => {
    const { app } = ctx
    let params = ctx.request.body
    let email = params.email
    let password = params.password
    let res = await app.service.home.register(email,password)
    if(res.status == "-1"){
      ctx.status = 500;
    }else{
      ctx.status = 201;
    }
    ctx.body = res.data;
  },
}
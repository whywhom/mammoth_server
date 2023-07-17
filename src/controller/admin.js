const { currentUser } = require("../service/admin")
module.exports = {
  index: async (ctx, next) => {
    let user = currentUser()
    if (user == null) {
      await ctx.render('admin/login', { title: "欢迎Boss Login" })
    } else {
      if (user.email == "whywhom@163.com") {
        await ctx.render('admin/index', { title: "欢迎Boss" })
      } else {
        await ctx.render('admin/login', { title: "欢迎Boss" })
      }
    }
  },

  login: async (ctx, next) => {
    const { app } = ctx
    let params = ctx.request.body
    let email = params.email
    let password = params.password
    let res = await app.service.admin.register(email,password)
    let user = res.data.user;
    if(user != null){
      if (user.email == "whywhom@163.com") {
        res = {
          status: 0,
          data: {
            title: "Admin中心",
            content: "欢迎进入个人中心",
          }
        }
      } else {
        res = {
          status: -1,
          data: {
            title: '登录失败',
            content: "请输入正确的账号信息"
          }
        }
      }
      if (res.status == "-1") {
        ctx.render('admin/index', res.data);
        return;
      } else {
        ctx.state.title = "个人中心"
        await ctx.render("home/success", res.data)
      }
    }
    
  },
}
const {readAll, currentUser} = require("../service/home")
module.exports = {

  index: async(ctx, next) => {
    let user = currentUser()
    let jsonData
    try {
      const snapshot = await readAll()
      const books = [];

      snapshot.forEach(doc => {
        const bookData = doc.data();
        const book = {
          id: doc.id,
          ...bookData
        };
        books.push(book);
      });
      
      // jsonData = JSON.stringify(books)
      jsonData = {"books": books}
    } catch (error) {
      console.error('Error retrieving books:', error);
      ctx.status = 500;
      ctx.body = { message: 'Error retrieving books' };
    }
    if(user == null){
      await ctx.render('home/login', {
        btnName: 'GoGoGo'
      })
    } else {
      await ctx.render("home/index", JSON.stringify(jsonData))
    }
  },

  home: async(ctx, next) => {
    console.log(ctx.request.query)
    console.log(ctx.request.querystring)
    ctx.response.body = '<h1>HOME page</h1>'
  },

  homeParams: async(ctx, next) => {
    console.log(ctx.params)
    ctx.response.body = '<h1>HOME page /:id/:name</h1>'
  },

  login: async(ctx, next) => {
    await ctx.render('home/login', {
      btnName: 'GoGoGo'
    })
  },

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
}
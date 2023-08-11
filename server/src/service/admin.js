const {auth, signInWithEmailAndPassword} = require("../config/firebase")

module.exports = {
  currentUser: function() { 
    return auth.currentUser
  },
  register: async function(name, pwd) {
    let data
    await signInWithEmailAndPassword(auth, name, pwd)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      data = {
        status: 0,
        data: {
          title: "个人中心",
          content: "欢迎进入个人中心",
          user: user
        }
      }
   
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      data = {
        status: -1,
        data: {
          title: '登录失败',
          content: "请输入正确的账号信息"
        },
        errorCode: errorCode,
        errorMessage: errorMessage
      }
    });  
    return new Promise(function(resolve, reject) {
      resolve(data);
    })
  }
}
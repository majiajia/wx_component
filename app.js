//app.js
const request = require("utils/requests.js")
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    const that = this;
    
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
   //获取id
  getSession: function (info) {
    var that = this;
    if (this.globalData.session) {
      typeof info == "function" && info(this.globalData.session)
    } else {
      this.getUserInfo(function(info1){
        wx.login({
          success: function(code){
            request.getSession({
                code:code.code,
                avatar: info1.avatarUrl,
               nickname: info1.nickName
              },
                function (res) {
                  console.log(res);
                  that.globalData.session = res.data.data;
                  typeof info == "function" && info(that.globalData.session)
                });
          }
        })
         
      })
    }
  },
  globalData:{
    userInfo:null,
    session: null,
    code:null,
    category_id:"",
    category_name:"",
    refreshView:true,
    refreshType:true
  }
})
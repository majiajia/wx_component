//logs.js
var util = require('../../utils/util.js')
var app=getApp()
Page({
  data: {
   avatarUrl:"",
   nickName:"",
  },
  onLoad: function () {
    
    var that=this;
   app.getUserInfo(function(data){
     console.log(data)
     that.setData({
       avatarUrl:data.avatarUrl,
       nickName:data.nickName
     });
   });
  },

})

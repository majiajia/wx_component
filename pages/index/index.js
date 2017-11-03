//index.js
//获取应用实例
var app = getApp()
const request = require("../../utils/requests.js")
Page({
  data: {
    datas:[],
    start: 0,
    end:0,
    hasMore: true,
    userInfo: {},
    isRefresh:true,
    noData:{world:"点击右下角，创建你的第一篇日记",
            isHidle:true}
  },
  onLoad: function (options) {
      app.globalData.refreshView=true;
  },
  
  onShow:function(){
   if(app.globalData.refreshView){
   this.data.hasMore = true;
    this.data.datas = [];
    this.getData(1, 0);
    app.globalData.refreshView=false;
   }
  },
  getData: function (type, id) {
    var that = this;

    var hasMore = that.data.hasMore;
    if (!hasMore) {
      return;
    }
    app.getSession(function (userInfo) {
      request.get_user_riji_list({
        user_id: userInfo.user_id,
        sign: userInfo.sign,
        per_page: "8",
        start_seq:"0",
        end_seq:id,
        keyword: "",
        category_id: "",
        action_update_his: type
      }, function (datainfo) {
        wx.stopPullDownRefresh();
        that.data.isRefresh=true;
        console.log(datainfo.data.data);
        if("1"==datainfo.data.status){
           app.globalData.session=null;
           that.getData(1, 0);
            return;
          }
        
        let newList = datainfo.data.data;

        if(type==1&&newList.length == 0){
           that.data.noData.isHidle=false;
           that.setData({
             noData: that.data.noData,
             datas:[]
           });
           return;
        }else{
           that.data.noData.isHidle=true;
           that.setData({
             noData: that.data.noData
           });
        }
        if (newList.length == 0) {
            that.data.hasMore = false;
            console.log("没有更多数据");
          }else{
             newList = that.data.datas.concat(newList);
            console.log("0" + newList[newList.length - 1].id);
            that.data.start = newList[newList.length - 1].id;
             that.setData({
                datas: newList,
              });
          }
      })

    });
  },
  addNewriji: function () {
    wx.navigateTo({
      url: '/pages/web_page/web_page'
    })
  },
  //加载更多
  loadMore: function () {
    if(this.data.isRefresh){
      this.data.isRefresh=false;
    this.getData(2, this.data.start);
    }
  },
  viewTrip: function (e) {
    var ds = e.currentTarget.dataset.id;
    console.log(ds);
    wx.navigateTo({
      url: '/pages/looknew/looknew?id='+ds,
    })
  },
   onPullDownRefresh: function() {
    this.data.hasMore = true;
    this.data.datas = [];
    this.getData(1, 0);
  },
   onShareAppMessage: function () {
    return {
      title: '爱记日记',
      path: '/page/index/index'
    }
    },
   redirect_to_webpage:function() {
     wx.navigateTo({
       url: '/pages/web_page/web_page',
     })
   }
})

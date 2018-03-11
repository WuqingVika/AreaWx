Page({
  data: {
    list:[]
  },
  onLoad: function () {
    
  },
  onShow: function(){
      var that=this;
      wx.request({
        url: 'http://127.0.0.1:8082/wxmybatis/superadmin/listarea',
        data: {},//代表传入参数
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
            var list=res.data.list;
            if(list==null){
                var toastText="获取数据失败:"+res.data.errorMsg;
                wx.showToast({
                    title:toastText,
                    icon:'',
                    duration:2000
                });
            }else{
                that.setData({
                    list:list
                })
            }
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  }
})
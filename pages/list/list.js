Page({
  data: {
    list: []
  },
  onLoad: function () {

  },
  deleteArea: function (e) {//删除区域信息
    var that = this;
    var dataset = e.target.dataset;
    var areaId = dataset.areaid;
    wx.showModal({
      title: "删除提示",
      content: "确认要删除区域[" + dataset.areaname + "]吗?",
      cancelColor: "#333",
      confirmColor: "#405f80",
      showCancel: "true",
      cancelText: "取消",
      confirmText: "确认",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'http://localhost:8082/wxmybatis/superadmin/removearea',
            data: { "areaId": areaId },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
              // success
              var result = res.data.success;
              var toastText = "删除成功!";
              if (result != true) {
                toastText = "删除失败!";
              } else {
                that.data.list.splice(dataset.index);
                that.setData({
                  list: that.data.list
                });
                //删除提示
                wx.showToast({
                  title: toastText,
                  icon: '',
                  duration: 2000
                });
              }
            }
          })
        }
      }

    })
  },
  onShow: function () {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8082/wxmybatis/superadmin/listarea',
      data: {},//代表传入参数
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        var list = res.data.list;
        if (list == null) {
          var toastText = "获取数据失败:" + res.data.errorMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          that.setData({
            list: list
          })
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

})
var app = getApp();

Page({
    data: {
        ID: '',
        data: {
            pic: '',
            description: ''
        }
    },
    onLoad: function(event){
        this.setData({
            ID: event.id
        })
    },
    onReady: function(){
        var that = this;
        //获取详情信息
        let params = {
            id: this.data.ID
        }
        swan.request({
			url: app.globalData.API('/activity/activity/detail'),
			data: app.globalData.signData(params),
			dataType: 'json',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function(response){
                that.setData({
                    data: response['data']['results']
                })
			}
		});
    }
})
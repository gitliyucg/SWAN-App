var app = getApp();

Page({
    data: {
        imgs: [
            {},
            {},
			{},
        ]
    },
    onReady: function(event){
        let that = this;
        // 请求内容接口
		swan.request({
			url: app.globalData.API('/activity/activity'),
			data: app.globalData.signData(),
			dataType: 'json',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function(response){
				let arr = [];
				for(var i in response['data']['results']){
					arr.push(response['data']['results'][i])
				}
				that.setData({
					imgs: arr
				})
			}
		});
    }
})
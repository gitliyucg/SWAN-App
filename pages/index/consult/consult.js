var app = getApp();

Page({
    data:{
        imgs: []
    },
    onReady: function(){
        let that = this;
        // 获取课程展示的图片
		let num = {num: 6};
		swan.request({
			url: app.globalData.API('/activity/activity'),
			data: Object.assign(num, app.globalData.signData()),
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
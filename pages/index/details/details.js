var app = getApp();

Page({
    data: {
        imgs: [
            {pic: '', id: ''},
            {pic: '', id: ''},
            {pic: '', id: ''},
            {pic: '', id: ''}
        ],
        content: '123456'
    },
    onReady: function(){
        let that = this;
        // 请求banner接口
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
					imgs: arr,
                    // 修改content.的默认值
                    content: arr[1]['title']
				})
			}
		});
    },
    getDetail: function(event){
        let data = this.data;
        data.content = data.imgs[event['detail']['current']]['title'];
        this.setData({
            content: data.content
        })
    }
})
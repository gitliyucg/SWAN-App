var app = getApp();

Page({
    data: {
        list: [
            {}
        ]
    },
    onReady: function(){
        let that = this;
        // list
		swan.request({
			url: app.globalData.API('/activity/activity_link'),
			data: app.globalData.signData(),
			dataType: 'json',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function(response){
                let newList = [];
				for(var i in response['data']['results']){
                    newList.push(response['data']['results'][i])
                }
                that.setData({
                    list: newList
                })
			}
		});
    },
    toList: function(event){
        if(event.target.dataset.type == 1){
            swan.navigateTo({
                url: '/pages/index/consult/consult'
            });
        }else{
            swan.navigateTo({
                url: '/pages/index/other/other'
            });
        }
    }
})
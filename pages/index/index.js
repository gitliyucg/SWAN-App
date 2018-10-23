var app = getApp();

Page({
	data: {
		logo: '',
		imgs: [],
		kecheng: []
	},
	onReady: function(){

		var that = this;

		// 获取头部Logo
		swan.request({
			url: app.globalData.API('/system/GetLogo'),
			data: app.globalData.signData(),
			dataType: 'json',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function(response){
				that.setData({
					logo: response['data']['results']
				})
			}
		});

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
					imgs: arr
				})
			}
		});

		// 获取课程展示的图片
		let num = {num: 3};
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
					kecheng: arr
				})
			}
		});
		
	},
	toDetails: function(event){
		swan.navigateTo({
			url: '/pages/index/details/details'
		})
	},
	bannerList: function(event){
		swan.navigateTo({
			url: '/pages/index/bannerlist/bannerlist?id=' + event.target.dataset.id
		});
	},
	toVideo: function(){
		swan.navigateTo({
			url: '/pages/index/video/video'
		});
	},
	toList: function(event){
		// if(event.target.dataset.item == '0'){
		// 	swan.navigateTo({
		// 		url: '/pages/index/consult/consult'
		// 	});
		// }else{
		// 	swan.navigateTo({
		// 		url: '/pages/index/other/other'
		// 	});
		// }
	}
})


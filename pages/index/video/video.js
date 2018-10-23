var app = getApp();

Page({
    data: {
		scrollHeight: 0,
		data: [],
		page: 1,
		isShow: false,
		video: ''
    },
    onLoad: function(){

		let that = this;

		swan.getSystemInfo({
			success: (response) => {
				that.setData({
					scrollHeight: response['windowHeight']
				})
			}
		});
    },
	onReady: function(){
		this.getList(1);
	},
	addList: function(event){
		let that = this;
		let page  = this.data.page += 1
		this.setData({
			page: page
		})
		this.getList(page);
	},
	getList: function(pages){
		swan.showLoading({
			title: '正在加载',
			mask: true
		});
		// 请求分页接口
		let page = {page: pages};
		let that = this;
		swan.request({
			url: app.globalData.API('/activity/activity/lists'),
			data: Object.assign(page, app.globalData.signData()),
			dataType: 'json',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function(response){
				let arr = [];
				let data = that.data.data;
				for(var i in response['data']['results']['results']){
					arr.push(response['data']['results']['results'][i])
				}
				if(arr.length == 0){
					swan.showToast({
						title: '只有这么多了！',
						icon: 'none',
						duration: 2000,
					});
				}else{
					for(var i = 0; i < arr.length; i += 2){
						let arrList = [];
						arrList.push(arr.slice(i,i+2));
						data.push(arrList);
					}
					that.setData({
						data: data
					})
				}
				setTimeout(function(){
					swan.hideLoading();
				}, 1000)
			}
		});
	},
	playVideo: function(event){
		// 播放视频
		this.setData({
			isShow: true,
			video: event.target.dataset.video
		})
	},
	closeVideo: function(){
		// 关闭视频
		this.setData({
			isShow: false,
			video: ''
		})
	}
})
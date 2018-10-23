var app = getApp();

Page({
    data: {
        user: {
            pic: '',
            username: '',
            age: 0,
            height: 0,
            weight: 0,
            gender: 0,
            birthday: 0,
            shoe_size: '',
            group: '',
            linkman: '0',
            mobile: '',
            match: ''
        },
        id: 0,
        gender: 0,
        birthday: 0,
        sex: ['女', '男'],
    },
    onReady: function(){
        this.getUser()
    },
    chooseImages:function(event){
        let that = this;
        let params = {
            is_thumb: 1,
            thumb_width: 300,
            thumb_height: 300,
            is_resize: 1,
            resize_width: 300,
            resize_height: 300
        }
        swan.chooseImage({
            count: 1,
            success: (response) => {
                swan.showLoading({
                    title: '正在上传',
                    mask: 'true'
                });
                swan.uploadFile({
                    url: app.globalData.upload, // 开发者服务器 url
                    filePath: response.tempFilePaths[0],
                    name: 'img',
                    header: {
                        'content-type': 'multipart/form-data'
                    },
                    formData: Object.assign(params, app.globalData.signData()),
                    success: function (response) {
                        let params = {
                            pic_json: JSON.stringify(response['data'])
                        }
                        swan.request({
                            url: app.globalData.API('/users/Users/updatePic'),
                            data: app.globalData.signData(params),
                            dataType: 'json',
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function(response){
                                if(response['data']['err_no'] == 0){
                                    swan.showToast({
                                        title: '修改成功',
                                        icon: 'success',
                                        duration: 2000,
                                    });
                                    let user = that.data.user;
                                    user['pic'] = response['data']['results']['pic'];
                                    that.setData({
                                        user: user
                                    })
                                }
                            }
                        })
                    }
                });
            }
        });
    },
    sexChange: function(event){
        let newUser = this.data.user;
        newUser['gender'] = event['detail']['value']
        this.setData({
            gender: event['detail']['value'],
            user: newUser
        })
    },
    dataChange: function(event){
        let newUser = this.data.user;
        newUser['birthday'] = event['detail']['value']
        this.setData({
            birthday: event['detail']['value'],
            user: newUser
        })
    },
    phone: function(event){
        if(!(/^1[34578]\d{9}$/.test(event['detail']['value']))){ 
            swan.showToast({
                title: '请输入正确的手机',
                icon: 'none',
                duration: 4000
            })
        } 
    },
    setText: function(event){
        let value = event['detail']['value'];
        let text = this.data['user'];
        text[event.target.dataset.text] = value;
        this.setData({
            user: text
        })
    },
    baocun: function(){
        let that = this;
        let params = {
            id: this.data.id
        }
        let user = this.data.user
        swan.request({
            url: app.globalData.API('/users/Users/update'),
            data: Object.assign(user, app.globalData.signData(params)),
            dataType: 'json',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(response){
                if(response['data']['err_no'] == 0){
                    swan.showToast({
						title: '保存成功',
						icon: 'success',
						duration: 2000,
					});
                }
            }
        });
    },
    getUser: function(){
        let that = this;
        swan.getUserInfo({
            success: function (response) {
                let params = {
                    userInfoJson: JSON.stringify(response['userInfo'])
                }
                swan.request({
                    url: app.globalData.API('/users/Users/detail'),
                    data: app.globalData.signData(params),
                    dataType: 'json',
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function(response){
                        let newUser = that.data.user;
                        let arr = Object.keys(newUser);
                        for(var i = 0; i < arr.length; i++){
                            newUser[arr[i]] = response['data']['results'][arr[i]]
                        }
                        that.setData({
                            user: newUser,
                            gender: newUser['gender'],
                            birthday: newUser['birthday'],
                            id: response['data']['results']['id']
                        })
                    }
                });
            }
        })
    }
})
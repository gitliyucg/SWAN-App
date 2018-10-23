/* globals Page */
import md5 from './utils/md5.js';

App({
    onLaunch(event) {

    },

    onShow(event) {
        var that = this;
        swan.login({
            success: function (response) {
                let params = {
                    code: response.code
                }
                swan.request({
                    url: that.globalData.API('/baidu/Login/getSessionKeyByCode'),
                    data: that.globalData.signData(params),
                    dataType: 'json',
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function(response){
                    }
                });
            }
        });

        // 检查用户登录态
        swan.checkSession({
            success: function (res) {
                // console.log('登录态有效');
                swan.getUserInfo({
                    success: function (response) {
                        // 注册用户
                        let params = {
                            userInfoJson: JSON.stringify(response['userInfo'])
                        }
                        swan.request({
                            url: that.globalData.API('/users/Users/reg'),
                            data: that.globalData.signData(params),
                            dataType: 'json',
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function(response){
                            }
                        });
                        // 获取登录token
                        swan.request({
                            url: that.globalData.API('/users/Users/login'),
                            data: that.globalData.signData(params),
                            dataType: 'json',
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function(response){
                                that.globalData.token = response['data']['results']['token'];
                            }
                        });
                    }
                })
            },
            fail: function (err) {
                // console.log('登录态无效');
            }
        });

    },

    globalData: {
    	userInfo: {},
        apiurl: 'http://baopin.wanmpserver.com:8264/',
        token: 'null',
        upload: 'http://baopin.wanmpserver.com:8265/upload',
        sign: {},
        skey: 'TczAFlw@SyhYEyh*',
        API: function(url, version = 'v1'){
            return this.apiurl + version + url
        },
        signData: function(...options){
            this.sign = {};
            if(options.length != 0){
                let ag = Object.keys(options[0]);
                for(var i = 0; i < ag.length; i++){
                    this.sign[ag[i]] = options[0][ag[i]]
                }
            }
            let time = Date.parse(new Date());
            this.sign['cip'] = 1921686108;
            this.sign['key'] = 'baiduQERTLE7tn';
            this.sign['loc'] = '0,0';
            this.sign['token'] = this.token;
            this.sign['sv'] = '0.1';
            this.sign['sys'] = 'swan';
            this.sign['timestamp'] = time;
            // 对象按字母表排序
            let arrMap = Object.keys(this.sign).sort();
            var newObj = {};
            let signMap = [];
            for(var i = 0; i < arrMap.length; i++){
                newObj[arrMap[i]] = this.sign[arrMap[i]];
            }
            for(var i in newObj){
                signMap.push(newObj[i])
            }
            // md5加密
            var sign = '';
            for(var i = 0; i < signMap.length; i++){
                sign += signMap[i];
                this.sign['sign'] = md5(md5(sign) + this.skey);
            }
            return this.sign;
        }
    }
});

/*
* @Author: Administrator
* @Date:   2017-06-07 08:23:41
* @Last Modified by:   halfgod
* @Last Modified time: 2017-06-19 15:35:04
*/

'use strict';
var Hogan = require('hogan.js');
var conf = {
	serverHost : ''
};
var _mm = {
	//请求
	request : function(param){
		 var _this = this;
		$.ajax({
			type : param.method || 'get',
			url  : param.url    || '',
			dataType : param.type || 'json',
			data : param.data || '',
			success :function(res){
				//请求成功
				if(0 === res.status){
					typeof param.success === 'function' && param.success(res.data,res.msg);
					
				}
				else if(10 === res.status){
					_this.doLogin();

                 //data error
				}else if(1 === res.status){
					console.log(res);
					typeof param.error === 'function' && param.error(res.msg);

				}

			},
			error : function(err){
				//console.log(err);
				typeof param.error === 'function' && param.error(err.statusText);

			}

		});
	},
	//获取服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	//获取url参数
	getUrlParam : function(name){
        var reg = new RegExp('(^|&)'+ name +  '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        console.log(result);
        return result ? decodeURIComponent(result[2]) : null ;
	},
	//渲染html模版
	renderHtml : function(htmlTemplate,data){
		var 	template 	= Hogan.compile(htmlTemplate),
		      	result		= template.render(data);
		return result;

	},
	//成功提示
	successTips : function(msg){
		alert(msg || '操作成功!');
	},
	//失败提示
	errorTips : function(msg){
		alert(msg || '发生了意想不到的事情!');
	},
	//表单的验证支持非空验证,手机邮箱
	validate : function(value,type){
		var value = $.trim(value);
		//非空
		if('require' === type){

			return !!value;

		}
		//手机号
		if('phone' === type){
			return /^1\d{10}$/.test(value);
		}
		//邮箱格式验证
		if('email' === type){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	//登入
	doLogin : function(){
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	goHome : function(){
		window.location.href = './index.html';
	}

};
module.exports = _mm;
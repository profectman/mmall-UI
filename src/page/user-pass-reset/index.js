/*
* @Author: Administrator
* @Date:   2017-06-11 12:51:48
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-11 14:15:00
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

var formError = {
      show : function(errMsg){
      	$('.error-item').show().find('.err-msg').text(errMsg);
      },
      hide : function(){
      	$('.error-item').hide().find('.err-msg').text('');
      }

};

var page = {
	data : {
		username : '',
		question : '',
		answer : '',
		token : '',
	},
	init :function(){
		this.onLoad();
		this.bindEvent();

	},
	onLoad : function(){
		this.loadStepUsername();
	},
	bindEvent:function(){
		var _this = this;
		//问题提示获取点击
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());
			if (username) {
				_user.getQuestion(username,function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();
				},function(errMsg){
					formError.show(errMsg);
				});
			}
			else{
				formError.show('请输入用户名');
			}
		});
		//回答点击
		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val());
			if (answer) {
				//检查秘密提示问题答案
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer   : answer
				},function(res){
					_this.data.answer = answer;
					_this.data.token = res;
					_this.loadStepPassword();
				},function(errMsg){
					formError.show(errMsg);
				});
			}
			else{
				formError.show('请输入密码提示问题答案');
			}
		});
		//新密码后的低矮你家
		$('#submit-password').click(function(){
			var password = $.trim($('#password').val());
			if (password && password.length >= 6) {
				//检查秘密提示问题答案
				_user.resetPassword({
					username : _this.data.username,
					passwordNew : password,
					forgetToken   : _this.data.token
				},function(res){
					window.location.href = './result.html?type=pass-reset';
				},function(errMsg){
					formError.show(errMsg);
				});
			}
			else{
				formError.show('请输入不少于6位的新密码');
			}
		});
		
	},
	//加载输入用户名的一步
	loadStepUsername : function(){
		$('.step-username').show();
	},
	loadStepQuestion : function(){
		formError.hide();
		//容器的切换
		$('.step-username').hide()
		.siblings('.step-question').show().find('.question').text(this.data.question);

	},
	loadStepPassword : function(){
		formError.hide();
		$('.step-question').hide()
		.siblings('.step-passwo').show();

	},
};

$(function(){
	page.init();
});
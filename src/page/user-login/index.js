/*
* @Author: Administrator
* @Date:   2017-06-06 16:06:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-10 15:29:29
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
	init :function(){
		this.bindEvent();

	},
	bindEvent:function(){
		var _this = this;
		$('#submit').click(function(){
			_this.submit();
		});
		//如果回车也提交
		$('.user-content').keyup(function(e){
			if (e.keyCode === 13) {
				_this.submit();
			}
		});
	},
	submit : function(){
		var formData = {
			username : $.trim($('#username').val()),
			password : $.trim($('#password').val())
		},
		validateResult = this.formValidate(formData);
		if(validateResult.status){
			_user.login(formData,function(res){
				window.location.href = _mm.getUrlParam('redirect') || './index.html'
			},function(errMsg){
				formError.show(errMsg);
			});

		}else{
			formError.show(validateResult.msg)

		}

	},
	formValidate : function(formData){
		var result = {
			status : false,
			msg		: ''
		};
		if(!_mm.validate(formData.username,'require')){
			result.msg='用户名不能为空';
			return result;
		}
		if(!_mm.validate(formData.password,'require')){
			result.msg='密码不能为空';
			return result;
		}
		//通过验证.返回正确
		result.status = true;
		result.msg='验证通过';
		return result;
	}
};

$(function(){
	page.init();
});
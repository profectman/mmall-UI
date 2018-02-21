/*
* @Author: halfgod
* @Date:   2017-06-12 20:59:18
* @Last Modified by:   halfgod
* @Last Modified time: 2017-06-13 08:55:24
*/

'use strict';
require('./index.css')
require('page/common/nav/index.js');
require('page/common/header/index.js');
 var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
//var templateIndex = require('./index.string');

var page = {
	init :function(){
		this.onLoad();
		this.bindEvent();

	},
	onLoad:function(){
		navSide.init({
			name: 'user-pass-update'
		});
		
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				passwordOld 		: $.trim($('#passwordOld').val()),
				passwordNew 		: $.trim($('#passwordNew').val()),
				passwordConfirm 	: $.trim($('#password-confirm').val())
				

			},
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				_user.updateUserPass(userInfo,function(res,msg){
					_mm.successTips(msg);
					_user.logout(function(res){
						window.location.href = './user-login.html';

					},function(errMsg){
						_mm.errorTips(errMsg);


					});
					//window.location.href = './user-center.html';

				},function(errMsg){
					_mm.errorTips(errMsg);
			});
			}else{
				_mm.errorTips(validateResult.msg);
				}

				});
	},
	
	validateForm : function(formData){
		var result = {
			status : false,
			msg		: ''
		};
		
		if(!_mm.validate(formData.passwordOld,'require')){
			result.msg='旧密码不能为空';
			return result;
		}
		if(!_mm.validate(formData.passwordNew,'require')){
			result.msg='新密码不能为空';
			return result;
		}
		if(!formData.passwordNew || formData.passwordNew.length<6 ){
			result.msg='新密码不能少于6位';
			return result;
		}
		if(formData.passwordConfirm !== formData.passwordNew){
			result.msg='两次密码输入不一致';
			return result;
		}
		//通过验证.返回正确
		result.status = true;
		result.msg='验证通过';
		return result;

	},
};
	
	

$(function(){
	page.init();
});
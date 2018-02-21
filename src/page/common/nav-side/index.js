/*
* @Author: Administrator
* @Date:   2017-06-09 09:46:35
* @Last Modified by:   halfgod
* @Last Modified time: 2017-06-12 20:58:07
*/

'use strict';
require('./index.css');require('./index.css');
var _mm = require('util/mm.js');
var template = require('./index.string');
//导航

var navSide= {
	option : {
		name : '',
		navList : [
			{name:'user-center',desc:'个人中心',href:'./user-center.html'},
			{name:'order-list',desc:'我的订单',href:'./order-list.html'},
			{name:'user-pass-update',desc:'修改密码',href:'./user-pass-update.html'},
			{name:'about',desc:'关于MMall',href:'./about.html'}
		]
	},
	init : function(option){
		//合并选项
		$.extend(this.option,option);
		this.renderNav();

	},
	renderNav : function(){
			//击杀active数据
			for (var i = 0; i < this.option.navList.length; i++) {
				if(this.option.navList[i].name === this.option.name){
					this.option.navList[i].isActive = true;
				}
			};
			//渲染list数据
			var navHtml = _mm.renderHtml(template,{
				navList : this.option.navList
			});
			//把html放入容器
			$('.nav-side').html(navHtml);
	}

};
module.exports = navSide;
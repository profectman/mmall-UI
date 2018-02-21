/*
* @Author: halfgod
* @Date:   2017-06-23 11:08:29
* @Last Modified by:   halfgod
* @Last Modified time: 2017-06-23 11:16:19
*/


'use strict';

require('page/common/nav/index.js');
require('page/common/header/index.js');
 var navSide = require('page/common/nav-side/index.js');



var page = {
	init :function(){
		this.onLoad();

	},
	onLoad:function(){
		navSide.init({
			name: 'about'
		});
		
	},
	
	
	
};

$(function(){
	page.init();
});

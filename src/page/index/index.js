/*
* @Author: Administrator
* @Date:   2017-06-06 16:06:02
* @Last Modified by:   halfgod
* @Last Modified time: 2017-06-13 17:29:06
*/

'use strict';
require('page/common/nav/index.js');
require('./index.css');
require('page/common/header/index.js');
require('util/unslider/index.js');
 var navSide = require('page/common/nav-side/index.js');
 var templateBanner = require('./index.string');
var _mm = require('util/mm.js');
$(function() {
	// 渲染banner的thml
	var bannerHtml = _mm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
	//初始化banner
    var $slider = $('.banner').unslider({
    	dots : true
    });
    //前一张后一张初始绑定
    $('.banner-con .banner-arrow').click(function(){
    	var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    	$slider.data('unslider')[forward]();
    });
});
navSide.init({
	name : 'about'
});

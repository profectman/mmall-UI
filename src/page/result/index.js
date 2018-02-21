/*
* @Author: Administrator
* @Date:   2017-06-09 10:52:11
* @Last Modified by:   halfgod
* @Last Modified time: 2017-06-23 10:21:34
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type = _mm.getUrlParam('type') || 'default',
	$element = $('.' + type + '-success').show();
	
	if(type === 'payment'){
		var $orderNumber = $element.find('.order-number');
		$orderNumber.attr('href' , $orderNumber.attr('href')+_mm.getUrlParam('orderNumber'));
	}
});
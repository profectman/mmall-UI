/*
* @Author: Administrator
* @Date:   2017-06-08 12:40:34
* @Last Modified by:   halfgod
* @Last Modified time: 2017-06-14 22:04:26
*/

'use strict';
var _mm = require('util/mm.js')
var _product = {
	//用户注册
	getProductList : function(listParam,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/product/list.do'),
			data	: listParam,
			success	: resolve,
			error 	: reject
});
	},
	getProductDetail : function(productId,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/product/detail.do'),
			data	: {
				productId : productId
			},
			success	: resolve,
			error 	: reject
});
	},
	
}

module.exports = _product;
/*
* @Author: halfgod
* @Date:   2017-06-15 14:10:34
* @Last Modified by:   halfgod
* @Last Modified time: 2017-06-19 10:19:03
*/

'use strict';
require('./index.css')
var nav = require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');
var page = {
	data : {
		
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		
		this.loadCart();
	},
	bindEvent : function(){
		var _this = this;
		//商品的选择和取消
		$(document).on('click','.cart-select',function(){
			var $this = $(this),
			productId = $this.parents('.cart-table').data('product-id');
			//console.log(productId);
			//切换选中状态
			if($this.is(':checked')){
						_cart.selectProduct(productId,function(res){
			    		_this.renderCart(res);
						},function(errMsg){
						_this.showCartError();	
					});
				}else{
					_cart.unselectProduct(productId,function(res){
			    		_this.renderCart(res);
						},function(errMsg){
						_this.showCartError();	
					});
			}
		});
		//商品的全部选择和取消
		$(document).on('click','.cart-select-all',function(){
			var $this = $(this);
			
			//切换选中状态
			if($this.is(':checked')){
						_cart.selectAllProduct(function(res){
			    		_this.renderCart(res);
						},function(errMsg){
						_this.showCartError();	
					});
				}else{
					_cart.unselectAllProduct(function(res){
			    		_this.renderCart(res);
						},function(errMsg){
						_this.showCartError();	
					});
			}
		});
		//商品数量
		$(document).on('click','.count-btn',function(){

			var $this = $(this),
			    $pCount = $this.siblings('.count-input'),
			    type = $this.hasClass('plus') ? 'plus' : 'minus',
			    productId = $this.parents('.cart-table').data('product-id'),
			    currCount = parseInt($pCount.val()),
			    minCount = 1,
			    maxCount = parseInt($pCount.data('stock')),
			    newCount = 0;
			    if (type === 'plus') {
			    	if (currCount >= maxCount) {
			    		_mm.errorTips("该商品库存不足,当前最多可买"+maxCount+"件该商品");
			    		return;
			    	}
			    	newCount = currCount +1 ;
			    }else if(type === 'minus'){
			    	if (currCount<=minCount) {
			    		return;
			    	}
			    	newCount = currCount-1;
			    }
			    //跟新购物车商品数量
			    _cart.updateProduct({
			    	productId : productId,
			    	count : newCount
			    },function(res){
			    		_this.renderCart(res);
						},function(errMsg){
						_this.showCartError();	
					});
		});
		//删除单个商品
		$(document).on('click','.cart-delete',function(){
			if(window.confirm("确认要删除该商品吗")){
				var productId = $(this).parents('.cart-table').data('product-id');
				_this.deleteCartProduct(productId);
			}	
		});
		//删除选中商品
		$(document).on('click','.delete-select',function(){
			if(window.confirm("确认要删除选中商品吗")){
				var arrProductIds = [],
					$selectdItem = $('.cart-select:checked');
					//循环查找
					for(var i = 0,iLength = $selectdItem.length;i<iLength;i++){
						arrProductIds.push($($selectdItem[i]).parents('.cart-table').data('product-id'));		
					}
					if(arrProductIds.length){
						_this.deleteCartProduct(arrProductIds.join(','));
					}
					else{
						_mm.errorTips('您还没有选中要删除的商品');
					}
				
			}	
		});
		$(document).on('click','.btn-submit',function(){
			//总价>0
			if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
				window.location.href = './order-confirm.html';
			}else{
				_mm.errorTips('请选择商品后再结算')
			}
		});
		
	},
	//加载商品详情
	loadCart : function(){
		var _this = this;
		//loading
		$('.page-wrap').html('<div class="loading"></div>');
		//请求cart信息
		_cart.getCartList(function(res){
			_this.renderCart(res);
		},function(errMsg){
			$('.page-wrap').html('<p class="err-tip">哪里不对了</p>');
		});
		
	},
	renderCart : function(data){
		this.filter(data);
		//huan存购物车
		this.data.cartInfo = data;
		var cartHtml = _mm.renderHtml(templateIndex,data);
		$('.page-wrap').html(cartHtml);
		//通知导航的购物车
		nav.loadCartCount();
	},
	//删除指定商品,支持批量productid,逗号分隔
	deleteCartProduct : function(productIds){
		var _this = this;
		_cart.deleteProduct(productIds,function(res){
			    		_this.renderCart(res);
						},function(errMsg){
						_this.showCartError();	
					});
	},
	filter : function(data){
		data.notEmpty = !!data.cartProductVoList.length;	
	},
	showCartError : function(){
		$('.page-wrap').html('<p class="err-tip">哪里不对了</p>');
	}

	

};
	
	
	
	
	

$(function(){
	page.init();
});

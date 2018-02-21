/*
* @Author: halfgod
* @Date:   2017-06-14 08:35:01
* @Last Modified by:   halfgod
* @Last Modified time: 2017-06-14 14:44:10
*/

'use strict';
require('./index.css')
require('page/common/nav/index.js');
require('page/common/header/index.js');
 var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');

var page = {
	data : {
		listParam : {
			keyword         : _mm.getUrlParam('keyword')    || '',
            categoryId      : _mm.getUrlParam('categoryId') || '',
            orderBy         : _mm.getUrlParam('orderBy')    || 'default',
            pageNum         : _mm.getUrlParam('pageNum')    || 1,
            pageSize        : _mm.getUrlParam('pageSize')   || 20
		}
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadList();
	},
	bindEvent : function(){
		var _this = this;
		$('.sort-item').click(function(){
			var $this = $(this);
			_this.data.listParam.pageNum=1;
			//點擊默認排序
			if($this.data('type') === 'default'){
				if ($this.hasClass('active')) {
					return;
				}else{
					$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
					_this.data.listParam.orderBy = 'default';
				}
			}
			else if($this.data('type') === 'price'){
				$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
				//升序,降序的处理
				if (!$this.hasClass('asc')) {
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy = 'price_asc';
				}else{
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy = 'price_desc';
				}
			}
			_this.loadList();
		});
	},
	loadList : function(){
		var listHtml = '',
		       _this = this;
		var listParam = this.data.listParam;
	    var $pListCon = $('.p-list-con');
	    $pListCon.html('<div class="loading"></div>');
		//删除参数不必要字段
		listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
		//请求借口
		_product.getProductList(listParam,function(res){
			listHtml = _mm.renderHtml(templateIndex,{
				list : res.list
			});
			$('.p-list-con').html(listHtml);
			_this.loadPaginamtion({
				hasPreviousPage : res.hasPreviousPage,
				prePage : res.prePage,
				hasNextPage : res.hasNextPage,
				nextPage : res.nextPage,
				pageNum : res.pageNum,
				pages : res.pages,
			});
		},function(errMsg){
			_mm.errorTips(errMsg);

		});
	},
	loadPaginamtion : function(pageInfo){
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({},pageInfo,{
			container : $('.pagination'),
			onSelectPage : function(pageNum){
				_this.data.listParam.pageNum = pageNum;
				_this.loadList();
			}
		}));
	}

	

};
	
	
	
	
	

$(function(){
	page.init();
});
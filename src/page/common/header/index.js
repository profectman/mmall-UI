/*
* @Author: Administrator
* @Date:   2017-06-09 08:28:17
* @Last Modified by:   halfgod
* @Last Modified time: 2017-06-14 08:43:32
*/

'use strict';
require('./index.css');
var _mm     = require('util/mm.js');

// 通用页面头部
var header = {
    init : function(){
        this.bindEvent();
        this.onload();
          
    },
    onload : function(){
    	var keyword = _mm.getUrlParam('keyword');
    	//keyword存在回填
    	if (keyword) {
    		$('#search-input').val(keyword);
    	}
    },
    bindEvent : function(){
    	var _this = this;
    	//搜索提交
    	$('.search-btn').click(function(){
    		_this.searchSubmit();
    	});
    	//输入回车
    	$('#search-input').keyup(function(e){
    		if(e.keyCode === 13){
    			_this.searchSubmit();
    		}
    	});  
    },
    searchSubmit : function(){
    	var keyword = $.trim($('#search-input').val());
    	//若果有keyword跳转到list页
    	if (keyword) {
    		window.location.href = "./list.html?keyword=" + keyword;
    	}else{
    		//否则返回首页
    		_mm.goHome();
    	}
    }
   
};

header.init();
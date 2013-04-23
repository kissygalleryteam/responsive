/*
 * @fileoverview mediaquery兼容实现 类似respond.js，只支持max-width、min-width，实现思路见：http://ux.etao.com/posts/686
 * @author 妙净
 * @version 1.0
 * @date 2013-04-11
 */

KISSY.add('gallery/responsive/1.0/mediaquerypolyfill/index', function(S, MatchMedia, Base) {
	"use strict";
	/**
	 * @class MediaqueryPolyfill
	 * @constructor
	 * @param {Array} config  resolution breakpoint 分辨率临界值
	 * @return {void} 
	 */
	function MediaqueryPolyfill(config) {
		//支持mediaquery的跳出
		if (MatchMedia('(min-width: 400px)')) return;
		var self = this;
		config = {resolution: config};
 		MediaqueryPolyfill.superclass.constructor.call(self, config);
		self.init();
	}

	
	S.extend(MediaqueryPolyfill, Base, {
		init: function() {
			var self = this;
			var timer;
			self._load(self);
			window.onresize = function() {
				if (timer) { 
					timer.cancel(); 
				}
				timer = S.later(self._load, 200, false, self); 
			};
		},
		
		/**
		 * _replaceClass 替换class
		 * @param  {String} cls 原classString
		 * @param  {String} reg 替换规则 正则
		 * @param  {String} val 替换的值
		 * @return {String}     替换后的classString
		 */
		_replaceClass: function(cls, reg, val) {
	        cls = cls.split(/\s+/);

	        for (var i = 0; i < cls.length; ) {
	            if (cls[i].match(reg)) {
	                cls.splice(i, 1);
	            } else {
	                i ++;
	            }
	        }
	        cls.push(val);
	        return cls.join(' ');
        },

		_load: function() {
			var self = this;
			var resolution = self.get('resolution');
			var len = resolution.length;
			/**
			 * var viewportWidth = document.documentElement.offsetWidth;
			 * media query w3c标准 含滚动条 http://www.w3.org/TR/css3-mediaqueries/#width
			 * media query webkit实现 实际内容 不包含滚动条 其他及其标准 含滚动条
			 * respond.js也用clientWidth计算viewport 不含滚动条 更符合表达习惯
			 */
			var viewportWidth = document.documentElement.clientWidth;
			S.log('clientWidth:'+ viewportWidth);

			var vwClass = resolution[len - 1];
			for (var i = 0; i < len; i ++) {
				var j = i - 1 < 0 ? 0 : i -1 ;
				if(viewportWidth < resolution[i]) {
					vwClass = resolution[j];
					break;
				}
			}
        	// 不支持兼容模式，必需有doctype
        	document.documentElement.className = self._replaceClass(document.documentElement.className, /vw\d+/, 'vw' + vwClass);
		}
	}, {ATTRS: {
		//默认对750(ipad竖屏)、990(ipad横屏和普通pc)、1200(pc宽屏)进行响应
		resolution: [750, 1010, 1220] 
	}});

	return MediaqueryPolyfill;
}, {
	requires: ['../matchmedia/index', 'base']
});
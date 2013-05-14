/*
 * @fileoverview mediaquery兼容实现 类似respond.js，只支持max-width、min-width，实现思路见：http://ux.etao.com/posts/686
 * @author 妙净
 * @version 1.0
 * @date 2013-04-11
 */

KISSY.add('gallery/responsive/1.0/mediaquerypolyfill/index', function(S, RespondTools, Base) {
	"use strict";
	/**
	 * @class MediaqueryPolyfill
	 * @constructor
	 * @param {Object} config  breakpoints 
	 * @return {void} 
	 * @用法：
	 * S.use('gallery/responsive/1.0/mediaquerypolyfill/index', function(S, MediaqueryPolyfill) {
     *   var mqp = new MediaqueryPolyfill({
     *      breakpoints: [480, 1010, 1220, 1420, 1620]
     *   });
     *   mqp.addListener({'(min-width: 1220px) and (max-width: 1419px)': function(){S.log('1420~1419')}});
     *   mqp.addListener({'(min-width: 1420px) and (max-width: 1619px)': function(){S.log('1420~1619')}});
     * });
	 */
	function MediaqueryPolyfill(config) {
		var self = this;
 		MediaqueryPolyfill.superclass.constructor.call(self, config);
		self.init();
	}

	MediaqueryPolyfill.ATTRS = {
		/**
		 * breakpoints 临界值 默认对750(ipad竖屏)、990(ipad横屏和普通pc)、1200(pc宽屏)进行响应
		 * @cfg {array}
		 */
		breakpoints: { value: [750, 1010, 1220]},
		/**
		 * [listeners matchMedia监听器]
		 * @cfg {Object}
		 */
		listeners: {value: {}},
		/**
		 * isAutoExectListener 是否初始化页面时自动执行一次相应的响应回调，默认true
		 * @cfg {Boolean}
		 */
		isAutoExectListener: { value: true },

		/**
		 * [isSupportMediaquery 是否支持mediaquery]
		 * @type {Boolean}
		 */
		isSupportMediaquery: { value: window.matchMedia && window.matchMedia('only all').matches }, 

		/**
		 * [isSupportAddListener 是否支持window.matchMedia('only all').addLinsterner是否支持]
		 * @type {Boolean}
		 */
		isSupportAddListener: { value: window.matchMedia && !!window.matchMedia('only all').addListener },

		/**
		 * document.documentElement.offsetWidth 含滚动条
		 * media query w3c标准 含滚动条 http://www.w3.org/TR/css3-mediaqueries/#width
		 * media query webkit实现 实际内容 不包含滚动条； 其他及其标准 含滚动条
		 * respond.js也用clientWidth计算viewport 不含滚动条 更符合表达习惯
		 * @type {Number}
		 */
		viewportWidth: { 
			value: 0, 
			getter: function() {
				return document.documentElement.clientWidth;
			}
		}
	};

	S.extend(MediaqueryPolyfill, Base, {
		init: function() {
			var self = this, timer;
			!self.get('isSupportMediaquery') && self._changeHtmlClass();

			if(self.get('isSupportAddListener')) { 
				self._addNativeListener(self.get('listeners')); 
			} else {
				self.get('isAutoExectListener') && self._addListenerPolyfill(); 
			}

			window.onresize = function() {
				timer && timer.cancel(); 
				timer = S.later(self._resizeHandler, 500, false, self); 
			};
		},

		/**
		 * addListener 添加回调函数
		 * @param {Object} linsternerObj {'(min-width: 1420px) and (max-width: 1619px)': function(){S.log('1420~1619')}}
		 */
		addListener: function(linsternerObj) {
			var self = this;
			self.get('isSupportAddListener') && self._addNativeListener(linsternerObj);
			var newLinsternerObj = S.merge(linsternerObj, self.get('listeners')); 
			//resize中自动执行_addListenerPolyfill
			self.set('listeners', newLinsternerObj);
		},

		/**
		 * _resize window.onresize的handler 
		 * 做2件事情:1.切换html节点上的class 2.执行listeners的callback
		 * @return {void} 
		 */
		_resizeHandler: function() {
			var self = this;
			if (!self.get('isSupportMediaquery')) {
				self._changeHtmlClass();	
			}
			if (!self.get('isSupportAddListener')) {
				S.log('exect _addListenerPolyfill');
				self._addListenerPolyfill();
			} 
		},

		/**
		 * _addNativeListener 依次注册listener 原生实现
		 */
		_addNativeListener: function(listeners) {
			var self = this,
				isAutoExectListener = self.get('isAutoExectListener'),
				newListeners = {};

			for (var listen in listeners) {
				var mql = window.matchMedia(listen);
				newListeners[mql.media] = listeners[listen];
				isAutoExectListener && mql.matches && listeners[listen]();
				mql.addListener(function(mql) {
					/*
					 * 因mql.media的值会由原来的(min-width:480px) and (max-width: 1009px)变成	(max-width: 1009px) and (min-width:480px)
					 * 所以这里换newListeners重新整理listerners
					 */
					mql.matches && newListeners[mql.media]();
				});
			}
		},
		
		/**
		 * _addListenerPolyfill 通过被执行在window.resize中，模拟实现window.matchMedia('xx').addLinsterner
		 */
		_addListenerPolyfill: function() {
			var self = this, min, max,
				listeners = self.get('listeners');

			for (var p in listeners) {
				if (RespondTools.wave(p)) {
					listeners[p]();
				}
			}
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

        /**
         * _changeHtmlClass 切换html节点的class
         * 如：vm1420 ==》 vm1220
         * @return {void} 
         */
		_changeHtmlClass: function() {
			var self = this,
				breakpoints = self.get('breakpoints'),
			 	len = breakpoints.length,
			 	viewportWidth = self.get('viewportWidth'),
			 	vwClass = breakpoints[len - 1];

			for (var i = 0; i < len; i ++) {
				var j = i - 1 < 0 ? 0 : i -1 ;
				if(viewportWidth < breakpoints[i]) {
					vwClass = breakpoints[j];
					break;
				}
			}
        	// 不支持兼容模式，必需有doctype
        	document.documentElement.className = self._replaceClass(document.documentElement.className, /vw\d+/, 'vw' + vwClass);
		}
	});

	return MediaqueryPolyfill;
}, {
	requires: ['../respondtools/index', 'base']
});
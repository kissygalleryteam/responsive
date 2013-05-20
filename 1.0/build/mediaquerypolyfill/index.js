/*
combined files : 

gallery/responsive/1.0/respondtools/index
gallery/responsive/1.0/mediaquerypolyfill/index

*/
/*
 * @fileoverview mediaquery 参考 https://github.com/scottjehl/matchMedia.js 支持mediaquery的浏览器一般都有window.matchMedia方法，但ie9支持mediaquery却不支持改方法 
 * @desc matchMedia兼容性
 * ##Desktop
 * ###|chrome 9|firefox 6.0|IE10|opera 12.1|safari 5.1|
 * ##Mobile
 * ###|android 3.0|firefox mobile 6.0|IE mobile not supported|opera mobile 12.1|safari mobile5|
 * @author Scott Jehl, Paul Irish, Nicholas Zakas,妙净
 * @version 1.0
 * @date 2013-04-11
 */

KISSY.add('gallery/responsive/1.0/respondtools/index', function (S) {
	"use strict";

	window.matchMedia = window.matchMedia || (function(doc, undefined) {
	  var bool,
	      docElem  = doc.documentElement,
	      refNode  = docElem.firstElementChild || docElem.firstChild,
	      // fakeBody required for <FF4 when executed in <head>
	      fakeBody = doc.createElement('body'),
	      div      = doc.createElement('div');

	  div.id = 'mq-test-1';
	  div.style.cssText = "position:absolute;top:-100em";
	  fakeBody.style.background = "none";
	  fakeBody.appendChild(div);

	  return function(q) {
	    div.innerHTML = '&shy;<style media="'+q+'"> #mq-test-1 { width: 42px; }</style>';
	    docElem.insertBefore(fakeBody, refNode);
	    bool = div.offsetWidth === 42;
	    docElem.removeChild(fakeBody);
	    return { matches: bool, media: q };
	  };
	}(document));

	/**
	 * wave 当前viewportWidth是否在media query的【min max】区间
	 * @param {String} mediaquery (min-width:480px) and (max-width: 1009px) 只支持min-width和max-width；类似respond.js的理念（响应式设计的实现支持min-width和max-width足矣）
	 * @return {Boolean} 
	 */
	function wave(mediaquery) {
		if (window.matchMedia & window.matchMedia('only all').matches) {
			return window.matchMedia(mediaquery).matches;
		} else {
			var min, max, viewportWidth = document.documentElement.clientWidth;
			//(max-width: 1009px) and (min-width:480px) ==> min = 480; max = 1009
			min = mediaquery.replace(/.*min-width[\:\s]+(\d+)px.*/ig,'$1');
			max = mediaquery.replace(/.*max-width[\:\s]+(\d+)px.*/ig,'$1');
			min = /width/.test(min)? 0 : min;
			max = /width/.test(max)? 0 : max;
			if(max) {
				return viewportWidth >= min && viewportWidth <= max;
			} else {
				return viewportWidth >= min;
			}
		}
	}

	var RespondTools = {
		match: window.matchMedia,
		wave: wave
	}

	return RespondTools;
});


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
		listeners: {},
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
				self._addNativeListener(); 
			} else {
				self.get('isAutoExectListener') && self._addListenerPolyfill(); 
			}

			window.onresize = function() {
				timer && timer.cancel(); 
				timer = S.later(self._resizeHandler, 500, false, self); 
			};
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
		_addNativeListener: function() {
			var self = this,
				listeners = self.get('listeners'),
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
					S.log('callback');
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

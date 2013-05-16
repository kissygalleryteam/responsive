/*
 * @fileoverview mediaquery 参考 https://github.com/scottjehl/matchMedia.js 支持mediaquery的浏览器一般都有window.matchMedia方法，但ie9支持mediaquery却不支持该方法 
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
	      //fakeBody = doc.createElement('body'),
	      div      = doc.createElement('div');

	  div.id = 'mq-test-1';
	  div.style.cssText = "position:absolute;top:-100px";
	  //fakeBody.style.background = "none";
	  //fakeBody.appendChild(div);

	  return function(q) {
	    div.innerHTML = '&shy;<style media="'+q+'"> #mq-test-1 { width: 42px; }</style>';
	    /* 
	     * 测试证明添加fakeBody会导致在ie6/7下触发window.resize 故删除fakeBody
	   	 * 因为<ff4的用户数在我国几乎没有，ff6开始就已经原生支持window.matchMedia 此时此刻最新是ff20
	   	 * https://developer.mozilla.org/en-US/docs/DOM/window.matchMedia
	     */
	    //docElem.insertBefore(fakeBody, refNode); 
	    docElem.appendChild(div);
	    bool = div.offsetWidth === 42;
	    docElem.removeChild(div);
	    return { matches: bool, media: q };
	  };
	}(document));

	/**
	 * wave 当前viewportWidth是否在media query的【min max】区间
	 * @description 比较常用，后面的mediaquerypolyfill和picturepolyfill均依赖此函数，该函数命名和为什么有这个函数，参考jquery respondjs plugin (http://responsejs.com/)
	 * @param {String} mediaquery (min-width:480px) and (max-width: 1009px) 只支持min-width和max-width；类似respond.js的理念（响应式设计的实现支持min-width和max-width足矣）
	 * @return {Boolean} 
	 */
	function wave(mediaquery) {
		if (window.matchMedia && window.matchMedia('only all').matches) {
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


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
	 * @param {String} mediaquery (min-width:480px) and (max-width: 1009px)
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


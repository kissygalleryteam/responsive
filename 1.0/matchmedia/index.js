/*
 * @fileoverview mediaquery 参考 https://github.com/scottjehl/matchMedia.js 支持mediaquery的浏览器一般都有window.matchMedia方法，但ie9支持mediaquery却不支持改方法 
 * @desc matchMedia兼容性
 * ##Desktop
 * ###|chrome 9|firefox 6.0|IE10|opera 12.1|safari 5.1|
 * ##Mobile
 * ###|android 3.0|firefox mobile 6.0|IE mobile not supported|opera mobile 12.1|safari mobile5|
 * @author Scott Jehl, Paul Irish, Nicholas Zakas,miaojing
 * @version 1.0
 * @date 2013-04-11
 */

KISSY.add('gallery/responsive/1.0/matchmedia/index', function (S) {
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
	return window.matchMedia;
});


/*
combined files : 

gallery/responsive/1.0/matchmedia/index

*/
/*
 * @fileoverview mediaquery探测 参考 https://github.com/scottjehl/matchMedia.js 
 * @author Scott Jehl, Paul Irish, Nicholas Zakas, miaojing@taobao.com
 * @version 1.0
 * @date 2013-04-11
 */

KISSY.add('gallery/responsive/1.0/matchmedia/index', function (S) {
	"use strict";
	/**
	 * @name MatchMedia
	 * @class mediaquery探测
	 * @param {string} [mediaquery string] 
	 * @return {bool} [true|false]
	 */
	function MatchMedia(q) {
		var bool,
			doc = document,
			docElem = doc.documentElement,
			refNode = docElem.firstElementChild || docElem.firstChild,
			// fakeBody required for <FF4 when executed in <head>
			fakeBody = doc.createElement('body'),
			div = doc.createElement('div');
		div.id = 'mq-test-1';
		div.style.cssText = "position:absolute;top:-100em";
		fakeBody.style.background = "none";
		fakeBody.appendChild(div);
		div.innerHTML = '&shy;<style media="'+q+'"> #mq-test-1 { width: 42px; }</style>';
		docElem.insertBefore(fakeBody, refNode);
		bool = div.offsetWidth === 42;
		docElem.removeChild(fakeBody);
		return bool;  
	}
	return MatchMedia;
});

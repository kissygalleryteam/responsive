/*
combined files : 

gallery/responsive/1.0/respondtools/index
gallery/responsive/1.0/picturepolyfill/index

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


/**
* 响应式图片
* @author Scott Jehl, 妙净
* @version:1-0-0
* @ Picturefill - Author: Scott Jehl, 2012 | License: MIT/GPLv2 */
/*
	Picturefill: A polyfill for proposed behavior of the picture element, which does not yet exist, but should. :)
	* Notes: 
		* For active discussion of the picture element, see http://www.w3.org/community/respimg/
		* While this code does work, it is intended to be used only for example purposes until either:
			A) A W3C Candidate Recommendation for <picture> is released
			B) A major browser implements <picture>
*/

KISSY.add('gallery/responsive/1.0/picturepolyfill/index', function (S, Base, RespondTools) {
	"use strict";
	/**
	 * @class PicturePolyfill
	 * @constructor
	 * @param {Array} config 
	 * @return {void} 
	 */
	
	function PicturePolyfill() {
		var self = this;
 		PicturePolyfill.superclass.constructor.call(self);
		self.init();
	}

	
	S.extend(PicturePolyfill, Base, {
		
		init: function() {
			var self = this, timer;
			self._responsiveImg();
			
			window.onresize = function() {
				timer && timer.cancel(); 
				timer = S.later(self._responsiveImg, 200, false, self); 
			};
		},

		_responsiveImg: function() {
			var w = window, ps = w.document.getElementsByTagName( "div" );
			var HD = window.devicePixelRatio && window.devicePixelRatio;
			for( var i = 0, il = ps.length; i < il; i++ ) {
				if( ps[ i ].getAttribute( "data-picture" ) !== null ) {

					var sources = ps[ i ].getElementsByTagName( "div" ),
						matches = [];

					// 匹配哪一个source 
					for( var j = 0, jl = sources.length; j < jl; j++ ) {
						var media = sources[ j ].getAttribute( "data-media" );
						if( !media || RespondTools.wave(media)){
							matches.push( sources[ j ] );
						}
					}

					//如果picture下存在fallback img后续将其移除 
					var picImg = ps[ i ].getElementsByTagName( "img" )[ 0 ];

					if( matches.length ) {			
						if( !picImg ){
							picImg = w.document.createElement( "img" );
							picImg.alt = ps[ i ].getAttribute( "data-alt" );
							ps[ i ].appendChild( picImg );
						}

						//额外支持高清屏
						var src = matches.pop().getAttribute( "data-src" ), imgsrc, srcArr = src.split(",");

						for(var s = 0, sl = srcArr.length; s < sl ; s++) {
							var srcH = srcArr[s].replace(/^\s*/, '').replace(/\s*$/, '').split(" "), 
							srcRatio = parseFloat( srcH[1], 10 );
							if (window.devicePixelRatio) {
								if(srcRatio == window.devicePixelRatio) {
									imgsrc = srcH[0];
								}
							} else {
								//不支持高清屏 
								if(!srcH[1] || srcH[1] && srcRatio == 1) imgsrc = srcH[0];
							}
						}

						picImg.src =  imgsrc;
					} else if( picImg ){
						ps[ i ].removeChild( picImg );
					}
				}
			}	
		}
	}); 

return PicturePolyfill;
	
}, { requires:["base", "../respondtools/index"]});


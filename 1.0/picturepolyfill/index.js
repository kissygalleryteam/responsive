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
								srcRatio = srcRatio || 1;
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

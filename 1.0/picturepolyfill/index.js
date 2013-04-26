/**
* 响应式图片
* @author Scott Jehl, 妙净<miaojing@taobao.com>
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

KISSY.add('gallery/responsive/1.0/picturepolyfill/index', function (S, DOM, Event, Base, MatchMedia) {
	"use strict";
	/**
	 * @class PicturePolyfill
	 * @constructor
	 * @param {Array} config  resolution breakpoint 分辨率临界值
	 * @return {void} 
	 */
	function PicturePolyfill() {
		var self = this;
 		PicturePolyfill.superclass.constructor.call(self);
		self.init();
	}

	
	S.extend(PicturePolyfill, Base, {
		
		init: function() {
			var self = this;
			var timer;
			self._responsiveImg();
			var viewportWidth = document.documentElement.clientWidth;
			
			window.onresize = function() {
				if (timer) { 
					timer.cancel(); 
				}
				timer = S.later(self._responsiveImg, 200, false, self); 
			};
		},

		_responsiveImg: function() {
			var doc = window.document;
			var ps = doc.getElementsByTagName( "picture" );

			// Loop the pictures
			for( var i = 0, il = ps.length; i < il; i++ ) {
				var sources = ps[ i ].getElementsByTagName( "source" ),
					picImg = null,
					matches = [];

				// See which sources match
				for( var j = 0, jl = sources.length; j < jl; j++ ){
					var media = sources[ j ].getAttribute( "media" );
					// if there's no media specified, OR w.matchMedia is supported 
					if(!media || MatchMedia(media)) {
						matches.push( sources[ j ] );
					}
				}

				// Find any existing img element in the picture element
				picImg = ps[ i ].getElementsByTagName( "img" )[ 0 ];

				if( matches.length ){
					// Grab the most appropriate (last) match.
					var match = matches.pop(),
						srcset = match.getAttribute( "srcset" );

					if( !picImg ){
						picImg = doc.createElement( "img" );
						picImg.alt = ps[ i ].getAttribute( "alt" );
						ps[ i ].appendChild( picImg );
					}

					if( srcset ) {
							var screenRes = window.devicePixelRatio || 1, // Is it worth looping through reasonable matchMedia values here?
								sources = srcset.split(","); // Split comma-separated `srcset` sources into an array.

							var hasHD = window.devicePixelRatio > 1;

							for( var res = sources.length, r = res - 1; r >= 0; r-- ) { // Loop through each source/resolution in `srcset`.
								var source = sources[ r ].replace(/^\s*/, '').replace(/\s*$/, '').split(" "), // Remove any leading whitespace, then split on spaces.
									resMatch = parseFloat( source[1], 10 ); // Parse out the resolution for each source in `srcset`.

								if( screenRes >= resMatch ) {
									if( picImg.getAttribute( "src" ) !== source[0] ) {
										var newImg = document.createElement("img");
										newImg.src = source[0];
										// When the image is loaded, set a width equal to that of the original’s intrinsic width divided by the screen resolution:
										newImg.onload = function() {
											// Clone the original image into memory so the width is unaffected by page styles:
											this.width = ( this.cloneNode( true ).width / resMatch );
										}
										picImg.parentNode.replaceChild( newImg, picImg);
									}
									break; // We’ve matched, so bail out of the loop here.
								}
							}
					} else {
						// No `srcset` in play, so just use the `src` value:
						picImg.src = match.getAttribute( "src" );
					}
				}
			}
		}
	}); 

return PicturePolyfill;
	
}, { requires:["dom", "event", "base", "gallery/responsive/1.0/matchmedia/index"]});

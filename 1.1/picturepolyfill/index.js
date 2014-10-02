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
    var win = window;
    var PIC_BOX = 'data-picture',
        PIC_ALT = 'data-alt',
        PIC_LAZY = 'data-lazy',
        PIC_MEDIA = 'data-media',
        PIC_SRC = 'data-src';
    var RATIO = window.devicePixelRatio;
    var doc = win.document;

    function PicturePolyfill() {
        var self = this;
        PicturePolyfill.superclass.constructor.call(self);
        self.init();
    }


    S.augment(PicturePolyfill, {
        getBoxs: function(){
            return this._boxs;
        },
        getLazyBoxs: function(){
            var boxs = this._boxs, new_boxs = {};
            for(var k in boxs){
                if(boxs[k].lazy) new_boxs[k] = boxs[k];
            }
            return new_boxs;
        },
        applyBox: function(id, opt){
            var box = document.getElementById(id),
                medias = opt.media, srcs = [];

            for(var i = medias.length; i--;){
                var media = medias[i];
                if( !media || RespondTools.wave(media)){
                    srcs.push(opt.src[i]);
                }
            }

            var picImg = box.getElementsByTagName('img')[0];
            if( srcs.length ) {
                if( !picImg ){
                    picImg = document.createElement( "img" );
                    picImg.alt = opt.alt;
                    var a = box.getElementsByTagName('a')[0];
                    if(a){
                        a.appendChild( picImg );
                    }else{
                        box.appendChild( picImg );
                    }
                }
                //额外支持高清屏
                var src = srcs.pop(), imgsrc, srcArr = src.split(",");
                for(var j = 0, len = srcArr.length; j < len; j++){
                    var srcH = srcArr[j].replace(/^\s*/, '').replace(/\s*$/, '').split(" "),
                        srcRatio = parseFloat(srcH[1], 10);
                    if (RATIO && srcRatio == RATIO) {
                        imgsrc = srcH[0];
                    } else {
                        //不支持高清屏
                        if(!srcH[1] || srcH[1] && srcRatio == 1) imgsrc = srcH[0];
                    }
                }
                picImg.src =  imgsrc;
                this._boxs[id].lazy = false;

            }else if(picImg){
                box.removeChild(picImg);
            }
        },
        synImgs: function(container){
            var self = this,
                ps = container.getElementsByTagName( "div" );
            for(var i = ps.length; i--;){
                var box = ps[i];
                if(box.getAttribute(PIC_BOX) !== null){
                    var id = box.getAttribute('id') || self._getStamp(box);
                    if(box.getAttribute(PIC_LAZY) !== null){
                        self._boxs[id] ={lazy: true};
                    }else{
                        self._boxs[id] ={lazy: false};
                    }
                    self._boxs[id]['alt'] = box.getAttribute(PIC_ALT);

                    var sources = box.getElementsByTagName( "div" );
                    self._boxs[id]['media'] = [];
                    self._boxs[id]['src'] = [];

                    // 匹配哪一个source
                    for( var j = sources.length; j --; ) {
                        var media = sources[ j ].getAttribute( PIC_MEDIA );
                        if(media !== null){
                            self._boxs[id]['media'].push(media);
                            self._boxs[id]['src'].push(sources[ j ].getAttribute(PIC_SRC));
                            box.removeChild(sources[j]);
                        }
                    }
                }
            }
            self._matchImgs();
        }
    });

    S.extend(PicturePolyfill, Base, {

        init: function() {
            var self = this;

            self._boxs = {};

            self._renderUI();

            self._bindUI();

        },
        _getStamp: function(el){
            var id =  S.guid('J_resy_');
            el.setAttribute('id', id);
            return id;
        },
        _matchImgs: function(){
            var self = this,
                boxs = self._boxs;
            for(var k in boxs){
                if(boxs[k].lazy) continue;
                self.applyBox(k, boxs[k]);
            }

        },
        _renderUI: function(){
            this.synImgs(doc);
        },
        _bindUI: function(){
            var self = this,
                resize = true,
                buffer = S.buffer(function(){
                    self._matchImgs();
                    S.log(1);
                    resize = true;
                }, 200);


            if(document.addEventListener){
                window.addEventListener('resize', function(){
                    buffer();
                }, false)
            }else{
                window.attachEvent('onresize', function(){
                    if(resize){
                        buffer();
                    }
                    resize = false;
                });
            }
        }

    });

    return PicturePolyfill;

}, { requires:["base", "../respondtools/index"]});


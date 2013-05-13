# 综述
响应式基础函数,目前包括2个函数：    
1.window.matchMedia(mq): window.matchMedia的兼容实现，探测当前是否支持该[mediaquery](http://www.w3.org/TR/css3-mediaqueries/),实现参考[matchMedia.js](https://github.com/scottjehl/matchMedia.js)        
2.wave(mq): 判断当前viewportWidth是否在media query的【min max】区间,兼容ie6+ 实现参考[jquery respondjs plugin](http://responsejs.com/)    

版本：1.0    
作者：Scott Jehl, Paul Irish, Nicholas Zakas, 妙净
# demo示例
 [点击访问](http://miaojing.github.io/responsive/1.0//demo/respondtools.html)

## 包配置 
kissy1.2下需要gallery的包配置, 1.3不需要

    KISSY.config({
        packages:[
            {
                name:"gallery", // 包名
                path:"http://a.tbcdn.cn/s/kissy/",
                charset:"utf-8"
            }
        ]
    });

## 用法
    KISSY.use('gallery/responsive/1.0/respondtools/index', function (S, RespondTools) {
        if (window.matchMedia('only all').matches) {
            alert('yeah support');
        } else {
            alert('not support');
        }
        /**
         * wave 当前viewportWidth是否在media query的【min max】区间
         * @param {String} mediaquery (min-width:480px) and (max-width: 1009px) 只支持min-width和max-width；类似respond.js的理念（响应式设计的实现支持min-width和max-width足矣）
         * @return {Boolean} 
         */
        if (RespondTools.wave('(max-width: 768px)')) {
            alert('<=768px');
        } else {
            alert('>768px');
        }
    });

###原生 window.matchMedia兼容性
####Desktop
|chrome 9|firefox 6.0|IE10|opera 12.1|safari 5.1|
####Mobile
|android 3.0|firefox mobile 6.0|IE mobile not supported|opera mobile 12.1|safari mobile5|


##相关链接   
 1.https://developer.mozilla.org/en-US/docs/DOM/window.matchMedia    
 2.https://github.com/scottjehl/matchMedia.js    
 3.http://msdn.microsoft.com/zh-CN/library/ie/hh772743(v=vs.85).aspx    


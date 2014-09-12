# 综述
响应式基础函数,目前包括2个函数:    
1. matchMedia(mq): [window.matchMedia](https://developer.mozilla.org/en-US/docs/DOM/window.matchMedia)的兼容实现,实现参考[matchMedia.js](https://github.com/scottjehl/matchMedia.js)        
2. wave(mq): 判断当前viewportWidth是否在media query的【min max】区间,兼容ie6+,命名和实现参考[jquery respondjs plugin](http://responsejs.com/)   
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
        if (RespondTools.matchMedia('only all').matches) {
            alert('yeah support');
        } else {
            alert('not support');
        }
        
        if (RespondTools.wave('(max-width: 768px)')) {
            alert('<=768px');
        } else {
            alert('>768px');
        }
    });

    

## 方法
* matchMedia(mq) window.matchMedia的兼容实现,如ie9支持mediaquery但不支持原生window.matchMedia(),实现参考[matchMedia.js](https://github.com/scottjehl/matchMedia.js)
    + Parameters: mq(string) -- [mediaquery](http://www.w3.org/TR/css3-mediaqueries/)表达式
    + Returns: { matches:true|false, q:mediaquery }
* wave(mq): 当前viewportWidth是否在media query的【min max】区间 兼容ie6+ 函数命名和实现参考[jquery respondjs plugin](http://responsejs.com/)
    + Parameters: mq(string) -- [mediaquery](http://www.w3.org/TR/css3-mediaqueries/)表达式，只支持min-width和max-width；如(min-width:480px) and (max-width: 1009px),类似Respond.js的理念（响应式设计的实现支持min-width和max-width足矣），小心media query里面的括号和单位（目前只支持px,不支持em）。
    + Returns: boolean

####原生 window.matchMedia兼容性
####Desktop
<table>
<tr><td>chrome 9</td><td>firefox 6.0</td><td>IE10</td><td>opera 12.1</td><td>safari 5.1</td></tr>
</table>
####Mobile
<table>
<tr><td>android 3.0</td><td>firefox mobile 6.0</td><td>IE mobile not supported</td><td>opera mobile 12.1</td><td>safari mobile5</td></tr>
</table>

## 应用处
1. [mediaquery兼容实现 mediaquerypolyfill](/meidaquerypolyfill.md)
2. [响应式图片兼容实现 picturepolyfill](/picturepolyfill.md)

##相关链接   
 1.https://developer.mozilla.org/en-US/docs/DOM/window.matchMedia    
 2.https://github.com/scottjehl/matchMedia.js    
 3.http://msdn.microsoft.com/zh-CN/library/ie/hh772743(v=vs.85).aspx    


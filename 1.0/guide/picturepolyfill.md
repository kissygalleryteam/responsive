# 综述
PicturePolyfill即Picture标签的兼容实现  [W3C响应式图片讨论组](http://www.w3.org/community/respimg/) 参考开源 [picturefill](https://github.com/scottjehl/picturefill)，同时增加以下feature：    
1.兼容i8及其以下【done】     
2.支持Retina屏【done】    
3.支持图片懒加载 【todo】    

版本：1.0    
作者：Scott Jehl、Wilto、妙净


# demo示例
 [点击访问](http://miaojing.github.io/responsive/1.0//demo/picturepolyfill.html)

##html结构
为什么html结构不用[picture h5](http://www.w3.org/TR/html-picture-element/)草案中的规范推荐的，而用div，因为ie9会移除source标签，js无法获取soucre标签，经测试确实如此，社区同样有人反馈同样的[问题](http://www.w3.org/community/respimg/2012/03/06/js-implementation-problem-with/),开源的[picturefill](https://github.com/scottjehl/picturefill)的html也是如此。

    <div data-picture data-alt="淘宝女装">
        <div data-media="(min-width: 400px)" data-src="http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_100x100.jpg 1x, http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_200x200.jpg 2x"></div>
        <div data-media="(min-width: 500px)" data-src="http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_230x230.jpg 1x, http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_460x460.jpg 2x"></div>
        <div data-media="(min-width: 600px)" data-src="http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_300x300.jpg 1x, http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_600x600.jpg 2x"></div>
        <div data-media="(min-width: 800px)" data-src="http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_400x400.jpg 1x"></div>
        <div data-media="(min-width: 1000px)" data-src="http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_600x600.jpg"></div>
        <noscript><img src="http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_100x100.jpg" alt="淘宝女装"></noscript>
    </div>


## 理论上的picture标签  
    <picture alt="淘宝女装">
        <source media="(min-width: 400px)" srcset="http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_100x100.jpg 1x, http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_200x200.jpg 2x">
        <source media="(min-width: 500px)" srcset="http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_230x230.jpg 1x, http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_460x460.jpg 2x">
        <img src="http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_100x100.jpg" alt="淘宝女装">
    </picture>

#用法
    <script src="http://a.tbcdn.cn/s/kissy/1.3.0/seed.js"></script>
    //kissy1.2下需要gallery的包配置, 1.3不需要
    KISSY.config({
        packages:[
            {
                name:"gallery", // 包名
                path:"http://a.tbcdn.cn/s/kissy/",
                charset:"utf-8"
            }
        ]
    });
    S.ready(function() {
        S.use('gallery/responsive/1.0/picturepolyfill/index', function(S, PicturePolyfill) {
            new PicturePolyfill();
        });
    });

#参考链接  
1.[JS implementation / Problem with the source element source标签在ie9下的问题](http://www.w3.org/community/respimg/2012/03/06/js-implementation-problem-with/)    
2.[Polyfilling picture without the overhead](http://www.w3.org/community/respimg/2012/03/15/polyfilling-picture-without-the-overhead/)   
3.[32种图片响应式方案列表以及优劣对比](https://docs.google.com/spreadsheet/ccc?key=0Al0lI17fOl9DdDgxTFVoRzFpV3VCdHk2NTBmdVI2OXc#gid=0)  
4.[从可用性，是否需要服务端支持，维护成本等方面分析图片响应式应该选择哪一种方案](http://css-tricks.com/which-responsive-images-solution-should-you-use/)    
5.[图片响应式picture草案出来之前,深入讨论图片响应式技术方案](http://blog.cloudfour.com/responsive-imgs-part-2/)    




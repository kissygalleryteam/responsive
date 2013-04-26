# 综述
PicturePolyfill即Picture标签的兼容实现  [W3C响应式图片讨论组](http://www.w3.org/community/respimg/) 参考开源 [apicturefill-proposal](https://github.com/Wilto/picturefill-proposal)            
版本：1.0    
作者：Scott Jehl、Wilto、miaojing

# demo示例
 [点击访问](http://miaojing.github.io/responsive/1.0//demo/picturepolyfill.html)

## picture标签

    <picture alt="淘宝女装">
        <source media="(min-width: 400px)" srcset="http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_100x100.jpg 1x, http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_200x200.jpg 2x">
        <source media="(min-width: 500px)" srcset="http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_230x230.jpg 1x, http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_460x460.jpg 2x">
        <source media="(min-width: 600px)" srcset="http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_300x300.jpg 1x, http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_600x600.jpg 2x">
        <source media="(min-width: 800px)" srcset="http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_400x400.jpg 1x">
        <source media="(min-width: 1000px)" srcset="http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_600x600.jpg 1x">
        <noscript><img src="http://img04.taobaocdn.com/bao/uploaded/i4/i3/T1fQ6LXoxjXXXnyXc__105152.jpg_100x100.jpg" alt="淘宝女装"></noscript>
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

# 备注
ie8-兼容待实现




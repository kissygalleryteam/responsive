# 综述
MatchMedia匹配是否支持或某个[media query](http://www.w3.org/TR/css3-mediaqueries/)表达式，实现参考[matchMedia.js](https://github.com/scottjehl/matchMedia.js)
版本：1.0
作者：Scott Jehl, Paul Irish, Nicholas Zakas,妙净

# 用法：
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

## 使用方法：
    KISSY.use('gallery/responsive/1.0/matchmedia/index', function (S, MatchMedia) {
        
        /**
         * @param {string} [mediaquery string] 
         * @return {bool} [true|false]
         */
        
        if (MatchMedia('(min-width: 400px)')) {
            // 测试一般media query
        }

        if (MatchMedia('all and (orientation:landscape)')) {
            // 测试是否横屏
        } 
    });


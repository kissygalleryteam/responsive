# 综述
MediaqueryPolyfill即media query兼容（ie8-）实现
版本：1.0    
作者：妙净


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

# demo示例
 [点击访问](../demo/mediaquerypolyfill.html)

# 备注

对比[matchMedia.js](https://github.com/scottjehl/matchMedia.js)会发现，这里对返回值做了修改    
[matchMedia.js](https://github.com/scottjehl/matchMedia.js)的返回值为object,如下：

    return { matches: bool, media: q };
而这里是直接返回bool，如下：

    return { bool };

改成这样的原因是，一方面q是函数的参数，是已知的，return出来意义不大；另一方面如果保持原来的return，调用方式就变成了MatchMedia('(min-width: 400px)').matches,按照kissy的属性管理的风格调用方式会变成 MatchMedia('(min-width: 400px)').get('matches'), 使用起来不方便。

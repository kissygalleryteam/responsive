# 综述
MediaqueryPolyfill即media query兼容（ie8-）实现     
实现思路：不支持mediaquery的在html节点上切换class（如响应的临界值为1220和1420：w1220、w1420）,在页面初始化前和window.resize的时候切换class。    
版本：1.0    
作者：妙净
# demo示例
 [点击访问](http://miaojing.github.io/responsive/1.0/demo/mediaquerypolyfill.html)
## 引入js
    <head>
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
    //为了防止闪屏，切换class应该在body渲染之前，所以不建议用KISSY.use的异步加载进来，改为直接在head中引入
    <script src="http://a.tbcdn.cn/s/kissy/gallery/responsive/1.0/??respondtools/index-min.js,mediaquerypolyfill/index-min.js"></script>
    <script>
    KISSY.use('gallery/responsive/1.0/mediaquerypolyfill/index', function(S, MediaqueryPolyfill) {
        /*
         * media query width 3C（ff/ie9）包含滚动条,但webkit内核的不包含滚动条宽度，
         * 但实际视觉设计师是按照页面内容宽度来定是不含滚动条的，所以一般mediaquery的width要在页面宽度的基础上加滚动条的宽度17（习惯整数的也可以加20，效果是提前3px响应而已）
         * 如：页面宽度990,则media query 临界值为 990+20=1010
         */
        var mqp = new MediaqueryPolyfill([480, 1010, 1220, 1420, 1620]);

        /**
         * addListener 顺便模拟实现window.matchMedia('min-width: 1220px').addLinstener(callback) 兼容ie6+ 常用于不同临界值之间的js逻辑的响应
         * @description 只支持min-width和max-width mediaquery 类Respond.js实现响应式设计够用
         * @param {Object} linsternerObj {'(min-width: 1420px) and (max-width: 1619px)': function(){S.log('1420~1619')}}
         */
        mqp.addListener({'(max-width: 479px)': function(){S.log('1420~1619')}});
        mqp.addListener({'(min-width: 480px) and (max-width: 1009px)': function(){S.log('480~1009')}});
        mqp.addListener({'(min-width: 1010px) and (max-width: 1219px)': function(){S.log('1010~1219')}});
        mqp.addListener({'(min-width: 1220px) and (max-width: 1419px)': function(){S.log('1220~1419')}});
        mqp.addListener({'(min-width: 1420px) and (max-width: 1619px)': function(){S.log('1420~1619')}});
        mqp.addListener({'(min-width: 1620px)': function(){S.log('>=1620')}});
    });
    </script>
    </head>

## 加入css 
    @media (max-width: 1620px) {
        div {
            background-color: blue;
        }
    }

    @media (max-width: 1420px) {
      div {
            background-color: yellow;
        }
    } 

    @media (max-width: 1220px) {
        div {
            background-color: red;
        }
    }
    
    .w1620 div {
        background-color: blue;
    }

    .w1420 div {
        background-color: yellow;
    }

    .w1220 div {
        background-color: red;
    }
    /*
     * 上面media query和hack css的内容是重复的，可以根据需要引入less解决,一淘首页目前是引入less解决
     * 如果响应到mobile端，高分辨率的css hack多余了，如果多余好几k,可以考虑实现拆分成不同文件，根据不同终端输出。
     */
    
# 线上使用项目
1. [一淘首页](http://www.etao.com)
2. [一淘点评](http://dianping.etao.com)

# 备注

实现media query i8-兼容，业内比较成熟的方案有[respond.js](https://github.com/scottjehl/Respond)和[css3-mediaqueries-js](https://github.com/livingston/css3-mediaqueries-js)。repond.js在不跨域的情况下推荐使用（只有1k且不出现闪屏，使用方便，但会多一个ajax 304请求），但是跨域时（css/js在cdn）不推荐（会出现至少500ms间隔的闪屏，且需要在cdn上引入代理页面实现跨域）；css3-mediaqueries-js不推荐使用，其更多是mediaqueries的完全兼容实现，但min-width和max-width即可满足响应式实现的要求。基于以上，采用全局切换class的方式实现ie8-的兼容，引入less解决media query 和 兼容css的重复维护的问题。更多测试结果，[点这里](http://ux.etao.com/posts/686)哈



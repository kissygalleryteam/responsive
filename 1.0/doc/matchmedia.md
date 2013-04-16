# 用法：

    KISSY.config({
        packages:[
            {
                name:"gallery", // 包名
                path:"../../../../", // 包对应路径, 相对路径指相对于当前页面路径
                charset:"utf-8"
            }
        ]
    });
    
    KISSY.use('gallery/responsive/1.0/matchmedia/index', function (S, MatchMedia) {
        if (MatchMedia('(min-width: 400px)')) {
            S.log('yeah:) support');
        } else {
            S.log('sorry;) can not support');
        }
    });


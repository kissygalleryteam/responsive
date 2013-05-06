## 2013.04.23, Version 1.0.7(Stable)

### bugfix

- ✔ 修正输出路径为目录导致无法正确输出的bug

## 2013.04.23, Version 1.0.6(Stable)

### bugfix

- ✔ 修正require路径为目录导致解析出错的bug
- ✔ 默认关闭任何console的log信息，silent默认为true

## 2013.04.12, Version 1.0.5(Stable)

### bugfix

- ✔ 修正部分相对路径解析出错的bug

## 2013.04.12, Version 1.0.4(Stable)

### enhancement

- ✔ 增加exclude、ignoreFiles功能支持，添加相应测试用例

## 2013.04.12, Version 1.0.3(Stable)

### enhancement

- ✔ 增加map功能支持，添加相应测试用例

## 2013.04.10, Version 1.0.2(Stable)

### enhancement

- ✔ 完全重构，增加对KISSY 1.3的自动Combo支持

## 2012.11.28, Version 0.0.6(Stable)

### enhancement

- ✔ build的时候可以直接使用入口模块名进行打包

## 2012.11.28, Version 0.0.5(Stable)

### enhancement

- ✔ 增加ignoreFiles配置，方便打包目录的时候排除一些文件

## 2012.11.28, Version 0.0.4(Stable)

### bug fix

- ✔ 修正一处self未定义bug
- ✔ 修正require正则分析少了一处引号的bug

## 2012.09.27, Version 0.0.3(Stable)

### bug fix

- ✔ #9 0.0.2中如果build没有设置编码，会输出utf-8的问题
- ✔ 判断文件是否循环过导致一些模块无法打包进来的问题

## 2012.09.19, Version 0.0.2(Stable)

### bug fix

- ✔ 修复了模块互相依赖导致死循环的问题

### enhancement
-  增加analyze接口，只分析依赖
-  build接口可以返回打包的具体信息了。
-  build接口可以单独设置输出编码了。
-  增加了silent的config项目，可以完全关闭Module Compiler的控制台输出，方便集成到自己的工具当中
-  ModuleCompiler.config可以返回当前的所有配置信息，包括包信息，方便用户查看。

## 2012.08.28, Version 0.0.1(Stable)

### bug fix

- ✔ 修复了输出编码设置无效的问题

### test case
-  增加编码测试脚本
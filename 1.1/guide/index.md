#基于kissy seed常用响应式技术实现

* [响应式实现基础函数 (respondtools)](respondtools.md)
* [mediaquery ie8-兼容实现（mediaquerypolyfill）](mediaquerypolyfill.md)
* [响应式图片兼容实现（picturepolyfill）](picturepolyfill.md)
* [响应式模块之slide（slide）](slide.md)
* [响应式导航（navigation）](navgation.md)(待从wanke.etao.com导航上抽取出来)
* [响应式模块之推层（pushlayer）](pushlayer.md)（待从wanke.etao.com中抽取出来）

#常用响应式模式实现
参考[Responsive Patterns](http://bradfrost.github.io/this-is-responsive/patterns.html),尝试翻译整理以及改变实现方式尽可能兼容更多的浏览器
##布局
###Reflowing Layouts
- [Mostly Fluid](http://miaojing.github.io/responsive/1.0/demo/layout/Mostly-Fluid.htm)
- [Column Drop](http://miaojing.github.io/responsive/1.0/demo/layout/Column-Drop.htm)
- [Layout Shifter](http://miaojing.github.io/responsive/1.0/demo/layout/Layout-Shifter.htm)
- [Tiny Tweaks](http://miaojing.github.io/responsive/1.0/demo/layout/Tiny-Tweaks.htm)
- [Main column with sidebar](http://miaojing.github.io/responsive/1.0/demo/layout/Main-column-with-sidebar.htm)
- [3 column](http://miaojing.github.io/responsive/1.0/demo/layout/3-Column-Layout.htm)
- [3 column v2](http://miaojing.github.io/responsive/1.0/demo/layout/3-Column-Layout-v2.html)

###Equal Width
- [2 equal-width columns](http://miaojing.github.io/responsive/1.0/demo/layout/2-Equal-Width-Columns.htm)
- [3 equal-width columns](http://miaojing.github.io/responsive/1.0/demo/layout/3-Equal-Width-Columns.htm)
- [4 equal-width columns](http://miaojing.github.io/responsive/1.0/demo/layout/4-Equal-Width-Columns.htm)
- [5 equal-width columns](http://miaojing.github.io/responsive/1.0/demo/layout/5-Equal-Width-Columns.htm)

###Off Canvas
- [Top](http://miaojing.github.io/responsive/1.0/demo/layout/Off-Canvas-Top.htm)
- [Left](http://miaojing.github.io/responsive/1.0/demo/layout/Off-Canvas-Left.htm)
- [Right](http://miaojing.github.io/responsive/1.0/demo/layout/Off-Canvas-Right.htm)
- [Left and Right](http://miaojing.github.io/responsive/1.0/demo/layout/Off-Canvas-Right.htm)
- [Bottom](http://miaojing.github.io/responsive/1.0/demo/layout/layout-offcanvas-footer-nav.html)

###Source-Order Shift
- [Table Cell](http://miaojing.github.io/responsive/1.0/demo/layout/source-table-cell.html)
- [AppendAround](http://miaojing.github.io/responsive/1.0/demo/layout/layout-append-around.html)

###Lists
- [List with Thumbnails](http://miaojing.github.io/responsive/1.0/demo/layout/list-img-text.html)
- [List with Thumbnails 2](http://miaojing.github.io/responsive/1.0/demo/layout/list-img-text-2.html)
- [List with Thumbnails and Summary](http://miaojing.github.io/responsive/1.0/demo/layout/list-img-summary.html)

###Grid Block
- [4-up Grid Block](http://miaojing.github.io/responsive/1.0/demo/layout/img-grid.html)
- [Double-Wide v1](http://miaojing.github.io/responsive/1.0/demo/layout/grid-dw.html)
- [Double-Wide v2](http://miaojing.github.io/responsive/1.0/demo/layout/grid-dw-2.html)
- [Double-Wide v3](http://miaojing.github.io/responsive/1.0/demo/layout/grid-dw-3.html)
- [Double-Wide v4](http://miaojing.github.io/responsive/1.0/demo/layout/grid-dw-4.html)
- [With Title Sections](http://miaojing.github.io/responsive/1.0/demo/layout/grid-title.html)
- [Equal Height Rows](http://miaojing.github.io/responsive/1.0/demo/layout/img-landscape.html)
- [Irregular Grid Blocks](http://miaojing.github.io/responsive/1.0/demo/layout/grid-regular.html)

###Table
- [Responsive Table](http://css-tricks.com/examples/ResponsiveTables/responsive.php)
- [Definition List to Table](http://jsbin.com/arixic)
- [Data- Table to List](http://miaojing.github.io/responsive/1.0/demo/table/un-doing-tables.htm)
- [Pie Chart to Table](http://miaojing.github.io/responsive/1.0/demo/table/responsive-tables-chart.htm)
- [Priority Columns](http://filamentgroup.com/examples/rwd-table-patterns/)
- [Link to Full-Table](http://miaojing.github.io/responsive/1.0/demo/table/responsiveble-tabularcation.htm)
- [Horizontal Overflow](http://miaojing.github.io/responsive/1.0/demo/table/responsive-tables.htm)
- [Header Orientation Flip](http://miaojing.github.io/responsive/1.0/demo/table/responsive-tables-1.htm)

##导航
###单层
- [Toggle](http://miaojing.github.io/responsive/1.0//demo/navigation/Single-Level/Toggle-Navigation.htm)
- [Footer Anchor](http://miaojing.github.io/responsive/1.0//demo/navigation/Single-Level/Footer-Anchor.htm.htm)
- [Select Menu](http://miaojing.github.io/responsive/1.0//demo/navigation/Single-Level/Select-Menu.htm)
- [Left Nav Flyout](http://miaojing.github.io/responsive/1.0//demo/navigation/Single-Level/left-flyout-navigation.htm)
- [Left Nav Flyout w/ 'off-nav closing'](http://miaojing.github.io/responsive/1.0//demo/navigation/Single-Level/The-Left-Nav-Flyout.htm)
- [Priority+](http://miaojing.github.io/responsive/1.0//demo/navigation/Single-Level/Priority+-Navigation.htm)
- [Top Links](http://miaojing.github.io/responsive/1.0//demo/navigation/Single-Level/A-Pen-by-bradfrost.htm)

###[多层](/1.0/guide/multinav.md)
- [多级导航1](http://miaojing.github.io/responsive/1.0/demo/navigation/Multi-Level/multinav-exIE6-1.htm "")
- [多级导航2](http://miaojing.github.io/responsive/1.0/demo/navigation/Multi-Level/multinav-exIE6-3.htm "")
- [多级导航3](http://miaojing.github.io/responsive/1.0/demo/navigation/Multi-Level/multinav-exIE6-5.htm "")
- [多级导航4](http://miaojing.github.io/responsive/1.0/demo/navigation/Multi-Level/multinav-exIE6-6.htm "")
- [多级导航 支持IE6](http://miaojing.github.io/responsive/1.0/demo/navigation/Multi-Level/multinav.htm "")

###面包屑
- [Across the Top](http://miaojing.github.io/responsive/1.0/demo/navigation/Breadcrumbs/Across-the-Top-Breadcrumbs.htm)
- [Breadcrumbs Dropdown](http://miaojing.github.io/responsive/1.0/demo/navigation/Breadcrumbs/Dropdown-Breadcrumbs.htm)
- [Last-One Only](http://miaojing.github.io/responsive/1.0/demo/navigation/Breadcrumbs/Last-One-Only-Breadcrumbs.htm)

##图片
- [Basic Fluid Image](http://miaojing.github.io/responsive/1.0//demo/image/Landscape-Image.htm)
- [Image Grid](http://miaojing.github.io/responsive/1.0/demo/image/Image-Grid.htm)

##多媒体
- [Fluid Video](http://miaojing.github.io/responsive/1.0//demo/media/Fluid-Video.htm)
- [Fluid Map Maintaining Aspect Ratio](http://miaojing.github.io/responsive/1.0/demo/media/Fluid-Map-Maintaining-Aspect-Ratio.htm)
- [Adaptive Maps](http://miaojing.github.io/responsive/1.0/demo/media/Adaptive-Map.htm)

##表单
- [基础响应式表单](http://miaojing.github.io/responsive/1.0/demo/sampleform.html "基础响应式表单")
- [搜索框响应式](http://miaojing.github.io/responsive/1.0/demo/searchform.html "搜索框响应式")
- [Search with Filters](http://miaojing.github.io/responsive/1.0/demo/form/Filtered-Search-RWD-Pattern.htm)

##模块
###Switchable
 - [3-up Carousel](http://miaojing.github.io/responsive/1.0/demo/modules/3-up-Carousel.htm)
 - [Fluid Carousel](http://miaojing.github.io/responsive/1.0/demo/modules/Fluid-Carousel.htm)

###Accordion
- [Fluid](http://miaojing.github.io/responsive/1.0/demo/modules/fluid-Accordion.htm)
- [Accordion to Full](http://miaojing.github.io/responsive/1.0/demo/modules/Accordion-to-Full.htm)
- [Accordion To Tab](http://miaojing.github.io/responsive/1.0/demo/modules/Responsive-Accordian-to-Tabs.htm)
- [Vertical to Horizontal](http://miaojing.github.io/responsive/1.0/demo/modules/Responsive-Accordian-to-Accordian.htm)

###Messaging
- [Slide-Down Notification Bar](http://miaojing.github.io/responsive/1.0/demo/modules/Slide-Down-Notification-Bar.htm)

###Lightbox
- [Conditional Lightbox](http://miaojing.github.io/responsive/1.0/demo/modules/Conditional-Lightbox-for-Responsive-Design.htm)

#作者们
妙净、墨峰、李杰、乐淘、邓萌、基德、雨异、春龙、紫溪等，欢迎感兴趣的亲们直接fork代码改之：）

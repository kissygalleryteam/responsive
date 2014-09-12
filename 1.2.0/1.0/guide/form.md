表单响应式使用说明
==================

概述
----
表单响应式，兼容各大主流浏览器（包括IE6-8），兼容实现使用`@妙净` 的`MediaqueryPolyfill`，详细使用方法请参看[media query兼容（ie8-）实现](https://github.com/miaojing/responsive/blob/master/1.0/guide/mediaquerypolyfill.md "media query兼容（ie8-）实现")，在此不多做赘述。

普通Form结构
-----------
本结构参考BootStrap表单结构，具体如下：

    <form action="" class="simpleform">
		<div class="control-group">
			<label for="input1" class="control-label">姓名：</label>
			<div class="control">
				<input type="text" name="" id="input1" placeholder="输入真实姓名">
			</div>
		</div>
		<div class="control-group">
			<label for="input2" class="control-label">邮箱：</label>
			<div class="control">
				<input type="text" name="" id="input2" placeholder="输入您的常用邮箱地址">
			</div>
		</div>
		<div class="control-group">
			<label for="input3" class="control-label">消息：</label>
			<div class="control">
				<textarea name="" id="input3" cols="30" rows="10" placeholder="填写消息内容"></textarea>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">您的选择：</label>
			<div class="control">
				<label for="choiceone" class="choice-label">
					<input type="radio" name="choice" id="choiceone" value="">第一选择
				</label>
				<label for="choicetwo" class="choice-label">
					<input type="radio" id="choicetwo" name="choice" value="">第二选择
				</label>
				<label for="choicethree" class="choice-label">
					<input type="radio" id="choicethree" name="choice" value="">第三选择
				</label>
			</div>
		</div>
		<div class="control-group">
			<label for="input3" class="control-label">可以多选：</label>
			<div class="control">
				<label for="multone" class="choice-label">
					<input type="checkbox" name="mult" id="multone" value="">第一选择
				</label>
				<label for="multtwo" class="choice-label">
					<input type="checkbox" id="multtwo" name="mult" value="">第二选择
				</label>
				<label for="multthree" class="choice-label">
					<input type="checkbox" id="multthree" name="mult" value="">第三选择
				</label>
			</div>
		</div>
	</form>

搜索表单结构
----------

	<form action="" class="searchform">
		<div class="control-group">
			<div class="control">
				<input type="text" name="key" id="" class="full-input" placeholder="输入搜索关键字">
			</div>
			<input type="submit" class="search-btn" value="搜 索">
		</div>
	</form>

其他
----
本普通表单demo演示代码请[点击查看](http://miaojing.github.io/responsive/1.0/demo/sampleform.html),demo只提供两种尺寸vw700和vw990，实际使用可根据具体情况自行添加删除尺寸，在通过调用`MediaqueryPolyfill`方法实现IE8-兼容。

搜索表单demo代码请[点击查看](http://miaojing.github.io/responsive/1.0/demo/searchform.html)，此demo不依赖脚本实现兼容IE8-。
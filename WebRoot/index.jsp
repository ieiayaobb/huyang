<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>demo</title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<script charset="utf-8" src="plugin/kindeditor-4.1.4/kindeditor.js"></script>
	<script charset="utf-8" src="plugin/kindeditor-4.1.4/lang/zh_CN.js"></script>
	<script type="text/javascript" src="js/jquery-1.8.3.js"></script>
	<!--<script type="text/javascript" src="plugin/CLEditor1_3_0/jquery.cleditor.js"></script>-->
	<script type="text/javascript" src="plugin/jquery-ui-1.10.0.custom/js/jquery-ui-1.10.0.custom.js"></script>
	<link rel="stylesheet" href="plugin/zTree/css/zTreeStyle/zTreeStyle.css" type="text/css">
	<link rel="stylesheet" type="text/css" href="plugin/CLEditor1_3_0/jquery.cleditor.css" />
	<link rel="stylesheet" type="text/css" href="plugin/jquery-ui-1.10.0.custom/css/smoothness/jquery-ui-1.10.0.custom.css" />
	<link rel="stylesheet" type="text/css" href="css/index.css" />
	<script type="text/javascript" src="plugin/zTree/js/jquery.ztree.core-3.5.js"></script>
	<script>
		$(document).ready(function(){
			var editor;
			KindEditor.ready(function(K) {
				editor = K.create('textarea[name="content"]', {
					resizeType : 0,
					allowPreviewEmoticons : false,
					allowImageUpload : false,
					items : [
						'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
						'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
						'insertunorderedlist', '|', 'emoticons', 'image', 'link']
				});
			});
	        /*$("#input").cleditor({
	          width:        596, // width not including margins, borders or padding
	          height:       560, // height not including margins, borders or padding
	          controls:     // controls to add to the toolbar
	                        "bold italic underline strikethrough subscript superscript | font size " +
	                        "style | color highlight removeformat | bullets numbering | outdent " +
	                        "indent | alignleft center alignright justify | undo redo | " +
	                        "rule image table link unlink | cut copy paste pastetext | print source",
	          colors:       // colors in the color popup
	                        "FFF FCC FC9 FF9 FFC 9F9 9FF CFF CCF FCF " +
	                        "CCC F66 F96 FF6 FF3 6F9 3FF 6FF 99F F9F " +
	                        "BBB F00 F90 FC6 FF0 3F3 6CC 3CF 66C C6C " +
	                        "999 C00 F60 FC3 FC0 3C0 0CC 36F 63F C3C " +
	                        "666 900 C60 C93 990 090 399 33F 60C 939 " +
	                        "333 600 930 963 660 060 366 009 339 636 " +
	                        "000 300 630 633 330 030 033 006 309 303",    
	          fonts:        // font names in the font popup
	                        "Arial,Arial Black,Comic Sans MS,Courier New,Narrow,Garamond," +
	                        "Georgia,Impact,Sans Serif,Serif,Tahoma,Trebuchet MS,Verdana",
	          sizes:        // sizes in the font size popup
	                        "1,2,3,4,5,6,7",
	          styles:       // styles in the style popup
	                        [["Paragraph", "<p>"], ["Header 1", "<h1>"], ["Header 2", "<h2>"],
	                        ["Header 3", "<h3>"],  ["Header 4","<h4>"],  ["Header 5","<h5>"],
	                        ["Header 6","<h6>"]],
	          useCSS:       false, // use CSS to style HTML when possible (not supported in ie)
	          docType:      // Document type contained within the editor
	                        '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
	          docCSSFile:   // CSS file used to style the document contained within the editor
	                        "", 
	          bodyStyle:    // style to assign to document body contained within the editor
	                        "font:10pt Arial,Verdana; cursor:text"
	        });*/
	        
			var setting = {
				callback : {
					onMouseDown : function(event, treeId, treeNode) {
						var topOffset = $("iframe").contents().find("h1").eq(window.zTreeObj.getNodeIndex(treeNode))[0].offsetTop;
						 $("iframe").contents().find("body").scrollTop(topOffset);
					}
				}
			};
			var nodes = [
			];
			window.zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, nodes);
			
			var requestXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+
			"<GetPictureWithDataReq>"+
				"<type>A</type>"+
				"<year>2013</year>"+
				"<month>01</month>"+
				"<point>1</point>"+
			"</GetPictureWithDataReq>";
			
			$( "#radio" ).buttonset();
			$( "#dialog" ).dialog({ autoOpen: false });
			/*$( "#document" ).button();
			$( "#system" ).button();
			$( "#report" ).button();
			$( "#search" ).button();
			$( "#compute" ).button();
			$( "#help" ).button();*/
		});
	</script>
  </head>
  
  <body>
  	<div class="hd">
  		<div class="menu">
  			<a href="" id="document">文档管理</a>
  			<a href="" id="system">系统管理</a>
  			<a href="" id="report">报告编制</a>
  			<a href="" id="search">查询浏览</a>
  			<a href="" id="compute">计算工具</a>
  			<a href="" id="help">联机帮助</a>
  		</div>
  		<div class="tab">
  			<div id="radio">
			    <input type="radio" id="radio1" name="radio" checked="checked" /><label for="radio1">封皮制作</label>
			    <input type="radio" id="radio2" name="radio" /><label for="radio2">目录制作</label>
			    <input type="radio" id="radio3" name="radio" /><label for="radio3">报告制作</label>
			</div>
  		</div>
  	</div>
  	<div class="bd">
	  	<div class="side">
	  		<div class="side-title">菜单栏</div>
	  		<ul id="treeDemo" class="ztree"></ul>
	  	</div>
	  	<div class="main">
	  		<div class="main-title">报告题目与章节显示</div>
			<textarea name="content" style="width:600px;height:560px;visibility:hidden;"></textarea>
	    	<!--<textarea id="input" name="input"></textarea>-->
	    </div>
	    <div class="extra">
	    	<div class="extra-title">计算分析工具</div>
	    </div>
    </div>
    <div class="ft"></div>
	    <div id="dialog" title="Dialog Title">
	    <div>
			<fieldset id="function">
				<legend>功能</legend>
				<div class="kv">
					<span class="label">图形：</span>
					<div class="value">
						<select>
							<option>大坝张力图</option>
							<option>水位图</option>
							<option>地震响应图	</option>
						</select>
					</div>
				</div>
			</fieldset>
			<fieldset id="date">
				<legend>属性</legend>
				<div class="kv">
					<span class="label">年：</span>
					<div class="value">
						<select>
							<option>2010</option>
							<option>2011</option>
							<option>2012</option>
						</select>
					</div>
				</div>
				<div class="kv">
					<span class="label">月：</span>
					<div class="value">
						<select>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
							<option>6</option>
							<option>7</option>
							<option>8</option>
							<option>9</option>
							<option>10</option>
							<option>11</option>
							<option>12</option>
						</select>
					</div>
				</div>
				<div class="kv">
					<span class="label">测点:</span>
					<div class="value">
						<select>
							<option>测点一</option>
							<option>测点二</option>
							<option>测点三</option>
							<option>测点四</option>
						</select>
					</div>
				</div>
			</fieldset>
	    </div>
    </div>
  </body>
</html>


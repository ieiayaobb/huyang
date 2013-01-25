<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>demo</title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<!--<script charset="utf-8" src="plugin/kindeditor-4.1.4/kindeditor.js"></script>
	<script charset="utf-8" src="plugin/kindeditor-4.1.4/lang/zh_CN.js"></script>-->
	<script type="text/javascript" src="js/jquery-1.8.3.js"></script>
	<script type="text/javascript" src="plugin/CLEditor1_3_0/jquery.cleditor.js"></script>
	<link rel="stylesheet" href="plugin/zTree/css/zTreeStyle/zTreeStyle.css" type="text/css">
	<link rel="stylesheet" type="text/css" href="plugin/CLEditor1_3_0/jquery.cleditor.css" />
	<script type="text/javascript" src="plugin/zTree/js/jquery.ztree.core-3.5.js"></script>
	<script>
		$(document).ready(function(){
	        $("#input").cleditor({
	          width:        500, // width not including margins, borders or padding
	          height:       250, // height not including margins, borders or padding
	          controls:     // controls to add to the toolbar
	                        "bold italic underline strikethrough subscript superscript | font size " +
	                        "style | color highlight removeformat | bullets numbering | outdent " +
	                        "indent | alignleft center alignright justify | undo redo | " +
	                        "rule image link unlink | cut copy paste pastetext | print source",
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
	                        "margin:4px; font:10pt Arial,Verdana; cursor:text"
	        });
			var setting = {
				callback : {
					onMouseDown : function(event, treeId, treeNode) {
						var topOffset = $("iframe").contents().find("h1").eq(window.zTreeObj.getNodeIndex(treeNode))[0].offsetTop;
						 $("iframe").contents().find("body").scrollTop(topOffset);
					}
				}
			};
			var zNodes =[
				
			];
			window.zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
			
			$.ajax({
				url : "http://ieiayaobb.vicp.net:8088/GetPictureWithData",
				method : "post",
				success : function(data){
					console.log(data)
				}
			});
		});
	</script>
  </head>
  
  <body>
  	<div class="hd"></div>
  	<div class="bd">
	  	<div class="side">
	  		<ul id="treeDemo" class="ztree"></ul>
	  	</div>
	  	<div class="main">
	    	<textarea id="input" name="input"></textarea>
	    </div>
    </div>
    <div class="ft"></div>
  </body>
</html>


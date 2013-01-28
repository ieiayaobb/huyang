/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('image', function(K) {
	var self = this, name = 'image',
		allowImageUpload = K.undef(self.allowImageUpload, true),
		formatUploadUrl = K.undef(self.formatUploadUrl, true),
		allowFileManager = K.undef(self.allowFileManager, false),
		uploadJson = K.undef(self.uploadJson, self.basePath + 'php/upload_json.php'),
		imageTabIndex = K.undef(self.imageTabIndex, 0),
		imgPath = self.pluginsPath + 'image/images/',
		extraParams = K.undef(self.extraFileUploadParams, {}),
		filePostName = K.undef(self.filePostName, 'imgFile'),
		fillDescAfterUploadImage = K.undef(self.fillDescAfterUploadImage, false),
		lang = self.lang(name + '.');

	self.plugin.imageDialog = function(options) {
		var imageUrl = options.imageUrl,
			imageWidth = K.undef(options.imageWidth, ''),
			imageHeight = K.undef(options.imageHeight, ''),
			imageTitle = K.undef(options.imageTitle, ''),
			imageAlign = K.undef(options.imageAlign, ''),
			showRemote = K.undef(options.showRemote, true),
			showLocal = K.undef(options.showLocal, true),
			tabIndex = K.undef(options.tabIndex, 0),
			clickFn = options.clickFn;
		var target = 'kindeditor_upload_iframe_' + new Date().getTime();
		var hiddenElements = [];
		for(var k in extraParams){
			hiddenElements.push('<input type="hidden" name="' + k + '" value="' + extraParams[k] + '" />');
		}
		/*var html = [
			'<div style="padding:20px;">',
			//tabs
			'<div class="tabs"></div>',
			//remote image - start
			'<div class="tab1" style="display:none;">',
			//url
			'<div class="ke-dialog-row">',
			'<label for="remoteUrl" style="width:60px;">' + lang.remoteUrl + '</label>',
			'<input type="text" id="remoteUrl" class="ke-input-text" name="url" value="" style="width:200px;" /> &nbsp;',
			'<span class="ke-button-common ke-button-outer">',
			'<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + lang.viewServer + '" />',
			'</span>',
			'</div>',
			//size
			'<div class="ke-dialog-row">',
			'<label for="remoteWidth" style="width:60px;">' + lang.size + '</label>',
			lang.width + ' <input type="text" id="remoteWidth" class="ke-input-text ke-input-number" name="width" value="" maxlength="4" /> ',
			lang.height + ' <input type="text" class="ke-input-text ke-input-number" name="height" value="" maxlength="4" /> ',
			'<img class="ke-refresh-btn" src="' + imgPath + 'refresh.png" width="16" height="16" alt="" style="cursor:pointer;" title="' + lang.resetSize + '" />',
			'</div>',
			//align
			'<div class="ke-dialog-row">',
			'<label style="width:60px;">' + lang.align + '</label>',
			'<input type="radio" name="align" class="ke-inline-block" value="" checked="checked" /> <img name="defaultImg" src="' + imgPath + 'align_top.gif" width="23" height="25" alt="" />',
			' <input type="radio" name="align" class="ke-inline-block" value="left" /> <img name="leftImg" src="' + imgPath + 'align_left.gif" width="23" height="25" alt="" />',
			' <input type="radio" name="align" class="ke-inline-block" value="right" /> <img name="rightImg" src="' + imgPath + 'align_right.gif" width="23" height="25" alt="" />',
			'</div>',
			//title
			'<div class="ke-dialog-row">',
			'<label for="remoteTitle" style="width:60px;">' + lang.imgTitle + '</label>',
			'<input type="text" id="remoteTitle" class="ke-input-text" name="title" value="" style="width:200px;" />',
			'</div>',
			'</div>',
			//remote image - end
			//local upload - start
			'<div class="tab2" style="display:none;">',
			'<iframe name="' + target + '" style="display:none;"></iframe>',
			'<form class="ke-upload-area ke-form" method="post" enctype="multipart/form-data" target="' + target + '" action="' + K.addParam(uploadJson, 'dir=image') + '">',
			//file
			'<div class="ke-dialog-row">',
			hiddenElements.join(''),
			'<label style="width:60px;">' + lang.localUrl + '</label>',
			'<input type="text" name="localUrl" class="ke-input-text" tabindex="-1" style="width:200px;" readonly="true" /> &nbsp;',
			'<input type="button" class="ke-upload-button" value="' + lang.upload + '" />',
			'</div>',
			'</form>',
			'</div>',
			//local upload - end
			'</div>'
		].join('');*/
		var html = [
			'<div class="dialog">',
				'<fieldset id="funciton">',
					'<legend>功能</legend>',
					'<div class="kv">',
						'<span class="label">图形：</span>',
						'<div class="value">',
							'<select>',
								'<option>请选择</option>',
								'<option>大坝压力图</option>',
								'<option>地震数据图</option>',
							'</select>',
						'</div>',
					'</div>',
				'</fieldset>',
				'<fieldset id="date" style="display:none;">',
					'<legend>属性</legend>',
					'<div class="start">',
						'<span>起始：</span>',
						'<div class="kv">',
							'<span class="label">年：</span>',
							'<div class="value">',
								'<select>',
									'<option>2005</option>',
									'<option>2006</option>',
								'</select>',
							'</div>',
						'</div>',
						'<div class="kv">',
							'<span class="label">月：</span>',
							'<div class="value">',
								'<select>',
									'<option>1</option>',
									'<option>2</option>',
									'<option>3</option>',
									'<option>4</option>',
									'<option>5</option>',
									'<option>6</option>',
									'<option>7</option>',
									'<option>8</option>',
									'<option>9</option>',
									'<option>10</option>',
									'<option>11</option>',
									'<option>12</option>',
								'</select>',
							'</div>',
						'</div>',
					'</div>',
					'<div class="end">',
						'<span>结束：</span>',
						'<div class="kv">',
							'<span class="label">年：</span>',
							'<div class="value">',
								'<select>',
									'<option>2005</option>',
									'<option>2006</option>',
								'</select>',
							'</div>',
						'</div>',
						'<div class="kv">',
							'<span class="label">月：</span>',
							'<div class="value">',
								'<select>',
									'<option>1</option>',
									'<option>2</option>',
									'<option>3</option>',
									'<option>4</option>',
									'<option>5</option>',
									'<option>6</option>',
									'<option>7</option>',
									'<option>8</option>',
									'<option>9</option>',
									'<option>10</option>',
									'<option>11</option>',
									'<option>12</option>',
								'</select>',
							'</div>',
						'</div>',
					'</div>',
					'<div class="kv point">',
						'<span class="label">测点:</span>',
						'<div class="value">',
							'<select>',
								'<option point="1">测点一</option>',
								//'<option point="2">测点二</option>',
								//'<option point="3">测点三</option>',
								//'<option point="4">测点四</option>',
							'</select>',
						'</div>',
					'</div>',
				'</fieldset>',
			'</div>'
		].join('');
		var dialogWidth = showLocal || allowFileManager ? 300 : 250,
			dialogHeight = showLocal && showRemote ? 350 : 300;
		var dialog = self.createDialog({
			name : name,
			width : dialogWidth,
			height : dialogHeight,
			title : self.lang(name),
			body : html,
			yesBtn : {
				name : self.lang('yes'),
				click : function(e) {
					// Bugfix: http://code.google.com/p/kindeditor/issues/detail?id=319
					if (dialog.isLoading) {
						return;
					}
					// insert local image
					/*if (showLocal && showRemote && tabs && tabs.selectedIndex === 1 || !showRemote) {
						if (uploadbutton.fileBox.val() == '') {
							alert(self.lang('pleaseSelectFile'));
							return;
						}
						dialog.showLoading(self.lang('uploadLoading'));
						uploadbutton.submit();
						localUrlBox.val('');
						return;
					}*/
					// insert remote image
					/*var url = K.trim(urlBox.val()),
						width = widthBox.val(),
						height = heightBox.val(),
						title = titleBox.val(),
						align = '';*/
					/*alignBox.each(function() {
						if (this.checked) {
							align = this.value;
							return false;
						}
					});*/
					/*if (url == 'http://' || K.invalidUrl(url)) {
						alert(self.lang('invalidUrl'));
						urlBox[0].focus();
						return;
					}*/
					//url = "image/0" + Math.round(Math.random() * 5)+ ".jpg";
					
					/*console.log($("#function").find("select").val());
					console.log();
					console.log($("#date").find("select:eq(1)").val());
					console.log($("#date").find("select:eq(2)"));*/
					
					var startYear = parseInt($("#date .start").find("select:eq(0)").val(),10);
					var startMonth = parseInt($("#date .start").find("select:eq(1)").val(),10);
					var endYear = parseInt($("#date .end").find("select:eq(0)").val(),10);
					var endMonth = parseInt($("#date .end").find("select:eq(1)").val(),10);
					/*console.log(startYear)
					console.log(startMonth)
					console.log(endYear)
					console.log(endMonth)*/
					
					var type;
					
					if(startYear > endYear){
						alert("起始日期要小于结束日期！");
					}else if(startYear == endYear && endMonth <= startMonth){
						alert("起始日期要小于结束日期！");
					}else if(startYear == "2005" && startMonth == "1"){
						alert("起始从2005年2月开始");
					}else{
						if($("#funciton").find("select").val() == "大坝压力图"){
							type = "A";
						}else if($("#funciton").find("select").val() == "地震数据图"){
							type = "B";
						}else{
							throw Error("No Type!");
						}
					
						var requestXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+
						"<GetPictureWithDataReq>"+
							"<type>" + type + "</type>"+
							"<startYear>" + startYear + "</startYear>"+
							"<startMonth>" + startMonth + "</startMonth>"+
							"<endYear>" + endYear + "</endYear>"+
							"<endMonth>" + endMonth + "</endMonth>"+
							"<point>1</point>"+
						"</GetPictureWithDataReq>";
						console.log(requestXML);
						
						var url = "";
						
						$.ajax({
							url : "http://localhost:8088/Server/XML/GetPictureWithData",
							type : "post",
							data : requestXML,
							success : function(data){
								url = $(data).find("GetPictureWithDataResp").find("pictureData").find("url").text();
								console.log(url);
								width = "200";
								height = "150";
								title = "";
								align = '';
								clickFn.call(self, url, title, width, height, 0, align);
							}
						});
					}
					/*if (!/^\d*$/.test(width)) {
						alert(self.lang('invalidWidth'));
						widthBox[0].focus();
						return;
					}
					if (!/^\d*$/.test(height)) {
						alert(self.lang('invalidHeight'));
						heightBox[0].focus();
						return;
					}*/
					
				}
			},
			beforeRemove : function() {
				viewServerBtn.unbind();
				widthBox.unbind();
				heightBox.unbind();
				refreshBtn.unbind();
			}
		}),
		div = dialog.div;
		
		
		$(".dialog fieldset:eq(0) select").live("change",function(){
			$(".dialog fieldset:eq(1)").show();
		})

		var urlBox = K('[name="url"]', div),
			localUrlBox = K('[name="localUrl"]', div),
			viewServerBtn = K('[name="viewServer"]', div),
			widthBox = K('.tab1 [name="width"]', div),
			heightBox = K('.tab1 [name="height"]', div),
			refreshBtn = K('.ke-refresh-btn', div),
			titleBox = K('.tab1 [name="title"]', div),
			alignBox = K('.tab1 [name="align"]', div);

		var tabs;
		if (showRemote && showLocal) {
			tabs = K.tabs({
				src : K('.tabs', div),
				afterSelect : function(i) {}
			});
			tabs.add({
				title : lang.remoteImage,
				panel : K('.tab1', div)
			});
			tabs.add({
				title : lang.localImage,
				panel : K('.tab2', div)
			});
			tabs.select(tabIndex);
		} else if (showRemote) {
			K('.tab1', div).show();
		} else if (showLocal) {
			K('.tab2', div).show();
		}

		/*var uploadbutton = K.uploadbutton({
			button : K('.ke-upload-button', div)[0],
			fieldName : filePostName,
			form : K('.ke-form', div),
			target : target,
			width: 60,
			afterUpload : function(data) {
				dialog.hideLoading();
				if (data.error === 0) {
					var url = data.url;
					if (formatUploadUrl) {
						url = K.formatUrl(url, 'absolute');
					}
					if (self.afterUpload) {
						self.afterUpload.call(self, url, data, name);
					}
					if (!fillDescAfterUploadImage) {
						clickFn.call(self, url, data.title, data.width, data.height, data.border, data.align);
					} else {
						K(".ke-dialog-row #remoteUrl", div).val(url);
						K(".ke-tabs-li", div)[0].click();
						K(".ke-refresh-btn", div).click();
					}
				} else {
					alert(data.message);
				}
			},
			afterError : function(html) {
				dialog.hideLoading();
				self.errorDialog(html);
			}
		});
		uploadbutton.fileBox.change(function(e) {
			localUrlBox.val(uploadbutton.fileBox.val());
		});
		if (allowFileManager) {
			viewServerBtn.click(function(e) {
				self.loadPlugin('filemanager', function() {
					self.plugin.filemanagerDialog({
						viewType : 'VIEW',
						dirName : 'image',
						clickFn : function(url, title) {
							if (self.dialogs.length > 1) {
								K('[name="url"]', div).val(url);
								if (self.afterSelectFile) {
									self.afterSelectFile.call(self, url);
								}
								self.hideDialog();
							}
						}
					});
				});
			});
		} else {
			viewServerBtn.hide();
		}
		var originalWidth = 0, originalHeight = 0;
		function setSize(width, height) {
			widthBox.val(width);
			heightBox.val(height);
			originalWidth = width;
			originalHeight = height;
		}
		refreshBtn.click(function(e) {
			var tempImg = K('<img src="' + urlBox.val() + '" />', document).css({
				position : 'absolute',
				visibility : 'hidden',
				top : 0,
				left : '-1000px'
			});
			tempImg.bind('load', function() {
				setSize(tempImg.width(), tempImg.height());
				tempImg.remove();
			});
			K(document.body).append(tempImg);
		});
		widthBox.change(function(e) {
			if (originalWidth > 0) {
				heightBox.val(Math.round(originalHeight / originalWidth * parseInt(this.value, 10)));
			}
		});
		heightBox.change(function(e) {
			if (originalHeight > 0) {
				widthBox.val(Math.round(originalWidth / originalHeight * parseInt(this.value, 10)));
			}
		});
		urlBox.val(options.imageUrl);
		setSize(options.imageWidth, options.imageHeight);
		titleBox.val(options.imageTitle);
		alignBox.each(function() {
			if (this.value === options.imageAlign) {
				this.checked = true;
				return false;
			}
		});
		if (showRemote && tabIndex === 0) {
			urlBox[0].focus();
			urlBox[0].select();
		}
		return dialog;*/
	};
	self.plugin.image = {
		edit : function() {
			var img = self.plugin.getSelectedImage();
			self.plugin.imageDialog({
				imageUrl : img ? img.attr('data-ke-src') : 'http://',
				imageWidth : img ? img.width() : '',
				imageHeight : img ? img.height() : '',
				imageTitle : img ? img.attr('title') : '',
				imageAlign : img ? img.attr('align') : '',
				showRemote : true,
				showLocal : allowImageUpload,
				tabIndex: img ? 0 : imageTabIndex,
				clickFn : function(url, title, width, height, border, align) {
					self.exec('insertimage', url, title, width, height, border, align);
					// Bugfix: [Firefox] 上传图片后，总是出现正在加载的样式，需要延迟执行hideDialog
					setTimeout(function() {
						self.hideDialog().focus();
					}, 0);
				}
			});
		},
		'delete' : function() {
			var target = self.plugin.getSelectedImage();
			if (target.parent().name == 'a') {
				target = target.parent();
			}
			target.remove();
		}
	};
	self.clickToolbar(name, self.plugin.image.edit);
});

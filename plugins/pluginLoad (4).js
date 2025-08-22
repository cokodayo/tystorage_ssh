(function(){
	var pluginPath = 'plugins/code.html?v='+parseInt(new Date().getTime()/(1000*60));
	var Ajax={
			get: function(url, fn) {
					var xhr = new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据
					xhr.open('GET', url, true);
					xhr.onreadystatechange = function() {
							if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { // readyState == 4说明请求已完成
									fn.call(this, xhr.responseText);  //从服务器获得数据
							}
					};
					xhr.send();
			}
	};
	
	if (typeof jQuery != 'undefined') {
		$.get(pluginPath,function(html){
			$('body').append(html);	
		});
	}else{
		Ajax.get(pluginPath,function(html){
			var appendHTML  = function(el, html){
					var divTemp = document.createElement("div"), nodes = null
							// 文档片段，一次性append，提高性能
							, fragment = document.createDocumentFragment();
					divTemp.innerHTML = html;
					nodes = divTemp.childNodes;
					for (var i=0, length=nodes.length; i<length; i+=1) {
						 if('SCRIPT'==nodes[i].tagName){
								var script = document.createElement("script")
								script.type = "text/javascript";
								if(nodes[i].src!=''){
									script.src = nodes[i].src;
								}else{
									script.innerHTML = nodes[i].innerHTML;
								}
								//log(nodes[i].src);
								fragment.appendChild(script);
						 }else{
								fragment.appendChild(nodes[i].cloneNode(true)); 
						 }
					}
					el.appendChild(fragment);
					// 据说下面这样子世界会更清净
					nodes = null;
					fragment = null;
			};
			
			var el = document.body;
			appendHTML(el,html);
		});
	}
})();
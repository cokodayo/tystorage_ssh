// JavaScript Document



// tab 切换
function showTab(tab,content,tabClass,contentClass){
	if(!tabClass){
		tabClass='';
	}
	if(!contentClass){
		contentClass='';
	}
	$(tab).each(function(index, element) {
		$(this).on("mouseover",function(){
			$(this).addClass('show '+tabClass).siblings().removeClass('show '+tabClass);
	
			$(content).eq(index).addClass('show '+contentClass).siblings().removeClass('show '+tabClass);
		})
	});	
}

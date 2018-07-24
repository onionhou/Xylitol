
function $id(id){
	return document.getElementById(id);
}
function $className(name){
	return document.getElementsByClassName(name);
}
function $tagName(name){
	return document.getElementsByTagName(name);
}
var aspectRatio = {
	//网页可见区域
	clientWidth : function(){
		return document.body.clientWidth;
	},
	clientHeight : function(){
		return document.body.clientHeight;
	},
	offsetWidth : function(){
		return document.body.offsetWidth;
	},
	offsetHeight : function(){
		return document.body.offsetHeight;
	},
	//网页正文全文
	scrollWidth : function(){
		return document.body.scrollWidth;
	},
	scrollHeight : function(){
		return document.body.scrollHeight;
	},
	//网页被卷上去的
	scrollTop : function(){
		return document.body.scrollTop;
	},
	scrollLeft : function(){
		return document.body.scrollLeft;
	},
	//网页正文部分上,
	snTop : function(){
		return window.screen.screenTop;
	},
	snLeft : function(){
		return window.screen.screenLeft;
	},
	//屏幕分辨率的高
	snHeight : function(){
		return window.screen.height;
	},
	snWidth : function(){
		return window.screen.width;
	},
	//屏幕工作区域
	avHeight : function(){
		return window.screen.availHeight;
	},
	avWidth : function(){
		return window.screen.availWidth;
	}
}


/**
 * 轮播图
 */
function sliderShow(){ 
	var stop;
	var index=0;
	var bd=document.documentElement.clientWidth;
    autoPage();
	//自动 下一页
	function autoPage(){
		stop=setInterval(function(){
				nextimg();
			},5000);
	}	
	
	
	function trans(val){
		$id("slidet").style.transform="translate3d("+val+"px,0px,0px)";
	}
	
	//下一页
	function nextimg(){
		index++;
		if(index==$className("block").length-2){
			index=0;
		} 
		trans(-index*bd);
		//调用圆点移动  
		dotMove();
	}
	//上一页 
	function upimg(){
		index--;
		if(index==-1){
			index=$className("block").length-3;
		} 
		trans(-index*bd);
		//调用圆点移动  
		dotMove();
	}
	
	//右下角圆点 移动
	function dotMove(){
		for(var i=0;i<$className("dot").length;i++){
			$className("dot")[i].className="dot";
		}
		//设置活动 圆点
		$className("dot")[index].className="dot dot-active";
	}
	
	/**
	 * 触摸事件
	 */
	var startY;
	var startX;
	var startLeft;
	$id("slidet").ontouchstart=function(e){
		clearInterval(stop);
		$id("slidet").style.transitionDuration="0ms";
		//touchs 是一个长度为1 的数组
		var touch=e.touches[0];
		startX=touch.clientX;
	}
	$id("slidet").ontouchmove=function(e){
		e.preventDefault();
		var touch=e.touches[0];
		moveX=touch.clientX;
		var endX=-index*bd+moveX-startX;
		trans(endX);
	}
	$id("slidet").ontouchend=function(e){
		var val;
		var touch=e.changedTouches[0];
		endX=touch.clientX;
		val=startX-endX;
		$id("slidet").style.transitionDuration="300ms";
		if(Math.abs(val)>=bd/2){
			if(val>0){
				nextimg();
			}
			if(val<0){
				upimg();
			}
		}else{
			trans(-index*bd);
		}
		
		autoPage();
	}
}
sliderShow();

function navbar(){
	var gui=$className("guide");
	var spc=$className("slipper-content");
	for(var i=0;i<gui.length;i++){
		(function(i){
			gui[i].onclick=function(){
				for(var j=0;j<gui.length;j++){
						gui[j].className="guide";
						spc[j].style.display="none"
					}
				gui[i].className="guide guide-event";
				//横线动画
				animaline(i);
				//内容切换
				cutdiv(i);
			}
		})(i);
	}
	//横线动画
	function animaline(i){
		var sbl=$id("sbline");
		var sbw=sbl.offsetWidth;
		sbl.style.transform="translate3d("+i*sbw+"px,0px,0px)"
	}
	function cutdiv(i){
		spc[i].style.display="block";
	}
}
navbar();


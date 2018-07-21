
function $id(id){
	return document.getElementById(id);
}
function $className(name){
	return document.getElementsByClassName(name);
}
function $tagName(name){
	return document.getElementsByTagName(name);
}


/**
 * 轮播图
 */
window.onload = sliderShow;


function sliderShow(){ 
	var stop;
	var index=2;
	var bd=document.documentElement.clientWidth;
    console.log("sss")
	//自动 下一页
	stop=setInterval(function(){
			nextimg();
		},4000);
	//下一页
	function nextimg(){
		
		if(index==$className("block").length-1){
			$id("slidet").style.left= "-"+bd+"px";
			index=1;
		} 
		$id("slidet").style.left="-"+index*bd+"px";
		console.log(index);
		//调用圆点移动  
		dotMove();
		index++;
	}
	//右下角圆点 移动
	function dotMove(){
		console.log(index);
		//当圆点移动到最后一个时，设置最后一个圆点样式为默认
		if(index!=1){ 
			$className("dot")[index-2].className="dot";
		}else{
			$className("dot")[$className("dot").length-1].className="dot";
		}
		//设置活动 圆点
		$className("dot")[index-1].className="dot dot-active";
	}
	
	/**
	 * 触摸事件
	 */
	var startY;
	var startX;
	var startLeft;
	$id("slidet").ontouchstart=function(e){
		clearInterval(stop);
		//touchs 是一个长度为1 的数组
		var touch=e.touches[0];
		startX=touch.clientX;
		console.log("startX"+startX);
		//该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）
		e.preventDefault();
	}
	$id("slidet").ontouchmove=function(e){
		var touch=e.touches[0];
		moveX=touch.clientX;
		console.log("moveX"+moveX)
		
		$id("slidet").style.left=$id("slidet").offsetLeft+(moveX-startX)+"px";
				
		e.preventDefault();
	}
	$id("slidet").ontouchend=function(e){
		var touch=e.changedTouches[0];
		endX=touch.clientX;
		console.log("endX"+endX);
	}
}



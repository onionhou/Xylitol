
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
	var index=0;
	var bd=document.documentElement.clientWidth;
    console.log("sss")
    autoPage();
	//自动 下一页
	function autoPage(){
		stop=setInterval(function(){
				nextimg();
			},1000);
	}		
	//下一页
	function nextimg(){
		index++;
		
		if(index==$className("block").length-2){
			$id("slidet").style.transform="scaleX("+bd+"px)";
			index=0;
		} 
		$id("slidet").style.transform="translate3d("+-index*bd+"px,0px,0px)";
		console.log(index);
		//调用圆点移动  
		dotMove();
	}
	//上一页 
	function upimg(){
		index--;
		if(index==-1){
			index=$className("block").length-3;
		} 
		$id("slidet").style.transform="translate3d("+-index*bd+"px,0px,0px)";
		console.log(index);
		//调用圆点移动  
		dotMove()
	}
	
	//右下角圆点 移动
	function dotMove(){
		console.log(index);
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
		console.log("startX"+startX);
		//该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）
	}
	$id("slidet").ontouchmove=function(e){
		e.preventDefault();
		var touch=e.touches[0];
		moveX=touch.clientX;
		var endX=-index*bd+moveX-startX;
		$id("slidet").style.transform="translate3d("+endX+"px,0px,0px)";
	}
	$id("slidet").ontouchend=function(e){
		var val;
		var touch=e.changedTouches[0];
		endX=touch.clientX;
		val=startX-endX;
		$id("slidet").style.transitionDuration="300ms";
		console.log(val);
		if(Math.abs(val)>=bd/2){
			if(val>0){
				nextimg();
			}
			if(val<0){
				upimg();
			}
		}else{
			$id("slidet").style.transform="translate3d("+-index*bd+"px,0px,0px)";
		}
		
		autoPage();
	}
}



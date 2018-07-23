

/**
 * lun bo tu
 */

window.onload = sliderTime();


function sliderTime(){
	var index=0;
	var wid=$id("slidebt").children[0].offsetWidth;
	
	
	
	//下一页
	function nextimg(){
		index++;
		if(index==$className("bn-ct-block").length-2){
			index=0;
		} 
		trans(-index*wid);
	}
	//上一页 
	function upimg(){
		index--;
		if(index==-1){
			index=$className("bn-ct-block").length-3;
		} 
		trans(-index*wid);
	}
	
	function trans(val){
		$id("slidebt").style.transform="translate3d("+val+"px,0px,0px)";
	}
	
	/**
	 * 触摸事件
	 */
	var startY;
	var startX;
	var startLeft;
	$id("slidebt").ontouchstart=function(e){
		$id("slidet").style.transitionDuration="0ms";
		var touch=e.touches[0];
		startX=touch.clientX;
	}
	$id("slidebt").ontouchmove=function(e){
		e.preventDefault();
		var touch=e.touches[0];
		moveX=touch.clientX;
		var endX=-index*wid+moveX-startX;
		trans(endX);
	}
	$id("slidebt").ontouchend=function(e){
		var val;
		var touch=e.changedTouches[0];
		endX=touch.clientX;
		val=startX-endX;
		if(Math.abs(val)>=wid/2){
			if(val>0){
				nextimg();
			}
			if(val<0){
				upimg();
			}
		}else{
			trans(-index*wid);
		}
		
	}
}

function fixedbase(){
	
}

function newspaper(){
	var index=1;
	var tp=40;
	autoPage();
	//自动 下一页
	function autoPage(){
		stop=setInterval(function(){
				nextnew();
			},2000);
	}	
	
	function nextnew(){
		index++;
		if(index==$className("new-item").length){
			$id("newslt").style.transition="top 0ms";
			$id("newslt").style.top="0px";
			index=0;
		}
		
		if(index==0){
			$id("newslt").style.transition="top 500ms";
		}
		$id("newslt").style.top=-index*tp+"px";
	}
}
newspaper();
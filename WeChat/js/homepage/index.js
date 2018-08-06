
/**
 * lun bo tu
 */

window.onload = function()
{
	sliderTime();
	sliderShow();
	getLocation();
} 

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
/**
 * 设置 兼容
 */
function setcompatibility(){
	var as=aspectRatio.snHeight();
	var asw=aspectRatio.snWidth();
	var stmp=$className("sppct-term-map");
	
	
	$id("slide").style.height=as/3.7+"px";
	
	for(var i=0;i<$className("block").length;i++){
		$className("block")[i].style.height=as/3.7+"px";
	}
	$className("nav-list")[0].style.height=as/5.8+"px";
	
	for(var i=0;i<$className("bn-ct-filter").length;i++){
		$className("bn-ct-filter")[i].style.height=as/5.06+"px";
	}
	for(var i=0;i<$className("cs-road-map").length;i++){
		$className("cs-road-map")[i].style.height=as/9+"px";
	}
	for(var i=0;i<stmp.length;i++){
		 var pers=stmp[i].parentNode.parentNode.className;
		if(pers=="sppct-term prefs"){
			stmp[i].style.height=as/3.9+"px";
			continue;
		}
		stmp[i].style.height=as/6+"px";
	}
	
	
	
	switch (as){
		case 568:
			for(var i=0;i< $tagName("h4").length;i++){
				 $tagName("h4")[i].style.fontSize="16px"
			}
			break;
		
		case 667:
			for(var i=0;i< $tagName("h4").length;i++){
				 $tagName("h4")[i].style.fontSize="18px"
			}
			break;
		case 736:
			for(var i=0;i< $tagName("h4").length;i++){
				 $tagName("h4")[i].style.fontSize="20px"
			}
			break;	
		default:
			for(var i=0;i< $tagName("h4").length;i++){
				 $tagName("h4")[i].style.fontSize="18px"
			}
			break;
	}
}
setcompatibility();
/**
 * 事件
 */
function affair(){
	
	$tagName("body")[0].onscroll=function(){
		$id("top").style.display=aspectRatio.scrollTop()>aspectRatio.snHeight()?"block":"none";
	}
	
	$id("hunt").onfocus=function()
	{
		
	}
}
affair();

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


function getLocation()
{
	var options={
		enableHighAccuracy:true,
		maximumAge:1000
	}
	
	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(onSuccess,onError,options);
	}
	else
	{
		alert("您的浏览器不支持地理定位")
	}
	
	function onError(err)
	{
		switch (err.code){
			case err.PERMISSION_DENIED:
				alert("拒绝获取");
				break;
			case err.POSITION_UNAVAILABLE:
				alert("位置信息不可用");
				break;
			case error.TIMEOUT:
				alert("请求超时");
				break;
			case error.UNKNOWN_ERROR:
				alert("位置错误");
				break;	
			default:
				break;
		}
	}
	
	function onSuccess(position)
	{
		var latitde=position.coords.latitude;
		var longitude=position.coords.longitude;
		var ggPoint=new BMap.Point(latitde,longitude);
		var bmap = new BMap.GeoPosition();
		bmap.getCurrentPosition(function(r)
		{
			if(this.getStatus() == BMAP_STATUS_SUCCESS)
			{
				var mk = new BMap.Marker(r.point);
				map.addOverlay(mk);
				map.panTo(r.point);
				alert('您的位置：'+r.point.lng+','+r.point.lat);
			}
			else 
			{
				alert('failed'+this.getStatus());
			}        
		});
		
	}
}


function $id(id){
	return document.getElementById(id);
}
function $className(name){
	return document.getElementsByClassName(name);
}
function $tagName(name){
	return document.getElementsByTagName(name);
}

function $children(parent){
	if(typeof(parent) == 'string'){
		return $id(parent).children;
	}else{
		return parent.children;
	}
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
		//这两个值总会有一个恒为0，所以不用担心会对真正的scrollTop造成影响。
		return document.body.scrollTop+document.documentElement.scrollTop;
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

//获取单个图片的原始信息
function getImgNaturalDimensions(oImg,callback){
	
	var nWidth,nHeight;
	if(!oImg.naturalWidth)
	{
		//HTML5 browsers
		nWidth = oImg.naturalWidth;
		nHeight = oImg.naturalHeight;
		callback({w: nWidth,h:nHeight});
	}
	else
	{
		//IE 6/7/8
		var nImg = new Image();
		nImg.src = oImg.src;
		nImg.onload = function()
		{
			var nWidth = nImg.width,
			    nHeight = nImg.height;
			    console.log(oImg)
		    callback({w: nWidth,h:nHeight});
		}
		nImg.src = oImg.src
	}
}
/**
 * js添加onload事件的通用方法
 */
function addLoadEvent(func) {
    var oldonload=window.onload;   //把现有的事件处理函数的值存起来
    if(typeof window.onload != 'function') {  //如果没有绑定任何函数
        window.onload=func;  //添加新的函数
    } else {
        window.onload = function() {
            oldonload();
            func();   //把新函数追加到现有指令的末尾
        }
    }
}

/**
 * Location 定位
 * <script src="http://api.map.baidu.com/api?v=1.4" type="text/javascript"></script>
 */

function getOnLocation()
{
	 var options={
            enableHighAccuracy:true,//开启高精度
            maximumAge:1000
        }
        if(navigator.geolocation){
            //浏览器支持geolocation
            navigator.geolocation.getCurrentPosition(onSuccess,onError,options);
        }else{
            //浏览器不支持geolocation
            errGoIndex('您的浏览器不支持地理位置定位');
        }
        //失败时
	 function onError(error){
	    status=true;
	    switch(error.code){
	        case error.PERMISSION_DENIED:
	            errGoIndex("定位失败,用户拒绝请求地理定位");
	            break;
	        case error.POSITION_UNAVAILABLE:
	            errGoIndex("定位失败,位置信息是不可用");
	            break;
	        case error.TIMEOUT:
	            errGoIndex("定位失败,请求获取用户位置超时");
	            break;
	        case error.UNKNOWN_ERROR:
	            errGoIndex("定位失败,定位系统失效");
	            break;
	    }
	}
	//2，成功时我们进行百度地图经纬度转换
	function onSuccess(position){
	 //经度
	        var longitude = position.coords.longitude;
	        //纬度
	        var latitude = position.coords.latitude;
	         //坐标转换完之后的回调函数
	         
	         console.log("经度："+longitude+"纬度："+latitude)
	    translateCallback = function (data){
	      if(data.status === 0) {
	        var marker = new BMap.Marker(data.points[0]);
	        bm.addOverlay(marker);
	        var label = new BMap.Label("转换后的百度标注（正确）",{offset:new BMap.Size(20,-10)});
	        marker.setLabel(label); //添加百度label
	        bm.setCenter(data.points[0]);
	      }
	    }
	
	    setTimeout(function(){
	    	console.log("callback")
	        var convertor = new BMap.Convertor();
	        var pointArr = [];
	        pointArr.push(ggPoint);
	        convertor.translate(pointArr, 3, 5, translateCallback)
	    }, 1000);
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

/**
 * div底部 横线 滑动
 */
function sildeLine(classNameDefault,classNameActive,lineID)
{
console.log()
	var cnd=$className(classNameDefault+"");
	console.log(cnd[0])
	for(var i=0;i<cnd.length;i++){
		(function(i){
			cnd[i].onclick=function(){
			console.log(cnd[i])
				for(var j=0;j<cnd.length;j++){
						cnd[j].className=classNameDefault;
					}
				
				cnd[i].className=classNameActive;
				//横线动画
				animaline(i,lineID);
			}
		})(i);
	}
	//横线动画
	function animaline(i,lineID){
		var line=$id(lineID);
		var lineW=line.offsetWidth;
		line.style.transform="translate3d("+i*lineW+"px,0px,0px)"
	}
}


function setH(){
	var bak=$className("black");
	var slip=$className("slipper-content");
	console.log(bak.length)
	for(var i=0;i<bak.length;i++){
		bak[i].style.height=$className("home-base")[0].offsetHeight+"px";
		console.log(bak[i].offsetHeight);
	}
	if(typeof(slip[0])!= "undefined"){
		slip[0].style.height=slip[0].offsetHeight+"px";
	}
	
}

setH();
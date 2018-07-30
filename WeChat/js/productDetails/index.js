window.onload = function()
{
	setSize();
	gesture();
	place();
	tourbar();
}


var lenth=$className("dwr-timg-item").length;
function closeAdv(){
	$id("topadv").style.display="none";
	$id("board").style.height=$id("dtopadv").offsetHeight+"px";
}

function setSize(){
	var bd=aspectRatio.snWidth();
	var hg=aspectRatio.snHeight();
	var dti=$className("dwr-timg-item");
	$id("board").style.height=$id("topadv").offsetHeight+$id("dtopadv").offsetHeight+"px";
	$id("dtlist").style.width=dti.length*bd+"px";
	
	for(var i=0;i<dti.length;i++){
		dti[i].style.width=bd+"px";
	}
	
	$id("sum").innerText=""+lenth;
	console.log(hg)
	$id("shadow").style.height=hg-$id("locat").offsetHeight+"px";
	
	$id("detailswp").style.height=hg+300+"px";
}

function gesture()
{
	var index=0;
	var bd=aspectRatio.snWidth();
	
	function trans(val){
		$id("dtlist").style.transform="translate3d("+val+"px,0px,0px)";
	}
	
	//下一页
	function nextimg(){
		index++;
		if(index==$className("dwr-timg-item").length){
			index=0;
		} 
		console.log(index);
		$id("index").innerText=""+(index+1);
		trans(-index*bd);
	}
	//上一页 
	function upimg(){
		index--;
		if(index==-1){
			index=$className("dwr-timg-item").length-1;
		} 
		$id("index").innerText=""+(index+1);
		trans(-index*bd);
	}
	
	var startY;
	var startX;
	var startLeft;
	$id("dtlist").ontouchstart=function(e){
		$id("dtlist").style.transitionDuration="0ms";
		//touchs 是一个长度为1 的数组
		var touch=e.touches[0];
		startX=touch.clientX;
	}
	$id("dtlist").ontouchmove=function(e)
	{
		e.preventDefault();
		var touch=e.touches[0];
		moveX=touch.clientX;
		var endX=-index*bd+moveX-startX;
		
		trans(endX);
		
	}	
		
	$id("dtlist").ontouchend=function(e){
		var val;
		var touch=e.changedTouches[0];
		endX=touch.clientX;
		val=startX-endX;
		$id("dtlist").style.transitionDuration="300ms";
		
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
		
	}
}

function place(){
	var loca=$className("locat-item");
	$id("sirc").onclick=function(){
		$id("defed").style.display="block";
		$id("body").style.position="fixed";
	}
	
	for(var i=0;i<loca.length;i++)
	{
		(function(i){
			loca[i].onclick=function(){
				$id("start").innerText=$className("dim-loca")[i].innerText;
				$id("body").style.position="relative";
				$id("defed").style.display="none";
			}
		})(i)
	}
}

function tourbar(){
	var gui=$className("guide");
	for(var i=0;i<gui.length;i++){
		(function(i){
			gui[i].onclick=function(){
				for(var j=0;j<gui.length;j++){
						gui[j].className="guide";
					}
				
				gui[i].className="guide guide-event";
				//横线动画
				animaline(i);
			}
		})(i);
	}
	//横线动画
	function animaline(i){
		var sbl=$id("sdline");
		var sbw=sbl.offsetWidth;
		sbl.style.transform="translate3d("+i*sbw+"px,0px,0px)"
	}
}

var flag=true;
function setEnshrine()
{
	if(flag)
	{
		$id("enshrine").src="../../img/drawable-hdpi/productDetails/enshrine2.png";
		flag=false;
	}
	else
	{
		$id("enshrine").src="../../img/drawable-hdpi/productDetails/enshrine1.png";
		flag=true;
	}
}

function look()
{
	$id("da-examine").style.display="none";
	$id("detailswp").style.height="auto";
}

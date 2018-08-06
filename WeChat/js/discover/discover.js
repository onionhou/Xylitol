var asp=aspectRatio.snHeight();
var dism=$className("dis-tab-item");
var disi=$className("dis-tab-img");
var suff=$className("dis-suffer");
var disTop=$id("disTop");
var fraitem=$className("fra-item");
var dcw=$className("dis-content-wapper");
var img;

	for(var i=0;i<dism.length;i++){
		console.log(dism.length)
		dism[i].style.height=dism[0].offsetWidth+"px";
		img=disi[i];
		
		imgload(img,i);
	}

$id("frame").style.height=asp-disTop.offsetHeight+"px";


var frat=$className("fra-tupi");
var dcw=$className("dis-content-wapper");
var lazb=$className("lab-zby");
var sann=$className("spann");
for(var i=0;i<fraitem.length;i++)
{
	var index=0;
	(function(i){
		fraitem[i].onclick=function(){
			
			frat[index].src=frat[index].getAttribute('src').replace(/2/,"1");
			fraitem[index].className="fra-item";
			dcw[index].style.display="none";
			
			
			frat[i].src=frat[i].getAttribute('src').replace(/1/,"2");
			fraitem[i].className="fra-item fra-item-active";
			dcw[i].style.display="block";
			
			lazb[0].innerText=sann[i].textContent+"";
			index=i;
		}
	})(i)
}

for(var i=0;i<dcw.length;i++){
	dcw[i].style.height=asp-disTop.offsetHeight-$className("home-base")[0].offsetHeight+"px";
}

function imgload(img,i){
		var nWidth,nHeight;
		if(!img.naturalWidth)
		{
			//HTML5 browsers
			nWidth = img.naturalWidth;
			nHeight = img.naturalHeight;
			setHW(nWidth,nHeight,i);
		}
		else
		{
			//IE 6/7/8
			var nImg = new Image();
			nImg.src = img.src;
			
			nWidth = nImg.width;
			nHeight = nImg.height;
			setHW(nWidth,nHeight,i);
			
			nImg.src = img.src;
		}
	}

function setHW(w,h,i)
{
	if(h>=w)
	{
		img.style.width=$className("dis-tab-item")[0].offsetWidth+"px";
		suff[i].style.top=(img.offsetWidth-img.offsetHeight)/2+"px";
	}
	else
	{
		img.style.height=$className("dis-tab-item")[0].offsetHeight+"px";
		suff[i].style.left=(img.offsetHeight-img.offsetWidth)/2+"px";
	}
}
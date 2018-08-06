var as=aspectRatio.snHeight();

switch (as)
{
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



$id("noti").style.minHeight=as+"px";



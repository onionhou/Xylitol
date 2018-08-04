window.onload=function()
{
	setFootSize();
}

function setFootSize()
{
	var link=$className("fwb-main-link");
	var timg=$className("fwb-main-timg");
	
	for(var i=0;i<timg.length;i++){
		link[i].style.height=timg[i].offsetWidth+"px";
	}
}

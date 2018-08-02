window.onload=function()
{
	setAccountSize();
}

function setAccountSize()
{
	$id("act").style.minHeight=aspectRatio.avHeight()+"px";
}

window.onload=function()
{
	setVerifyHeigh();
}

function setVerifyHeigh()
{
	$id("body").style.height=aspectRatio.snHeight()+"px";
	$id("vpicon").style.height=$id("vpicon").offsetWidth+"px";
}

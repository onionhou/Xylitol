

setTallSNS();












function setTallSNS(){
	var as=aspectRatio.snHeight();
	
	$id("vbox").style.height=as/5.02+"px";
	$id("vvia").style.height=$id("vvia").offsetWidth-4+"px";
}

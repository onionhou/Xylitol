window.onload=function()
{
	setAccountSize();
}

function setAccountSize()
{
}


var choice=$className("choice");

var wayb=$className("act-way-bar");

var index=0;
for(var i=0;i<wayb.length;i++)
{
	
	(function(i){
		wayb[i].onclick=function(){
			choice[index+1].style.display="none";
			choice[i+1].style.display="inline-block";
			index=i;
		}
	})(i)
}

var flag=true;
$id("default").onclick=function()
{
	if(flag){
		choice[0].src="../../img/drawable-hdpi/account/yes.png";
		flag=false;
	}else{
		choice[0].src="../../img/drawable-hdpi/account/no.png";
		flag=true;
	}
}

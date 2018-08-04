
$id("wdall").onclick=function ()
{
	var money=parseInt($id("money").innerText);
	console.log(money*0.001)
	$id("numb").value=money-money*0.001+"";
	$id("poundage").innerText=money*0.001+"";
}

$id("numb").oninput=function()
{
	$id("poundage").innerText=$id("numb").value*0.001+"";
}


var choice=$className("choice");
var pay=$className("awb-pay");
var wayb=$className("act-way-bar");

var index=0;
for(var i=0;i<wayb.length;i++)
{
	(function(i){
		wayb[i].onclick=function(){
			choice[index].style.display="none";
			choice[i].style.display="inline-block";
			index=i;
			$id("fiexdBg").style.display="none"
			$id("drawmd").style.display="none";
		  	$id("app").innerHTML=pay[i].innerHTML;
		}
	})(i)
}

function method(){
	$id("fiexdBg").style.display="block"
	$id("drawmd").style.display="block";
}


$id("body").style.minHeight=aspectRatio.snHeight()+"px";
$id("appfxd").style.height=aspectRatio.snHeight()+"px";

$id("fwb").onclick=function(){
	console.log("aaaa")
	$id("appfxd").style.display="none";
	$id("fwp").style.display="none";
}


function applicant(){
	var afr=$className("afri-inpt");
	var name =  /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
	var tele=/^[1][3,4,5,7,8][0-9]{9}$/;
	var card=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
	for(var i=0;i<afr.length;i++)
	{
		switch(i)
		{
			case 0: if(!name.test(afr[i].value)){fault();$id("crad").innerHTML=i+""}
			break;
			case 1: if(!tele.test(afr[i].value)){fault();$id("crad").innerHTML=i+""}
			break;
			case 2: if(!card.test(afr[i].value)){fault();$id("crad").innerHTML=i+""}
			break;
			default:
			break;
		}
		
	}
}

function fault(){
	$id("appfxd").style.display="block";
	$id("fwp").style.display="block";
}


var as=aspectRatio.snHeight();

var tsm=$className("ts-item");
var tcl=$className("twp-choice-list");
var index=0;


for(var i=0;i<tsm.length;i++){
	(function(i){
		var flag=false;
		tsm[i].onclick=function(){
			$id("body").className="bd";
			
			if($id("fixedbk").style.display!="block"){
				$id("fixedbk").style.display="block";
			}
			console.log(flag+"----i:"+i)
			flag=tsmActive(i,flag);
			console.log(flag+"====i:"+i)	
		}
		setScroll(i);
		
		totalA(i);
	})(i);
}


function tsmActive(i,flag){
	
		tcl[index].style.display="none";
		tsm[index].className="ts-item";
	if(!flag)
	{
		tcl[i].style.display="block";
		tsm[i].className="ts-item ts-item-active";
		flag=true;
	}else{
		$id("fixedbk").style.display="none";
		$id("body").className="";
		index=0;
		flag=false;
	}
		
		index=i;
		return flag;
}



function totalA(i){
	var num=0;
	var childs=$children(tcl[i]);
	var tsmArry=["目的地","出游类型","价格","出游月份"];
	
	for(var j=0;j<childs.length;j++){
		(function(j){
			
			childs[j].onclick=function(){
				tchActive(childs,num,j);
				num=j;
				if(j==0){
					tsm[i].innerHTML=tsmArry[i]+"&nbsp<i class='fa fa-angle-down'></i>";
					return;
				}
				tsm[i].innerHTML=childs[j].innerText+"&nbsp<i class='fa fa-angle-down'></i>";
				
				
			}
		})(j)
	}
}

function setScroll(i){
	var high=as-$id("screen").offsetHeight;
	if(tcl[i].offsetHeight>high){
		tcl[i].style.cssText=' overflow-y:auto; overflow-x:auto;height:'+high+'px;';
	}
}

function tchActive(childs,num,j){
	childs[num].className="twp-choice-item";
	childs[j].className="twp-choice-item tch-active";
}

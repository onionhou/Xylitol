
var as=aspectRatio.snHeight();

var tsm=$className("ts-item");
var tcl=$className("twp-choice-list");
var index=-1;
var flag=false;

for(var i=0;i<tsm.length;i++){
	(function(i){
		tsm[i].onclick=function(){
			$id("body").className="bd";
			
			if($id("fixedbk").style.display!="block"){
				$id("fixedbk").style.display="block";
			}
			console.log("flag"+flag+i+index);
			if(!flag){
				if(index!=i)
				{
					tsmActive(i);
				}else{
					tcl[i].style.display="none";
					$id("fixedbk").style.display="none";
					index=-1;
					flag=false;
				}
			}
			
		}
		setScroll(i);
		
		totalA(i);
	})(i)
}

$id("fixedbk").onclick=function(){
	$id("fixedbk").style.display="none";
	$id("tpchoice").style.display="none";
	$id("body").className="";
}

function tsmActive(i){
		if(index!=-1)
		{
		tcl[index].style.display="none";
		tsm[index].className="ts-item";
		}
		index=i;
		tcl[i].style.display="block";
		tsm[i].className="ts-item ts-item-active";
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


var money=$className("money");

var index=0;
for(var i=0;i<money.length;i++){
	(function(i){
		money[i].onclick=function(){
			console.log(this)
			if(index===money.length-1){
				money[index].className="money other-money";
			}
			else
			{
				money[index].className="money";
			}
			if(i==money.length-1)
			{
				this.className="money money-active other-money";
				return index=i;
			}
			this.className="money money-active";
			index=i;
		}
	})(i)
}

$id("other").onblur=function()
{
	console.log("sss")
	console.log(this)
	this.innerText=this.value+"元";
}

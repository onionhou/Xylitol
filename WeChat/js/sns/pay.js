
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


var val="";
$id("other").oninput=function()
{
	var rel= /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
	if(!rel.test(this.value))
	{
		console.log("aaa")
		this.value=val;
	}
	val=this.value;
}
$id("other").onblur=function()
{
	console.log("sss")
	this.value=this.value+"元";
}

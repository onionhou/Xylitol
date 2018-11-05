$(function(){
	var canvas=$('#fireworks')[0];
	canvas.width = $(window).width();
	canvas.height = $(window).height();
	var ctx=canvas.getContext("2d");

	$(window).on('resize', function() {
		canvas.width = $(window).width();
		canvas.height = $(window).height();
		ctx.fillStyle = '#000003';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		center = { x: canvas.width / 2, y: canvas.height / 2 };
	});

	//init
	ctx.fillStyle = '#000003';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	var center = { x: canvas.width / 2, y: canvas.height / 2 },
		start={ startX:center.x,startY:canvas.height-20},
		fireY=start.startY,
		fireworks=[],
		flowers=[];


	var firework=function(fireworksX){
		this.flag=false;
		this.x=fireworksX;
		this.y=start.startY;
		this.maxY=center.y-GetRandomNum(1,300);
		this.len=1;
		this.color='#FFDB50';

		this.init=function(){
			
			ctx.beginPath();
			ctx.fillStyle=this.color;
			this.y--;
			for(var i=0;i<this.len;i++){
				ctx.arc(this.x,this.y,2,0,2*Math.PI);
				if(this.len<=5){
					this.len++;
				}
				this.y-=4;
			}
			if(this.y<this.maxY){
				this.flag=true;
				$.each(fireworks,function(i,v){
					if(this.flag){
						fireworks.splice(i,1);
					}
				})
				return flowers.push(new flower(this.x,this.maxY));
			}
			ctx.fill();
		}
	}


	var flower=function(fireworksX,fireworksY){
		this.x=fireworksX;
		this.y=fireworksY;
		this.color=randomColor();
		this.maxLen=120;
		this.flowerLen=2;

		this.init=function(){
			if(this.flowerLen<this.maxLen){
				ctx.fillStyle =this.color;
				ctx.save();
				ctx.translate(this.x,this.y);
				for(var j=1;j<=12;j++){
					ctx.beginPath();
					ctx.rotate(30*Math.PI/180);
					ctx.arc (this.flowerLen,0,2,0,2*Math.PI);
					ctx.fill();
					
				}
				ctx.restore();
				
				this.flowerLen+=2;
			}else{
				flowers=curtail(flowers);
			}
		}
	}

	setInterval(function(){
		fireworks.push(new firework(GetRandomNum(100,2000)));

	},50)

	function draw(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = '#000003';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		for(var i=0;i<fireworks.length;i++){
			fireworks[i].init();
		}

		for(var i=0;i<flowers.length;i++){
			flowers[i].init();
		}
		//flower();
		setTimeout(function(){
			requestAnimationFrame(draw);
		 },50);
			
	}
	draw();

	var randomColor=function(){
		// return parmsColor[GetRandomNum(0,4)];
		return 'rgb('+GetRandomNum(1,255)+','+GetRandomNum(1,255)+','+GetRandomNum(1,255)+')';
	}

	function GetRandomNum(Min,Max)
	{
	    var Range = Max - Min;   
	    var Rand = Math.random();   
	    return(Min + Math.round(Rand * Range));   
	}  

	function curtail(arr) {
		var m = arr.slice(1);
		return m;	
	}	

})

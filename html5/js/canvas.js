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

	var center = { x: canvas.width / 2, y: canvas.height / 2 };
	//烟
	function trace(){
		ctx.fillStyle='#FFFF89';
		for(var i=2;i<=34;i+=4){
			ctx.arc(center.x,center.y*2-i,2,0,2*Math.PI,true);
		}
		ctx.fill();
	}

	trace();

	
	}
})

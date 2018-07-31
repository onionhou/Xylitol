window.onload= function(){

	setDateHeight();
	calendarWratch()
}

function setDateHeight()
{
	$id("cmwap").style.height=$id("darmonth").offsetHeight+2+"px";
	$id("body").style.height=aspectRatio.snHeight()+"px";
	var week=$className("week");
	for(var i=0;i<week.length;i++)
	{
		week[i].style.width=aspectRatio.snWidth()/7+"px";
	}
}



function calendarWratch()
{	
	var calendar=$id("tbody");
	var monm=$className("month-item");
	var date=new Date(); //获取当前时间
	var year=date.getFullYear();//年份
	var month=date.getMonth();//月份
	var today=date.getDate(); //日
	var time=[[1533052800000,"¥998"],[1533484800000,"¥1998"],[1536163200000,"¥198"],[1538755200000,"¥188"], [1530806400000,"¥110"]];	
	
	console.log("time:"+date,"Year:"+year,"month:"+month,"today:"+today)
	
	/*
	 * 每月有几天
	 */
	function getCountDays(_month){
		date.setMonth(_month+1);
		date.setDate(0);
		if(_month==1)
		{
			return (year%4==0)&&(year%100!=0||year%400==0)?29:28;
		}
		return date.getDate();
	}
	/**
	 * 每月的第一天是星期几
	 */
	function getCountWeek(_month)
	{
		date.setMonth(_month)
		date.setDate(1);
		return date.getDay();
	}
	
	
	console.log(getCountWeek(month));
	console.log(getCountDays(month));
	function showCalendar(_month,_time)
	{	
		var showStr="",
			_className="",
			firstDay=0,
			monthDay=0,
			oDate="",
			msec=0,
			flag=true,
			i=0;
		showStr="<tr>";
		//当月第一天前的空格
		firstDay=getCountWeek(_month);
		console.log(firstDay)
		for(i=1;i<=firstDay;i++)
		{
			showStr+="<td></td>";
		}
		//当月的天数
		monthDay=getCountDays(_month);
		for(i=1;i<=monthDay;i++)
		{
			oDate=year+"/"+_month+"/"+i+" 00:00:00";
			msec=new Date(oDate).getTime();
			console.log(_time);
			for(var j=0;j<_time.length;j++){
				_className="day_optional";
				if(msec===_time[j][0] && flag)
				{
					showStr+="<td class="+_className+"><a href='javascript:void(0)'>"+i+"<br /><lable class='day_cost'>"+_time[j][1]+"</lable></a></td>";
					flag=false;
				}
			}
			
		    if(i===today && _month===month && flag){
		    	_className="day_today";
		    	showStr+="<td class="+_className+">"+"今天"+"</td>";
		    	flag=false;
		    }
		    
		    if(flag){
			    _className="day_default";
			    showStr+="<td class="+_className+">"+i+"</td>";
			    flag=false;
		    }
		    
			
			firstDay=(firstDay+1)%7;
			if(firstDay === 0 && i !==monthDay)
			{
				showStr+="</tr><tr>";
			}
			
			flag=true;
		}
		//剩余的空格
		if(firstDay!==0)
		{
			for(i=firstDay;i<7;i++)
			{
				showStr+="<td></td>";
			}
		}
		
		showStr+="</tr>";
		calendar.innerHTML=showStr;
	}
	
	showCalendar(month,time);
	
	for(var j=0;j<monm.length;j++){
	
		(function(j){
			monm[j].onclick=function()
			{
				showCalendar(month+j,time);
				var week=$className("week");
				for(var i=0;i<week.length;i++)
				{
					week[i].style.width=aspectRatio.snWidth()/7+"px";
				}
			}})(j)
		
	}
	
}
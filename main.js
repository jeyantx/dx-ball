window.onload=function(){
	canvasGame = document.getElementById('dx-ball');
 	window.onresize = function(){
		setTimeout(function(){
				if(window.innerHeight==window.screen.height){
					canvasGame.style.position = "absolute";
					canvasGame.style.height = window.screen.height+"px";
					canvasGame.style.width = window.screen.width+"px";
					canvasGame.style.border = "0px solid #000";
					document.getElementById('comments').style.display = "none";
					time_flag = (new Date().getTime());
				}else{
					if((new Date().getTime())>=time_flag+500){
						canvasGame.style.position = "relative";
						canvasGame.style.height = 480+"px";
						canvasGame.style.width = 640+"px";
						canvasGame.style.border = "3px solid #000";
						document.getElementById('comments').style.display = "block";
					}
				}
		},0);
	}
	dx_ball(true,true);
}
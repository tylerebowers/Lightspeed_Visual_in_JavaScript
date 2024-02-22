function $i(id) { return document.getElementById(id); }
    var test=true;
    var n=1000 + Math.floor(1000*Math.random())
    var w=0;
    var h=0;
    var x=0;
    var y=0;
    var z=0;
    var star_color_ratio=0;
    var star_x_save,star_y_save;
    var star_ratio=256;
    var star_speed=1;
    var star=new Array(n);
    var opacity=0.1;
    var cursor_x=0;
    var cursor_y=0;
    var mouse_x=0;
    var mouse_y=0;
	var dir_x = 0;
	var dir_y = 0;
	var warp = false;
    var context;
    var key;
    var frame_period=100;
    function init(){
    	for(var i=0;i<n;i++)
    		{
    		star[i]=new Array(5);
    		star[i][0]=Math.random()*w*2-x*2;
    		star[i][1]=Math.random()*h*2-y*2;
    		star[i][2]=Math.round(Math.random()*z);
    		star[i][3]=0;
    		star[i][4]=0;
    		}
    	var starfield=$i('starfield');
    	starfield.style.position='absolute';
    	starfield.width=w;
    	starfield.height=h;
    	context=starfield.getContext('2d');
    	context.fillStyle='rgb(0,0,0)';
    	context.strokeStyle='rgb(255,255,255)';
    	}
    function anim(){
    	mouse_x=cursor_x-x;
    	mouse_y=cursor_y-y;
    	context.fillRect(0,0,w,h);
    	for(var i=0;i<n;i++)
    		{
    		test=true;
    		star_x_save=star[i][3];
    		star_y_save=star[i][4];
    		star[i][0]+=dir_x; //if(star[i][0]>x<<1) { star[i][0]-=w<<1; test=false; } if(star[i][0]<-x<<1) { star[i][0]+=w<<1; test=false; }
    		star[i][1]+=dir_y; //if(star[i][1]>y<<1) { star[i][1]-=h<<1; test=false; } if(star[i][1]<-y<<1) { star[i][1]+=h<<1; test=false; }
    		star[i][2]-=star_speed; if(star[i][2]>z) { star[i][2]-=z; test=false; } if(star[i][2]<0) { star[i][2]+=z; test=false; }
    		star[i][3]=x+(star[i][0]/star[i][2])*star_ratio;
    		star[i][4]=y+(star[i][1]/star[i][2])*star_ratio;
    		if(star_x_save>0&&star_x_save<w&&star_y_save>0&&star_y_save<h&&test)
    			{
    			context.lineWidth=(1-star_color_ratio*star[i][2])*2;
    			context.beginPath();
    			context.moveTo(star_x_save,star_y_save);
    			context.lineTo(star[i][3],star[i][4]);
    			context.stroke();
    			context.closePath();
    			}
    		}
          if (typeof(window.requestAnimationFrame)=='function') {
            window.requestAnimationFrame(anim);
          } else {
            setTimeout('anim()',frame_period);
          }
    	}
    function release(){
    	switch(key)
    		{
    		case 13:
    			context.fillStyle='rgb(0,0,0)';
    			break;
    		}
    	}
    function mouse_wheel(evt){
    	evt=evt||event;
		//dir_x = (evt.x/w)-0.5;
		//dir_y = (evt.y/h)-0.5;
    	var delta=0;
    	if(evt.wheelDelta)
    		{
    		delta=evt.wheelDelta/360;
    		}
    	else if(evt.detail)
    		{
    		delta=-evt.detail/3;
    		}
    	star_speed+=(delta>=0)?-0.1:0.1;
    	}
    function resize(){
    	newW=parseInt(document.documentElement.clientWidth);
    	newH=parseInt(document.documentElement.clientHeight);
		if (newW !== w || newH !== h){
			w = newW
			h = newH
			x=Math.round(w/2);
			y=Math.round(h/2);
			z=(w+h)/2;
			star_color_ratio=1/z;
			cursor_x=x;
			cursor_y=y;
			init();
		}
    	}
	function start(){
		resize();
		anim();
	}
	function toggleWarp(){
		if (warp){
			context.fillStyle='rgb(0,0,0)';
			star_speed /= 2
			warp = false;
		} else {
			context.fillStyle='rgba(0,0,0,'+opacity+')';
			star_speed *= 2
			warp = true;
		}
	}
    document.onkeyup=release;
    document.onmousewheel=mouse_wheel; if(window.addEventListener) window.addEventListener('DOMMouseScroll',mouse_wheel,false);

/* ODDFARM Engine 2.0 — simulation and camera core */
(function(g){'use strict';
class Engine {
 constructor(){this.vx=0;this.vy=0;this.acc=0;this.last=null;this.hud=0;this.cx=null;this.cz=null;this.frames=0;this.elapsed=0;this.quality=0;}
 reset(){this.vx=this.vy=this.acc=0;this.last=null;}
 move(p,x,y,dt,resolve){const len=Math.hypot(x,y);const strength=Math.max(0,Math.min(1,(len-.12)/.88));const speed=250;const k=1-Math.exp(-dt*(strength?22:32));this.vx+=( (len?x/len:0)*strength*speed-this.vx)*k;this.vy+=((len?y/len:0)*strength*speed-this.vy)*k;const v=Math.hypot(this.vx,this.vy);p.mv=v>3?1:0;if(p.mv){p.ang=Math.atan2(this.vx,this.vy);p.w+=dt*11*Math.min(1,v/speed);p.dir=Math.abs(this.vx)>=Math.abs(this.vy)?1:this.vy<0?2:0;if(p.dir===1)p.f=this.vx<0?-1:1;}p.x+=this.vx*dt;resolve(p);p.y+=this.vy*dt;resolve(p);}
 camera(cam,x,z,dt){if(this.cx===null||Math.hypot(x-this.cx,z-this.cz)>20){this.cx=x;this.cz=z;}const k=1-Math.exp(-dt*10);this.cx+=(x-this.cx)*k;this.cz+=(z-this.cz)*k;cam.position.set(this.cx,21,this.cz+19);cam.lookAt(this.cx,1.2,this.cz-1);}
 frame(now,update,draw,hud){const dt=this.last===null?0:Math.min(.05,Math.max(0,(now-this.last)/1000));this.last=now;this.acc+=dt;let steps=0;while(this.acc>=1/60&&steps++<4){update(1/60);this.acc-=1/60;}this.hud+=dt;if(this.hud>=.1){hud();this.hud=0;}draw(dt);return dt;}
}
g.ODDFARMEngine=Engine;
})(window);

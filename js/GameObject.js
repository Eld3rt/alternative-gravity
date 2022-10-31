"use strict";

class GameObject
{
	constructor (context, x, y, vx, vy, mass, restitution){
		this.context = context;
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.mass = mass;
		this.restitution = restitution;

		this.isColliding = false;
	}

	draw(){
		this.context.fillStyle = this.isColliding?'#ff8080':'#0099b0';
	}
}
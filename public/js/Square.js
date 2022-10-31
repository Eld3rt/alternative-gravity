"use strict";

class Square extends GameObject
{
	constructor (context, x, y, vx, vy, mass){
		super(context, x, y, vx, vy, mass, 1);

		//Set default width and height
		this.width = 50;
		this.height = 50;
	}

	draw(){
		//Draw a simple square
		super.draw();
		this.context.fillRect(this.x, this.y, this.width, this.height);
	}

	update(secondsPassed){
		//Move with set velocity
		this.x += this.vx * secondsPassed;
		this.y += this.vy * secondsPassed;
	}
}
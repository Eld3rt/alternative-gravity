class BigCircle extends GameObject
{
	constructor (context, x, y, vx, vy, mass){
		super(context, x, y, vx, vy, mass, 0.9);

		//Set default width and height
		this.radius = 40;
		this.startingAngle = 0;
		this.endingAngle = 2 * Math.PI;
	}

	draw(){
		//Draw a simple square
		super.draw();
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, this.startingAngle, this.endingAngle);
		this.context.fill();
	}

	update(secondsPassed){
		let g = 9.81 * 20;
		const canvasWidth = 750;
		const canvasHeight = 400;
		// Apply acceleration
		this.vy += g * secondsPassed;

		//Move with set velocity
		this.x += this.vx * secondsPassed;
		this.y += this.vy * secondsPassed;
	}
}
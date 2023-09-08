class GameWorld {

	constructor(canvasId){
		this.canvas = null;
		this.context = null;
		this.oldTimeStamp = 0;
		this.gameObjects = [];

		this.init(canvasId);
	}

	init(canvasId) {
		this.canvas = document.getElementById(canvasId);
		this.context = this.canvas.getContext('2d');

		this.createWorld();

		// Request an animation frame for the first time
		// The gameLoop() function will be called as a callback of this request
		window.requestAnimationFrame((timeStamp) => {this.gameLoop(timeStamp)});
	}

	createWorld() {
		this.gameObjects = [];

		let numObjects = 25;
		let numObjects2 = 1;

		for (var i = 0; i < numObjects; i++) {
			this.gameObjects.push(new Circle(this.context, 50 + (Math.random() * 300), 0 + (Math.random() * 200), 0 + (Math.random() * 50), 0 + (Math.random() * 50), 0.5));
		}
		// for (var i = 0; i < numObjects2; i++) {
		// 	this.gameObjects.push(new BigCircle(this.context, 50 + (Math.random() * 300), 0 + (Math.random() * 200), 0 + (Math.random() * 50), 0 + (Math.random() * 50), 5));
		// }
	}

	gameLoop(timeStamp) {
		// Calculate how much time has passed
		let secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
		this.oldTimeStamp = timeStamp;

		secondsPassed = Math.min(secondsPassed, 0.1);

		// Loop over all game objects to update
		for (let i = 0; i < this.gameObjects.length; i++) {
			this.gameObjects[i].update(secondsPassed);
		}
		
		this.detectCollisions(secondsPassed);
		this.clearCanvas();

		// Loop over all game objects to draw
		for (let i = 0; i < this.gameObjects.length; i++) {
			this.gameObjects[i].draw();
		}

		// The loop function has reached it's end
		// Keep requesting new frames
		window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
	}

	detectCollisions(secondsPassed) {
		var obj1;
		var obj2;

		for (var i = 0; i < this.gameObjects.length; i++) {
			obj1 = this.gameObjects[i];
			obj1.isColliding = false;
		

			const canvasWidth = 750;
			const canvasHeight = 400;

		// 	if (obj1.x < obj1.radius) {
		// 		obj1.vx = Math.abs(obj1.vx) * 1.16;
		// 		obj1.x = obj1.radius;
		// 		obj1.isColliding = true;
		// 	} else if (obj1.x > canvasWidth - obj1.radius) {
		// 		obj1.vx = -Math.abs(obj1.vx) * 1.16;
		// 		obj1.x = canvasWidth - obj1.radius;
		// 		obj1.isColliding = true;
		// 	}
		// 	if (obj1.y < obj1.radius) {
		// 		obj1.vy = Math.abs(obj1.vy) * 1.16;
		// 		obj1.y = obj1.radius;
		// 		obj1.isColliding = true;
		// 	} else if (obj1.y > canvasHeight - obj1.radius) {
		// 		obj1.vy = -Math.abs(obj1.vy) * 1.16;
		// 		obj1.y = canvasHeight - obj1.radius;
		// 		obj1.isColliding = true;
		// 	}
		// }

		for (var i = 0; i < this.gameObjects.length; i++) {
			obj1 = this.gameObjects[i];
			for (var j = i + 1; j < this.gameObjects.length; j++) {
				obj2 = this.gameObjects[j];
				if (this.circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {
					obj1.isColliding = true;
					obj2.isColliding = true;

					var vCollision = {x: obj2.x - obj1.x, y: obj2.y - obj1.y};
					var distance = this.getDistance(obj1.x, obj1.y, obj2.x, obj2.y);
					var vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
					var vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
					var speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

					if (speed < 0) {
						break;
					}

					// Apply restitution to the speed
					speed *= Math.min(obj1.restitution, obj2.restitution);

					var impulse = 2 * speed / (obj1.mass + obj2.mass);
					obj1.vx -= (impulse * obj2.mass * vCollisionNorm.x);
					obj1.vy -= (impulse * obj2.mass * vCollisionNorm.y);
					obj2.vx += (impulse * obj1.mass * vCollisionNorm.x);
 					obj2.vy += (impulse * obj1.mass * vCollisionNorm.y);
				}
			}
		}
	}

	getDistance(x1, y1, x2, y2){
		return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
	}

	circleIntersect(x1, y1, r1, x2, y2, r2) {

		// Calculate the distance between the two circles
		var squareDistance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);

		// When the distance is smaller or equal to the sum
		// of the two radius, the circles touch or overlap
		return squareDistance <= ((r1 + r2) * (r1 + r2))
	}

	clearCanvas() {
		// Clear the canvas
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

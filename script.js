var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

var c = canvas.getContext('2d');

// for(let i = 0; i<100; i++){
//   colors = ['#6b56a0', '#2ecc71', '#e74c3c', '#2c3e50', '#f1c40f', '#1abc9c', '#3498db', '#9b59b6', '#e67e22'];
//   x = Math.random() * window.innerWidth;
//   y = Math.random() * window.innerHeight
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = colors[parseInt(Math.random() * colors.length)];
//   c.stroke()
// }

var mouse = {
	x: undefined,
	y: undefined
};

var maxRadius = 40;
var minRadius = 4;

colors = [
	'#6b56a0',
	'#2ecc71',
	'#e74c3c',
	'#2c3e50',
	'#f1c40f',
	'#1abc9c',
	'#3498db',
	'#9b59b6',
	'#e67e22'
];

window.addEventListener('mousemove', function(e) {
	mouse.x = e.x;
	mouse.y = e.y;
});

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;

  init();
})

function Circle(x, y, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
	this.color = color;
	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = color;
		c.fill();
	};

	this.update = function() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.radius > innerWidth || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		// Interactivity
		if (
			mouse.x - this.x < 50 &&
			mouse.x - this.x > -50 &&
			mouse.y - this.y < 50 &&
			mouse.y - this.y > -50
		) {
			if (this.radius < maxRadius) {
				this.radius += 1;
			}
		} else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}

		this.draw();
	};
}
let circleArr = [];

function init() {
  circleArr = [];
  for (let i = 0; i < 1000; i++) {
    let x = Math.random() * (innerWidth - 30 * 2) + 30;
    let y = Math.random() * (innerHeight - 60) + 30;
    let dx = (Math.random() - 0.5) * 3;
    let dy = (Math.random() - 0.5) * 3;
    let radius = Math.random() * 4 + 3;
    circleArr.push(
      new Circle(
        x,
        y,
        dx,
        dy,
        radius,
        colors[parseInt(Math.random() * colors.length)]
      )
    );
  }
}

function animate() {
	requestAnimationFrame(animate);

	c.clearRect(0, 0, innerWidth, innerHeight);
	for (let i = 0; i < circleArr.length; i++) {
		circleArr[i].update();
	}
}

animate();

init();

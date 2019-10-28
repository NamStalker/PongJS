// Game Settings
const fps = 60;

// Game Variables
var xDirection = 1;
var yDirection = 1;
var speed = 4;

// Game Objects
var ball = {
	x: 390,
	y: 240,
	radius: 10
}

// Document constants
const canvas = document.getElementById("pong");
const draw = canvas.getContext("2d");

// Game start
startGame();

function startGame(){
	// Get the random start directions.
	xDirection = getStartDirection();
	yDirection = getStartDirection();

	// Runs the game at X frames per second.
	setInterval(gameTick, 1000/fps);
}

// Main game functions.
function gameTick(){
	wipeScreen();
	updateBall();
	drawBall();
}

// Returns either -1 or 1.
function getStartDirection(){
	var tempdir = 0;
	while (tempdir == 0){
		tempdir =  Math.floor(Math.random() * (1 - (-1) + 1)) + (-1);
	}
	return tempdir;
}

// Clears the screen and draws the black background.
function wipeScreen(){
	draw.clearRect(0, 0, canvas.width, canvas.height);

	// Fill the background.
	draw.fillStyle = "black";
	draw.fillRect(0, 0, canvas.width, canvas.height);
}

// Draws the ball.
function drawBall(x, y){
	draw.fillStyle = "white";
	draw.beginPath();
	draw.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, false);
	draw.closePath();
	draw.fill();
}

// Updates the ball position
function updateBall(){
	// Bounce the ball off of the top and bottom of the screen.
	if ((ball.y-ball.radius) <= 0)
		yDirection *= -1;
	if ((ball.y+ball.radius) >= canvas.height)
		yDirection *= -1;

	ball.x += xDirection * speed;
	ball.y += yDirection * speed;
}
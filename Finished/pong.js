/**************************** 
 * Document Constants
*****************************/
const canvas = document.getElementById("pong");
const draw = canvas.getContext("2d");

/**************************** 
 * Game Settings
*****************************/
const fps = 60;

/**************************** 
 * Game Variables
*****************************/
// Ball physics
var xDirection = 1;
var yDirection = 1;
var speed = 4;

// Score
var player1score = 0;
var player2score = 0;

/**************************** 
 * Game Objects
*****************************/
var ball = {
	x: 390,
	y: 240,
	radius: 10
}

var user = {
	x: 20,
	y: 200,
	width: 10,
	height: 100
}

var com = {
	x: 770,
	y: 200,
	width: 10,
	height: 100
}
/**************************** 
 * Game Start
*****************************/

canvas.addEventListener("mousemove",movePaddle);

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
	drawPaddle(user.x, user.y, user.width, user.height);
	drawPaddle(com.x, com.y, com.width, com.height);
	var computerLevel = 0.1;
	com.y += (ball.y -(com.y + com.height/2)) * computerLevel;
	
	
	checkScoreCondition();
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

	// Draw the scores
	draw.fillStyle = "white";
	draw.font = "48px serif";
	draw.textAlign = "center";
	draw.fillText(player1score, canvas.width/4, 48);
	draw.fillText(player2score, canvas.width*3/4, 48);
}

// Draws the paddles
function drawPaddle(x, y, width, height)
{
	draw.fillstyle = "white";
	draw.fillRect(x, y, width, height);
}

// Draws the ball.
function drawBall()
{
	draw.fillStyle = "white";
	draw.beginPath();
	draw.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, false);
	draw.closePath();
	draw.fill();
}

// moves paddles 
function movePaddle(evt){
	var rect = canvas.getBoundingClientRect();
	user.y = event.clientY - rect.top - user.height/2; 
}



// Updates the ball position
function updateBall(){
	// Bounce the ball off of the top and bottom of the screen.
	if ((ball.y-ball.radius) <= 0)
		yDirection *= -1;
	if ((ball.y+ball.radius) >= canvas.height)
		yDirection *= -1;

	// check for paddle collision.
	let player = (ball.x < canvas.width/2) ? user : com;

	if (collision(ball, player)){
		ball.xdirection *= -1;
	}

	ball.x += xDirection * speed;
	ball.y += yDirection * speed;
}

function collision(b,p){
	b.top = b.y - b.radius;
	b.bottom = b.y + b.radius;
	b.left = b.x - b.radius;
	b.right = b.x - b.radius;

	p.top = p.y;
	p.bottom = p.y + p.height;
	p.left = p.x;
	p.right - p.x + p.width;

	return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
	
}

// Checks for the condition that a paddle lets the ball through.
function checkScoreCondition(){
	// used to not duplicate code
	var resetBall = () => {
		// back to start position
		ball.x = canvas.width/2 - ball.radius;
		ball.y = canvas.height/2 - ball.radius;

		xDirection = getStartDirection();
		yDirection = getStartDirection();
	}

	if ((ball.x - ball.radius) <= 0){
		// reaches leftmost wall, player 2 gets a point
		player2score++;
		resetBall();
	}
	else if ((ball.x + ball.radius) >= canvas.width) {
		// reaches rightmost wall, player 1 gets a point
		player1score++;
		resetBall();
	}
}
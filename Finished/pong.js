const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

// Fill the background.
context.fillStyle = "black";
context.fillRect(0, 0, 800, 500);

drawBall();

function drawBall(x, y){
	context.fillStyle = "white";
	context.beginPath();
	context.arc(390, 240, 10, 0, Math.PI*2, false);
	context.closePath();
	context.fill();
}
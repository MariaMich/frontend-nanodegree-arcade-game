// Starting and initializing the game
function startGame() {
	// Checking who character is selected by the user
	let selectedCharacter = document.querySelector('.selected').id;
	// Changing the sprite of the character according who is selected
	switch (selectedCharacter) {
		case 'girl':
			player.sprite = 'images/char-pink-girl.png';
			break;
		case 'boy':
			player.sprite = 'images/char-boy.png';
			break;
		case 'bug':
			player.sprite = 'images/enemy-bug.png';
			break;
	}
}
// Finishing the game and making the popup and the overlay appear
function winGame() {
	const OVERLAY = document.getElementById('overlay');
	OVERLAY.classList.remove('hidden');
	const WIN = document.getElementById('win');
	WIN.classList.remove('hidden');
}
// removing all selected classes to un-style the character's choise popup
function removeSelectedClass() {
	document.getElementById('girl').classList.remove('selected');
	document.getElementById('boy').classList.remove('selected');
	document.getElementById('bug').classList.remove('selected');
}
// Reset the character when they collide with an enemy
function reset() {
	// Position of the player when resetting
	player.x = 200;
	player.y = 480;
}
// Enemies that when they collide with our player make them reset
var Enemy = function(x, y, speed) {
	// The image for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
	// Take the position from the parameter
	this.x = x;
	this.y = y;
	// Take the speed from the parameter
	this.speed = speed;
};
// Updating the enemy's position,
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += (this.speed * dt);
	if (this.x >= 1024) this.x = -240;
	// Checking if the enemy is at the same location as the player
	// Resetting the position of the player if true
	if (this.y === player.y) {
		if (player.x >= this.x - 50 && player.x <= this.x + 50) reset();
	}
};
// Drawing the enemies on screen
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
	// Defining the initial sprite
	this.sprite = 'images/enemy-bug.png';
	// Its position is taken from the parameter
	this.x = x;
	this.y = y;
};
// Checking to see if the player has finished
Player.prototype.update = function(dt) {
	// If true the congratulations popup appears
	if (this.y === 0) winGame();
};
// Drawing the player on screen
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Managing the player's movement with the arrow keys
Player.prototype.handleInput = function(keycode) {
	// Moving the player accordingly
	switch (keycode) {
		case 'up':
			if (player.y - 120 >= 0) player.y -= 120;
			break;
		case 'down':
			if (player.y + 120 <= 500) player.y += 120;
			break;
		case 'left':
			if (player.x - 100 >= 0) player.x -= 100;
			break;
		case 'right':
			if (player.x + 101 <= 498) player.x += 101;
			break;
	}
};
// Now instantiate your objects.
// Place the player object in a variable called player
let player = new Player(200, 480);
// Instantiating the enemies
let enemy1 = new Enemy(0, 120, 250);
let enemy2 = new Enemy(-360, 120, 326);
let enemy3 = new Enemy(-120, 120, 542);
let enemy4 = new Enemy(-240, 240, 704);
let enemy5 = new Enemy(-360, 240, 298);
let enemy6 = new Enemy(0, 240, 402);
let enemy7 = new Enemy(-480, 360, 476);
let enemy8 = new Enemy(-240, 360, 665);
// Place all enemy objects in an array called allEnemies
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8];
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});
// Restarting the game after winning if the restart button is clicked
const RESTART = document.getElementById('restart');
RESTART.addEventListener('click', function() {
	location.reload();
});
// Choosing which character to play
const CHARACTER_SELECTION = document.getElementById('character-selection');
CHARACTER_SELECTION.addEventListener('click', function(event) {
	let characterChoosen = event.target;
	// Checking the id of the element/parent
	// When a character is clicked, remove the selected class for every character and add it to the selected one
	if (event.target.id === 'girl' || event.target.parentElement.id === 'girl') {
		removeSelectedClass();
		document.getElementById('girl').classList.add('selected');
	} else if (event.target.id === 'boy' || event.target.parentElement.id === 'boy') {
		removeSelectedClass();
		document.getElementById('boy').classList.add('selected');
	} else if (event.target.id === 'bug' || event.target.parentElement.id === 'bug') {
		removeSelectedClass();
		document.getElementById('bug').classList.add('selected');
	}
});
// Starting the game after the player is selected
const START = document.getElementById('start');
START.addEventListener('click', function() {
	// Hiding the starting popup
	document.getElementById('character').classList.add('hidden');
	document.getElementById('overlay').classList.add('hidden');
	startGame();
});

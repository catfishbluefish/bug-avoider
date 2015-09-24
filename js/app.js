//Sound
var hurt = new Audio('audio/hurt.mp3'),
    step = new Audio('audio/go.mp3');
    
var player;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    max = 300;
    min = 75;
    this.speed = this.setEnemySpeed();
    this.sprite = 'images/enemy-bug.png';
    Resources.load(this.sprite);
};

Enemy.prototype.setEnemySpeed = function() {
    this.speed = (Math.floor(Math.random() * (max-min) + min));
    return this.speed;
};


Enemy.prototype.setEnemyY = function() {
    var maxY = 250;
    var minY = 100;
    this.y = Math.floor(Math.random() * (maxY - minY) + minY)
    return this.y;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 500) {
        this.x = this.x + (dt * this.speed);
    } else {
        this.x = -200;
        this.speed = this.setEnemySpeed();
        this.y = this.setEnemyY();
        
    }    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


//END ENEMY






//PLAYER

var Player = function(chosenSprite) {

    this.sprite = chosenSprite;
    Resources.load(this.sprite);
    this.x = 200;
    this.y = 400;

};


Player.prototype.update = function(x, y) {
    if(this.y == 0) {
        this.reset();
    } else {
        this.render(x,y);
    }
};

Player.prototype.render = function(x, y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {

    step.play();
    if(!gamePaused) {
        if(key == 'left' && this.x > 0) {
            this.x = this.x - 100;
            console.log( "Left" + this.x);        
        } else if(key == 'up' && this.y > 0) {
            this.y = this.y - 100;
            console.log("Up" + this.y);
        } else if(key == 'right' && this.x < 400) {
            this.x = this.x + 100;
            console.log("Right" + this.x);
        } else if(key == 'down' && this.y < 400) { 
            this.y = this.y + 100;
            console.log("Down" + this.y);
        } 
        player.update(this.x, this.y);
    }    
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
    this.update();
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(-300, Math.floor(Math.random() * (300 - 100) * 100)),
    new Enemy(-300, 100),
    new Enemy(-300, 120),
    new Enemy(-300, 100),
    new Enemy(-500, Math.floor(Math.random() * (300 - 100) * 100)),
    new Enemy(-500, Math.floor(Math.random() * (300 - 100) * 100))
    ];




Enemy.prototype.checkCollisions = function() {
    if(player.x < this.x + 75 &&
        player.x + 65 > this.x &&
        player.y < this.y + 50 &&
        player.y + 70 > this.y) {
        hurt.play();
        life = life - 1;
        player.reset();
        return(life);
    }
};




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

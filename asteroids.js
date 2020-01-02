//location of background
var backgroundX = 375;
var backgroundY = 10;
//location of player
var playerX = 650;
var playerY = 390;
//var bulletY = playerY + 30;
//var bullets = [];
var asteroids = [];
var lives = 3;
var score = 0;
var level = 0;
var invincible = false;
var smallAsteroids = [];
var pause = false;

var xx=0;
var yy=0;
window.onscroll=function(){window.scrollTo(xx, yy);};

/* Game state variables */
var start = null;
var currentInput = {
  space: false,
  left: false,
  right: false,
  up: false,
  down: false,
  r: false,
}
var priorInput = {
  space: false,
  left: false,
  right: false,
  up: false,
  down: false,
  r: false,
}



/** @function handleKeydown
  * Event handler for keydown events
  * @param {KeyEvent} event - the keydown event
  */
function handleKeydown(event) {
  switch(event.key) {
    case ' ':
      currentInput.space = true;
      break;
    case 'ArrowUp':
    case 'w':
      currentInput.up = true;
      break;
    case 'ArrowDown':
    case 's':
      currentInput.down = true;
      break;
    case 'ArrowRight':
    case 'd':
      currentInput.right = true;
      break;
    case 'ArrowLeft':
    case 'a':
      currentInput.left = true;
      break;
      case 'r':
        currentInput.r = true;
        break;
  }
}

// Attach keyup event handler to the window
window.addEventListener('keydown', handleKeydown);

/** @function handleKeyup
  * Event handler for keyup events
  * @param {KeyEvent} event - the keyup event
  */
function handleKeyup(event) {
  switch(event.key) {
    case ' ':
      currentInput.space = false;
      break;
    case 'ArrowUp':
    case 'w':
      currentInput.up = false;
      break;
    case 'ArrowDown':
    case 's':
      currentInput.down = false;
      break;
    case 'ArrowRight':
    case 'd':
        currentInput.right = false;
        break;
    case 'ArrowLeft':
    case 'a':
        currentInput.left = false;
        break;
    case 'r':
        currentInput.r = false;
        break;
  }
}
// Attach keyup event handler to the window
window.addEventListener('keyup', handleKeyup);



function restart(){
  pause = false;
  score = 0;
  lives = 3;
  level = 0;
  asteroids = [];
  smallAsteroids = [];
  loop(0);
//  generateStroids();
}


/** @function loop
  * The main game loop
  * @param {DomHighResTimestamp} timestamp - the current system time,
  * in milliseconds, expressed as a double.
  */
function loop(timestamp) {
  if(!start) start = timestamp;
  var elapsedTime = timestamp - start;
  start = timestamp;
  update(elapsedTime);
  render(elapsedTime);
  ctx.stroke();
  pollInput();
  if(pause) {
    ctx.stroke();
    return;
  }
  window.requestAnimationFrame(loop);
}


/** @function pollInput
  * Copies the current input into the previous input
  */
function pollInput() {
  priorInput = JSON.parse(JSON.stringify(currentInput));
}


/** @function update
  * Updates the game's state
  * @param {double} elapsedTime - the amount of time
  * elapsed between frames
  */
function update(elapsedTime) {

  if(currentInput.space && !priorInput.space) {
    if(ship.bullets.length < 1){
    ship.bullets.push(new spaceShipBullet());
    playSound("lazer.wav");
  }
  }
  if (currentInput.up) {
      ship.thrust.x += 5 * Math.cos(ship.angle);
      ship.thrust.y -= 5 * Math.sin(ship.angle);
      ship.x = ship.thrust.x;
      ship.y = ship.thrust.y;

  }
  if (currentInput.right) {
    ship.angle -= elapsedTime/200;

  }
  if (currentInput.left) {
ship.angle += elapsedTime/200;

  }
  if (currentInput.down && !priorInput.down) {
      ship.x = Math.floor(Math.random() * 500) + 400;
      ship.y = Math.floor(Math.random() * 650) + 10;
      ship.thrust.x = ship.x;
      ship.thrust.y = ship.y;
  }



  ship.bullets.forEach(function(spaceShipBullet, index){
   spaceShipBullet.update();

 });



  //check if objects are crossing over the border
  edgeHandler();
}//end update function


function playSound(soundfile){
    document.getElementById("sound").innerHTML="<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\"/>";
}


function edgeHandler(){
  //edge checker for spaceship
  if(ship.x < 375 - ship.radius){
    ship.x  = canvas.width + ship.radius;
    ship.thrust.x = canvas.width;
  }
  else if(ship.x > canvas.width + ship.radius){
    ship.x = 375 - ship.radius;
    ship.thrust.x = 375
  }
  if(ship.y < 10 - ship.radius){
    ship.y  = canvas.height + ship.radius;
    ship.thrust.y = canvas.height;
  }
  else if(ship.y > canvas.height + ship.radius){
    ship.y = 10 - ship.radius;
    ship.thrust.y = 10;
  }

  //edge checker for spaceShipBullets
  ship.bullets.forEach(function(spaceShipBullet, index){
    if(spaceShipBullet.x < 375 ){
      ship.bullets.splice(index, 1);
    }
    else if(spaceShipBullet.x > canvas.width){
      ship.bullets.splice(index, 1);
    }
    if(spaceShipBullet.y < 10){
      ship.bullets.splice(index, 1);
    }
    else if(spaceShipBullet.y > canvas.height){
      ship.bullets.splice(index, 1);
    }
 });
}
/** @function render
  * Renders the game into the canvas
  * @param {double} elapsedTime - the amount of time
  * elapsed between frames
  */
function render(elapsedTime) {
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //ctx.clearRect(0, 0, 2000, 2000);
  ctx.closePath();
  ctx.beginPath();
  //background.rect(backgroundX,backgroundY,canvas.width,canvas.height);
  canvas.fillStyle = "black";
  ctx.fill(background);
  ctx.stroke(background);
  ctx.beginPath();
  spaceShipBullet(elapsedTime);
  Spaceship.show();
  ctx.beginPath();
  ctx.strokeStyle = "#FF0000";
  ctx.strokeRect(backgroundX, backgroundY, 624, 764);
  ctx.closePath();
  ctx.stroke();



  ship.bullets.forEach(function(spaceShipBullet){

    spaceShipBullet.render(ctx);

  });

if(lives <= 0){
  if(currentInput.r){
    restart();
  }
  gameOver(ctx);
}
else{
  //asteroids.forEach(function(newAsteroid))
  if(asteroids.length > 0){

    drawAsteroid();

  }
  else if(smallAsteroids.length <= 0){
    level++;

    generateStroids();

  }
  if(smallAsteroids.length > 0){

    drawSmallAsteroid();

  }
}

  updateLevel(ctx);
  updateLives(ctx);
  updateScore(ctx);
  directions(ctx);
  credits(ctx);


}//end render function



/** @function generateStroids
  * creates and pushes asteroids onto list
  *
  */
function generateStroids(){
  var x;
  var y;
  for(var i  = 0; i < 8; i++){
    x = Math.floor(/*Math.random() **/ canvas.width /2);
    y = Math.floor(Math.random() * canvas.height);
    asteroids.push(newAsteroid(x, y));
  }
}

/** @function generateSmallStroids
  * creates and pushes small asteroids onto list
  *
  */
function generateSmallStroids(bigx, bigy){
  var x = bigx;
  var y = bigy;
  for(var i  = 0; i < 2; i++){
    smallAsteroids.push(newSmallAsteroid(x, y));
  }
}

/** @function newAsteroid
  * creates random dimensions and speed for asteroid
  *
  */
function newAsteroid(x, y){
  var stroid = {
    x: x,
    y: y,
    xv: Math.random() * 2 * (Math.random() < 0.5 ? 1 : - 1),
    yv: Math.random() * 2 * (Math.random() < 0.5 ? 1 : - 1),
    radius: Math.floor(Math.random() * 50) + 30,
    angle: Math.random() * 360,
    edge: Math.floor(Math.random() * (11) + 10/2),
  };
  return stroid;
}

/** @function newSmallAsteroid
  * creates random dimensions and speed for small asteroid
  *
  */
function newSmallAsteroid(x, y){
  var smallStroid = {
    x: x,
    y: y,
    xv: Math.random() * 3 * (Math.random() < 0.5 ? 1 : - 1),
    yv: Math.random() * 3 * (Math.random() < 0.5 ? 1 : - 1),
    radius: 20,
    angle: Math.random() * 360,
    edge: Math.floor(Math.random() * (11) + 10/2),
  };
  return smallStroid;
}

/** @function drawSmallAsteroid
  * draws and moves small asteroid
  *
  */
function drawSmallAsteroid(){
  ctx.strokeStyle = "white";
  for(var i = 0; i < smallAsteroids.length; i++){
    ctx.beginPath();
    ctx.moveTo(smallAsteroids[i].x + smallAsteroids[i].radius * Math.cos(smallAsteroids[i].angle),
    smallAsteroids[i].y + smallAsteroids[i].radius * Math.sin(smallAsteroids[i].angle)

  );
  ctx.closePath();

    for(var j = 0; j < smallAsteroids[i].edge; j++){

      ctx.lineTo(
        smallAsteroids[i].x + smallAsteroids[i].radius * Math.cos(smallAsteroids[i].angle + j * Math.PI * 2 / smallAsteroids[i].edge),
        smallAsteroids[i].y + smallAsteroids[i].radius * Math.sin(smallAsteroids[i].angle + j * Math.PI * 2 / smallAsteroids[i].edge)
      );
     moveAsteroid();

    }
    ctx.closePath();
    ctx.stroke();

    //moves asteroids randomly
    smallAsteroids[i].x += smallAsteroids[i].xv;
    smallAsteroids[i].y += smallAsteroids[i].yv;

   //check collision
    for(var a  =  0; a < smallAsteroids.length; a++){
      if(collidor(ship.x,ship.y,smallAsteroids[a].x,smallAsteroids[a].y) < ship.radius + smallAsteroids[a].radius - 3){
      //place ship back at center
      ship.x = 675;
      ship.y = canvas.height / 2;
      ship.thrust.x = 675;
      ship.thrust.y = canvas.height / 2;
      playSound("explosion.mp3");
      //subtract 1 from  total lives
      if(invincible == false) lives--;
      //place shield over ship for a few seconds
      invincible = true;
      window.setTimeout('invincible = false', 3000);
      }
    }

    //check bullet collision IN PROGRESS
     for(var e  =  0; e < smallAsteroids.length; e++){
       ship.bullets.forEach(function(spaceShipBullet, index){
       if(collidor(spaceShipBullet.x,spaceShipBullet.y,smallAsteroids[e].x,smallAsteroids[e].y) < spaceShipBullet.radius + smallAsteroids[e].radius - 3){
       ship.bullets.splice(index, 1);
       smallAsteroids.splice(e, 1);
       score = score + 10;
       playSound("explosion.mp3");
      // alert(smallAsteroids.length);
      if(asteroids.length <= 0 || smallAsteroids.length <= 0){
         //generateSmallStroids();
       }
       }
     });
     }

     ctx.beginPath();
     //if all small asteroids are destroyed we escape the loop
     if(smallAsteroids.length == 0) break;

    //check edges for asteroids
    if(smallAsteroids[i].x < 475 - smallAsteroids[i].radius){
      smallAsteroids[i].x  = canvas.width + smallAsteroids[i].radius;
    }
    else if(smallAsteroids[i].x > canvas.width + smallAsteroids[i].radius){
      smallAsteroids[i].x = 475 - smallAsteroids[i].radius;
    }
    if(smallAsteroids[i].y < 10 - smallAsteroids[i].radius){
      smallAsteroids[i].y  = canvas.height + smallAsteroids[i].radius;
    }
    else if(smallAsteroids[i].y > canvas.height + smallAsteroids[i].radius){
      smallAsteroids[i].y = 10 - smallAsteroids[i].radius;
    }

    ctx.closePath();
    //check bullet impact on asteroids IN PROGRESS

  }
}

/** @function drawAsteroid
  * draws and moves asteroid
  *
  */
function drawAsteroid(){
  ctx.strokeStyle = "white";
  for(var i = 0; i < asteroids.length; i++){
    ctx.beginPath();
    ctx.moveTo(asteroids[i].x + asteroids[i].radius * Math.cos(asteroids[i].angle),
    asteroids[i].y + asteroids[i].radius * Math.sin(asteroids[i].angle)

  );

    for(var j = 0; j < asteroids[i].edge; j++){

      ctx.lineTo(
        asteroids[i].x + asteroids[i].radius * Math.cos(asteroids[i].angle + j * Math.PI * 2 / asteroids[i].edge),
        asteroids[i].y + asteroids[i].radius * Math.sin(asteroids[i].angle + j * Math.PI * 2 / asteroids[i].edge)
      );
      moveAsteroid();

    }
    ctx.closePath();
    ctx.stroke();

    //moves asteroids randomly
    asteroids[i].x += asteroids[i].xv;
    asteroids[i].y += asteroids[i].yv;

   //check collision
    for(var a  =  0; a < asteroids.length; a++){
      if(collidor(ship.x,ship.y,asteroids[a].x,asteroids[a].y) < ship.radius + asteroids[a].radius - 3){
      //place ship back at center
      ship.x = 675;
      ship.y = canvas.height / 2;

      ship.thrust.x = 675;
      ship.thrust.y = canvas.height / 2;
      playSound("explosion.mp3");
      //subtract 1 from  total lives
      if(invincible == false) lives--;
      //place shield over ship for a few seconds
      invincible = true;
      window.setTimeout('invincible = false', 3000);
      }
    }

    //check bullet collision IN PROGRESS
     for(var e  =  0; e < asteroids.length; e++){
       ship.bullets.forEach(function(spaceShipBullet, index){
       if(collidor(spaceShipBullet.x,spaceShipBullet.y,asteroids[e].x,asteroids[e].y) < spaceShipBullet.radius + asteroids[e].radius - 3){
       ship.bullets.splice(index, 1);
       score = score + 10;
       var tempX = asteroids[e].x;
       var tempY = asteroids[e].y;
       asteroids.splice(e, 1);
       generateSmallStroids(tempX,tempY);
       playSound("explosion.mp3");
       //alert(asteroids.length)
       if(asteroids.length <= 0 && smallAsteroids.length <= 0){
         generateStroids();
       }
       }
     });
     }

     //if all small asteroids are destroyed we escape the loop
     if(asteroids.length == 0) break;

    //check edges for asteroids
    if(asteroids[i].x < 475 - asteroids[i].radius){
      asteroids[i].x  = canvas.width + asteroids[i].radius;
    }
    else if(asteroids[i].x > canvas.width + asteroids[i].radius){
      asteroids[i].x = 475 - asteroids[i].radius;
    }
    if(asteroids[i].y < 10 - asteroids[i].radius){
      asteroids[i].y  = canvas.height + asteroids[i].radius;
    }
    else if(asteroids[i].y > canvas.height + asteroids[i].radius){
      asteroids[i].y = 10 - asteroids[i].radius;
    }

    //check bullet impact on asteroids IN PROGRESS

  }
}

function moveAsteroid(){

}

/** @function collidor
  * finds distance between two objects
  *
  */
function collidor(x1,y1,x2,y2){
  var tempOne = x2 - x1;
  var tempTwo = y2 - y1;
  var finalX = tempOne * tempOne;
  var finalY = tempTwo * tempTwo;
  return Math.sqrt(finalX + finalY);
}


/** @function updateLives
  * updates lives count
  * @param {var} ctx uses canvas context
  */
function updateLives(ctx){
   ctx.fillStyle = "#00FF00";
   ctx.fillText("lives: " + lives, 220, 500,);
   ctx.font = "30px Arial";
  // ctx.fillText(score, 200, 600);
  ctx.fillStyle = "black";
}

/** @function updateScore
  * updates score count
  * @param {var} ctx uses canvas context
  */
function updateScore(ctx){
   ctx.fillStyle = "#00FF00";
   ctx.fillText("score: " + score, 220, 550,);
   ctx.font = "30px Arial";
  // ctx.fillText(score, 200, 600);
  ctx.fillStyle = "black";
}

/** @function updateLevel
  * updates level count
  * @param {var} ctx uses canvas context
  */
function updateLevel(ctx){
   ctx.fillStyle = "#00FF00";
   ctx.fillText("Level: " + level, 220, 450,);
   ctx.font = "30px Arial";
  // ctx.fillText(score, 200, 600);
  ctx.fillStyle = "black";
}

function directions(ctx){
  ctx.font = "15px Arial";
   ctx.fillStyle = "#00FF00";
   ctx.fillText("w,a,d to move, press s to teleport", 100, 350,);
  // ctx.fillText(score, 200, 600);
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
}

function credits(ctx){

}

/** @function gameOver
  * updates score count
  * @param {var} ctx uses canvas context
  */
function gameOver(ctx){
   ctx.fillStyle = "#00FF00";
   ctx.fillText("Game Over, press r to restart", 500, 500);
   ctx.font = "30px Arial";
  // ctx.fillText(score, 200, 600);
  ctx.fillStyle = "black";
}







//Build game board with canvas
var canvas = document.getElementById('canvas');

canvas.width = 1000;
canvas.height = 775;
var guiBackground = new Path2D();
//guictx.rect(1010,10,250,100);
//gui.fillStyle = "black";
//guictx.fill(guibackground);
//guictx.stroke(guibackground);

var ctx = canvas.getContext('2d');
var background = new Path2D();
var entireBackground = new Path2D();
//var bullet = new Path2D();
/*DEB CODE*/
var enemyb = new Path2D();
//create initial asteroids
generateStroids();



// Start the game loop
window.requestAnimationFrame(loop);

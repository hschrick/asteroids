const BULLET_ALIGN = 10;
const BULLET_SPEED = 10;
// Bullet class
function spaceShipBullet(elapsedTime) {
  //horizontal of spaceships angle
  this.x = ship.x + BULLET_ALIGN; //+ 3/2 * ship.radius * Math.cos(ship.angle); //remove 10 if doesnt  work
  //verticle of spaceships angle
  this.y = ship.y + BULLET_ALIGN; // - 3/2 * ship.radius * Math.sin(ship.angle); //remove 10 if doesnt  work
  this.radius = .1;
  this.xv = 10 * Math.cos(ship.angle);
  this.yv = -10 * Math.sin(ship.angle);
}

spaceShipBullet.prototype.update = function() {
    for(i = 0; i < ship.bullets.length; i++){
    ship.bullets[i].x += ship.bullets[i].xv;
    ship.bullets[i].y += ship.bullets[i].yv;
  }
}

spaceShipBullet.prototype.render = function(context) {
  for(i = 0; i < ship.bullets.length; i++){
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(this.x,this.y, 2, 0, 360, false);
  ctx.fill();
  ctx.fillStyle = "black";
  ctx.closePath();
  ctx.stroke();
  }
}

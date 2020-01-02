function Spaceship(){
  //this.x = width/2;

}

var ship = {
    x: 675,
    y: canvas.height / 2,
    radius: 15,
    angle: 90 / 180 * Math.PI, // convert to radians
    rotate: 0,
    bullets: [],
    thrust: {
        x: 675,
        y: canvas.height / 2
    }
}

Spaceship.show = function(){
  ctx.save();
  // Draw player's ship
 ctx.translate(ship.x, ship.y);
 ctx.rotate(-ship.angle);
 if(invincible == true) {ctx.strokeStyle = "yellow";} else {ctx.strokeStyle = "white";}
 //left strut
 ctx.beginPath();
 ctx.moveTo(0,5);
 ctx.lineTo(-35, -10);
 ctx.stroke();
 ctx.closePath();
 //end left strut
 //engine area
 ctx.strokeStyle = "white";
 ctx.beginPath();
 ctx.moveTo(-25, 20);
 ctx.lineTo(-25, -10);
 ctx.stroke();
 ctx.closePath();
 if(currentInput.up){
 //build propellent
 ctx.beginPath();
 ctx.moveTo(-25, 10);
 ctx.lineTo(-40, 5);
 ctx.lineTo(-25, 0);
 ctx.closePath();
 ctx.beginPath();
 ctx.fillStyle = "orange";
 ctx.fill();
 ctx.stroke();
 ctx.closePath();
 ctx.fillStyle = "black";
}
 //end engine area
 //right strut
 ctx.beginPath();
 ctx.moveTo(-35, 20);
 ctx.lineTo(0, 5);
 ctx.stroke();
 ctx.closePath();
 //ctx.closePath();
 //test
 //end right strut
if(invincible == true) {ctx.strokeStyle = "yellow";} else {ctx.strokeStyle = "white";}
 ctx.stroke();
 ctx.closePath();
ctx.restore();
ctx.strokeStyle = "white";
}


Spaceship.gun = function(){

}

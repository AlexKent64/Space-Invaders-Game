//variables
let width = 650;
let height = 500;
let x = width/2;
let y = height-50;
let xLaser = width/2;
let yLaser = height-50;
let alienProjectileSpeed = 2;
let myShip;
let myLaser;
let alienScoreR1;
let alienScoreR2;
let alienScoreR3;
let shotTimer = 0;
let medium = false;
let easy = false;
let hard = false;
let moveLeft= false;
let moveRight= false;
let shot= false;
let newGame = false;
let help = false;
let overPlay = false;
let overScore = false;
let overReturn = false;
let xSpeed = 3;
let xAlien =40;
let yAlien =30;
let redAlien;
let alienLeft = false;
let alienRight = true;
let allAliensDead = true;
let projectileRow =0;
let row = 2;
let highScore = 0;
let newAlienY;
let newAlienY2;
let newAlienY3;
let score = 0;
let round = 1;
let timer = 0;
let alienLife = 2;
let playerLife = 3
let alienRow1 = 0;
let alienRow2 = 0;
let alienRow3 = 0;

//Arrays
let shotMultiplier = 1.2;
var alienType = [1, 2];
var circleX = [];
var circleY = [];
var alienX = [40, 100, 160, 220, 280, 340, 400, 460, 520];
var alienY = [70 ,70, 70, 70, 70, 70, 70, 70, 70];
var alienX2 = [40, 100, 160, 220, 280, 340, 400, 460, 520];
var alienY2 = [80 ,80, 80, 80, 80, 80, 80, 80, 80];
var alienX3 = [40, 100, 160, 220, 280, 340, 400, 460, 520];
var alienY3 = [185, 185, 185, 185, 185, 185, 185, 185, 185];
var alienX11 =  [-100];
var alienY11 = [30];
var laserX = [];
var laserY = [];





function setup() {
  createCanvas(650, 500);
  //image setup
  logo = loadImage('images/logo.png');
  myShip = loadImage('images/spaceShip.png');
  alien1 = loadImage('images/alien1.png');
  alien2 = loadImage('images/alien2.png');
  alien3 = loadImage('images/alien3.png');
}

function draw() {
  menu();
  //draw help menu
  if (help){
    background(0);
    fill(11, 189, 54);
    //textSize(50);
    
    text("S P A C E   I N V A D E R S", 120, 120);
    text("=      10 POINTS", 260,188);
    text("=      20 POINTS", 260,265);
    text("=      100 POINTS", 260,342);
    textSize(22);
    text("Press the left and right ARROW KEYS to move. Use", 76, 400);
    text("the SPACEBAR to shoot lasers. Eliminate", 120, 430);
    text("aliens and survive as long as possible.", 137, 460)
    
    image(alien1, 150, 155, alien1.width / 18, alien1.height /18);
    image(alien2, 153, 225, alien2.width / 18, alien2.height /18);
    image(alien3, 140, 315, alien3.width / 3.8, alien3. height / 3.8);
    
    if (mouseX>26 && mouseX < 133 && mouseY > 24 && mouseY < 48){
      textSize(26);
      fill(11, 189, 54);
      text("RETURN",25, 45)
      overReturn = true;
    } else {
      textSize(25)
      fill(12, 112, 36);
      text("RETURN", 25, 45)
      overReturn = false;
    }
    
  }
  //draw new game (call functions to start new game)
  if(newGame) {
    background(0);
    image(myShip, x, y, myShip.width / 5.5, myShip.height /5.5);
    //Player functions
    playerMovement();
    playerProjectile();
    dataKeep();
    //Alien functions
    roundGenerator();
  }  
  
  //when you die, or the aliens reach the player's y-level
  if (playerLife == 0 || alienY >= y || alienY2 >= y || alienY3 >= y){
    if (score > highScore){
      highScore = score;
    }
    playerLife = 3;
    round = 1;
    alienProjectileSpeed = 1;
    laserX.length = 0;
    laserY.length = 0;
    circleX.length = 0;
    circleY.length = 0;
    alienType = [1, 2]
    alienX = [40, 100, 160, 220, 280, 340, 400, 460, 520];
    alienY = [70, 70, 70, 70, 70, 70, 70, 70, 70];
    alienX2 = [40, 100, 160, 220, 280, 340, 400, 460, 520];
    alienY2 = [80 ,80, 80, 80, 80, 80, 80, 80, 80];
    alienX3 = [40, 100, 160, 220, 280, 340, 400, 460, 520];
    alienY3 = [185, 185, 185, 185, 185, 185, 185, 185, 185];
    alienRow1 = 0;
    alienRow2 = 0;
    alienRow3 = 0;
    shotMultiplier = 1.2;
    width = 650;
    height = 500;
    x = width/2;
    y = height-50;
    xLaser = width/2;
    yLaser = height-50;
    moveLeft= false;
    moveRight= false;
    shot= false;
    newGame = false;
    help = false;
    overPlay = false;
    overReturn = false;
    overScore = false;
    score = 0;
    xSpeed = 3;
    xAlien =40;
    yAlien =30;
    alienLeft = false;
    alienRight = true;
    allAliensDead = true;
    timer = 0;
    alienLife = 2;
    playerLife = 3
    projectileRow =0;
  }

  //If all aliens are dead, create new round
  if (alienX.length <= 0){
    round = round + 1;
    allAliensDead = true;
    roundGenerator();
    randomRows();
    alienLeft = false;
    alienRight = true;
    circleY.splice(0, circleY.length);
    circleX.splice(0, circleX.length);
    alienX = [40, 100, 160, 220, 280, 340, 400, 460, 520];
    alienY = [70, 70, 70, 70, 70, 70, 70, 70, 70];
    alienX2 = [40, 100, 160, 220, 280, 340, 400, 460, 520];
    alienY2 = [80 ,80, 80, 80, 80, 80, 80, 80, 80];
    alienX3 = [40, 100, 160, 220, 280, 340, 400, 460, 520];
    alienY3 = [185, 185, 185, 185, 185, 185, 185, 185, 185];
  } 
}

function playerMovement(){
  //creates player movement
  if (keyCode === LEFT_ARROW) {
    moveLeft = true;
  } else if (keyCode === RIGHT_ARROW){
    moveRight = true;
  } 
  
  if (keyIsPressed === false) {
    moveRight = false;
    moveLeft = false;
    //shot = false;
  }
  
  if (moveRight == true && x< 608){
    x = x + xSpeed;
  } else if (moveLeft == true && x > 0){
    x = x - xSpeed;
  }  
}

function playerProjectile(){
  //creates player projectiles
  if (circleX.length >= 1){
    for (let i = 0; i < circleX.length; i++){
      circleY[i] = circleY[i]-2;
      fill(255,255,255);
      rect(circleX[i]+18, circleY[i]-3, 4, 13);
    }
    if (circleY[0] < -10) {
      circleY.shift();
      circleX.shift();
    }
  }
  //check if player projectile hits an alien in row 1
  for (let i = circleX.length-1; i >= 0; i--){
    for (let j = alienX.length-1; j >= 0; j--){
      if (circleX[i] > alienX[j] - 24 && circleX[i] < alienX[j] +24 && circleY[i] > alienY[j]+projectileRow -10 && circleY[i] < alienY[j]+projectileRow+25) {    
        alienX.splice(j, 1);
        alienY.splice(j, 1);
        circleX.splice(i, 1);
        circleY.splice(i, 1);
        score = score + alienScoreR1;
      }
    }
  } 
  //check if player projectile hits an alien in row 2
  if (round > 1){
    for (let i = circleX.length-1; i >= 0; i--){
      for (let j = alienX2.length-1; j >= 0; j--){
        if (circleX[i] > alienX2[j] - 20 && circleX[i] < alienX2[j] +20 && circleY[i] > alienY2[j]+projectileRow -10 && circleY[i] < alienY2[j]+projectileRow+54) {
          //alienLife = alienLife - 1;  
          alienX2.splice(j, 1);
          alienY2.splice(j, 1);
          circleX.splice(i, 1);
          circleY.splice(i, 1);
          score = score + alienScoreR2;
        }
      }
    } 
  }
  //check if player projectile hits an alien in row 3
  if (round > 3){
    for (let i = circleX.length-1; i >= 0; i--){
      for (let j = alienX3.length-1; j >= 0; j--){
        if (circleX[i] > alienX3[j] - 23 && circleX[i] < alienX3[j] +23 && circleY[i] > alienY3[j]+projectileRow -10 && circleY[i] < alienY3[j]+projectileRow) {
          //alienLife = alienLife - 1;  
          alienX3.splice(j, 1);
          alienY3.splice(j, 1);
          circleX.splice(i, 1);
          circleY.splice(i, 1);
          score = score + alienScoreR3;
        }
      }
    } 
  }
  //check if player projectile hits a red alien
  if (redAlien == true){
    for (let i = circleX.length-1; i >= 0; i--){
      for (let j = alienX11.length-1; j >= 0; j--){
        if (circleX[i] > alienX11[j] - 60 && circleX[i] < alienX11[j] +60 && circleY[i] > alienY11[j]+projectileRow -10 && circleY[i] < alienY11[j]+projectileRow + 5) {
          //alienLife = alienLife - 1;  
          alienX11.splice(j, 1);
          alienY11.splice(j, 1);
          circleX.splice(i, 1);
          circleY.splice(i, 1);
          score = score + 100;
          redAlien = false;
        }
      }
    } 
  }
}

function keyPressed(){
  //if the space key is pressed, push elemtns into "circle" array
  if (millis() >= 500+shotTimer) {
    if (key === ' '){
      circleX.push(x);
      circleY.push(y);
      shotTimer = millis();
    }
  }
}

function alien1Row1(){
  //draws alien1 in row1
  alienScoreR1 = 10;
  projectileRow = 0;
  alienProjectile();
  if (alienX.length >= 1){
    allAliensDead = false;
    if (alienRight == true){
      for (let i = 0; i < alienX.length; i++){
        alienX[i] = alienX[i]+0.1;
        image(alien1, alienX[i], alienY[i], alien1.width /26,alien1.height / 26);
        if (alienX[i]> 600) {
          alienRight = false;
          alienLeft = true;
          newAlienY = alienY[0]+10;
          newAlienY2 = alienY2[0]+10;
          newAlienY3 = alienY3[0]+10;
          alienYMoveDown();
        }
      }
    }
    if (alienLeft == true){
      for (let i = 0; i < alienX.length; i++){
        alienX[i] = alienX[i]-0.1;
        image(alien1, alienX[i], alienY[i], alien1.width           /26,alien1.height / 26);
        
        if (alienX[i]< 20){
          alienRight = true;
          alienLeft = false;
          newAlienY = alienY[0]+10;
          newAlienY2 = alienY2[0]+10;
          newAlienY3 = alienY3[0]+10;
          alienYMoveDown();
        }
      }
    }       
  }
  //WORK NEEDED HERE
}

function alien1Row2(){
  //draws alien1 in row2
  projectileRow = 30;
  alienScoreR2 = 10;
  alienProjectile();
  if (alienX2.length >= 1){
    allAliensDead = false;
    if (alienRight == true){
      for (let i = 0; i < alienX2.length; i++){
        alienX2[i] = alienX2[i]+0.1;
        image(alien1, alienX2[i], alienY2[i]+50, alien1.width /26,alien1.height / 26);
        if (alienX2[i]> 600) {
          alienRight = false;
          alienLeft = true;
          newAlienY3 = alienY3[0]+10;
          newAlienY2 = alienY2[0]+10;
          newAlienY = alienY[0]+10;
          alienYMoveDown();
        }
      }
    }
    if (alienLeft == true){
      for (let i = 0; i < alienX2.length; i++){
        alienX2[i] = alienX2[i]-0.1;
        image(alien1, alienX2[i], alienY2[i]+50, alien1.width/26,alien1.height / 26);
        
        if (alienX2[i]< 20){
          alienRight = true;
          alienLeft = false;
          newAlienY3 = alienY3[0]+10;
          newAlienY2 = alienY2[0]+10;
          newAlienY = alienY[0]+10;
          alienYMoveDown();
        }
      }
    }       
  }
}

function alien1Row3(){
  //draws alien1 in row3
  alienScoreR3 = 10;
  projectileRow = 33;
  alienProjectile();
  if (alienX3.length >= 1){
    allAliensDead = false;
    if (alienRight == true){
      for (let i = 0; i < alienX3.length; i++){
        alienX3[i] = alienX3[i]+0.1;
        image(alien1, alienX3[i], alienY3[i]+8, alien1.width /26,alien1.height / 26);
        if (alienX3[i]> 600) {
          alienRight = false;
          alienLeft = true;
          newAlienY = alienY[0]+10;
          newAlienY2 = alienY2[0]+10;
          newAlienY3 = alienY3[0]+10;
          alienYMoveDown();
        }
      }
    }
    if (alienLeft == true){
      for (let i = 0; i < alienX3.length; i++){
        alienX3[i] = alienX3[i]-0.1;
        image(alien1, alienX3[i], alienY3[i]+8, alien1.width/26,alien1.height / 26);
        
        if (alienX3[i]< 20){
          alienRight = true;
          alienLeft = false;
          newAlienY = alienY[0]+10;
          newAlienY2 = alienY2[0]+10;
          newAlienY3 = alienY3[0]+10;
          alienYMoveDown();
        }
      }
    }       
  }
}

function alien2Row1(){
  //draws alien2 in row1
  alienScoreR1 = 20;
  projectileRow = 0;
  alienProjectile();
  if (alienX.length >= 1){
    allAliensDead = false;
    if (alienRight == true){
      for (let i = 0; i < alienX.length; i++){
        alienX[i] = alienX[i]+0.1;
        image(alien2, alienX[i], alienY[i], alien2.width /25,alien2.height / 25);
        if (alienX[i]> 600) {
          alienRight = false;
          alienLeft = true;
          newAlienY = alienY[0]+10;
          newAlienY2 = alienY2[0]+10;
          newAlienY3 = alienY3[0]+10;
          alienYMoveDown();
          }
        }
      }
    if (alienLeft == true){
      for (let i = 0; i < alienX.length; i++){
        alienX[i] = alienX[i]-0.1;
        image(alien2, alienX[i], alienY[i], alien2.width/25,alien2.height / 25);
        
        if (alienX[i]< 20){
          alienRight = true;
          alienLeft = false;
          newAlienY = alienY[0]+10;
          newAlienY2 = alienY2[0]+10;
          newAlienY3 = alienY3[0]+10;
          alienYMoveDown();
          }
        }
      }       
    }
}

function alien2Row2(){
  //draws alien2 in row2
  alienScoreR2 = 20;
  projectileRow = 30;
  alienProjectile();
  if (alienX2.length >= 1){
    allAliensDead = false;
    if (alienRight == true){
      for (let i = 0; i < alienX2.length; i++){
        alienX2[i] = alienX2[i]+0.1;
        image(alien2, alienX2[i], alienY2[i]+50, alien2.width /25,alien2.height / 25);
        if (alienX2[i]> 600) {
          alienRight = false;
          alienLeft = true;
          newAlienY3 = alienY3[0]+10;
          newAlienY2 = alienY2[0]+10;
          newAlienY = alienY[0]+10;
          alienYMoveDown();
          }
        }
      }
    if (alienLeft == true){
      for (let i = 0; i < alienX2.length; i++){
        alienX2[i] = alienX2[i]-0.1;
        image(alien2, alienX2[i], alienY2[i]+50, alien2.width/25,alien2.height / 25);
        
        if (alienX2[i]< 20){
          alienRight = true;
          alienLeft = false;
          newAlienY3 = alienY3[0]+10;
          newAlienY2 = alienY2[0]+10;
          newAlienY = alienY[0]+10;
          alienYMoveDown();
          }
        }
      }       
    }
}

function alien2Row3(){
  //draws alien2 in row3
  alienScoreR3 = 20;
  projectileRow = 33;
  alienProjectile();
  if (alienX3.length >= 1){
    allAliensDead = false;
    if (alienRight == true){
      for (let i = 0; i < alienX3.length; i++){
        alienX3[i] = alienX3[i]+0.1;
        image(alien2, alienX3[i], alienY3[i]+8, alien2.width /25,alien2.height / 25);
        if (alienX3[i]> 600) {
          alienRight = false;
          alienLeft = true;
          newAlienY = alienY[0]+10;
          newAlienY2 = alienY2[0]+10;
          newAlienY3 = alienY3[0]+10;
          alienYMoveDown()
          }
        }
      }
    if (alienLeft == true){
      for (let i = 0; i < alienX3.length; i++){
        alienX3[i] = alienX3[i]-0.1;
        image(alien2, alienX3[i], alienY3[i]+8, alien2.width/25,alien2.height / 25);   
        if (alienX3[i]< 20){
          alienRight = true;
          alienLeft = false;
          newAlienY = alienY[0]+10;
          newAlienY2 = alienY2[0]+10;
          newAlienY3 = alienY3[0]+10;
          alienYMoveDown();
          }
        }
      }       
    }
}

function alien3Row1(){
  //draws the red alien
  alienScoreR1 = 50;
  projectileRow = 0;
  if (alienX11.length >= 1){
    allAliensDead = false;
    for (let i = 0; i < alienX11.length; i++){
      alienX11[i] = alienX11[i]+0.8;
      image(alien3, alienX11[i], alienY11[i], alien3.width /5,alien3.height / 5);
      if (alienX11[i]> 800) {
        alienX11.shift();
        alienX11.push(-100);
      }
    }
  }
}

function roundGenerator(){
  //generates the first round
  if (round <= 1){
    alienProjectileSpeed = 2;
    shotMultiplier = 600;
    alien1Row1();

   //generates the easy difficulty (rounds 2 and 3)
  } else if(round < 4){
    alienProjectileSpeed = 1;
    randomEasyAlien();
    shotMultiplier = 800;

    //generates the medium difficulty (rounds 4, 5, 6)
  } else if (round < 7){
    alienProjectileSpeed = 0.7;
    randomMediumAlien();
    shotMultiplier = 400;
    
    //generates the hard difficulty (rounds 7+)
  } else if (round >= 7){
    randomHardAlien();
    shotMultiplier = 100;
    alienProjectileSpeed = 1;
  }
}

function alienProjectile(){
  //Timer function, alien projectile shoots randomly with delay.
  if (millis() >= 500+timer+shotMultiplier) {
    let ranX = random(alienX);
    let ranY = random(alienY);
    
    let ranX2 = random(alienX2);
    let ranY2 = random(alienY2) + 35;
    
    let ranX3 = random(alienX3);
    let ranY3 = random(alienY3);
    
    var ranXPos2 = [ranX, ranX2];
    var ranXPos3 = [ranX, ranX2, ranX3];
    var ranYPos2 = [ranY, ranY2];
    var ranYPos3 = [ranY, ranY2, ranY3];
    
    index2 = floor(random()*ranXPos2.length);
    index3 = floor(random()*ranXPos3.length);
    //random index so that the y position corresponds to the same x position.
    let randomX2 = ranXPos2[index2];
    let randomX3 = ranXPos3[index3];
    let randomY2 = ranYPos2[index2];
    let randomY3 = ranYPos3[index3];
    timer = millis();
    //random shot generator
    if (round <= 1){
      laserX.push(ranX);
      laserY.push(ranY);
    } else if (round < 4){
        if (alienX2.length > 0){
          laserX.push(randomX2);
          laserY.push(randomY2);
        } else{
          laserX.push(ranX);
          laserY.push(ranY);
        }
    } else {
        if (alienX3.length > 0){
          laserX.push(randomX3);
          laserY.push(randomY3);
        } else if (alienX2.length > 0){
          laserX.push(randomX2);
          laserY.push(randomY2);
        } else {
          laserX.push(ranX);
          laserY.push(ranY);        
        }
      }
  }
  //create alien laser
  if (laserX.length >= 1){
    for (let i = 0; i < laserX.length; i++){
      laserY[i] = laserY[i]+alienProjectileSpeed;
      fill(212, 25, 32);
      rect(laserX[i]+18, laserY[i]+19, 4, 13);
    }
    if (laserY[0] > 475) {
      laserY.shift();
      laserX.shift();
    }
  }
  //checks if player is shot
  if (laserY[0] > y - 30 && laserY[0] < y + 30 && laserX[0] > x - 23 && laserX[0] < x + 23){
    playerLife = playerLife - 1;
    laserY.shift();
    laserX.shift();
  }
}

function mouseClicked(){
  //check if new game button has been pressed
  if (overPlay){
    newGame = true;
  }
  //checks if highscore hover is true
  if (overScore){
    highScoreBtn = true;
  }
  //checks if help button has been pressed
  if (overHelp){
    help = true;
  }
  //checks if return button has been pressed (in help menu)
  if (overReturn){
    help = false;
    overReturn = false;
  }
}

function menu(){
  background(0);
  //if mouse is over new game button
  if (mouseX>250 && mouseX < 410 && mouseY > 250 && mouseY < 280){
    overPlay = true;
    textSize(33);
    fill(11, 189, 54);
    text('New game', 255, 275);
    fill(12, 112, 36);
    textSize(32);
    text('Highscore', 255, 340)
    text('Help', 299, 405)
    overScore = false;
    overHelp = false;
  //if mouse is over score button
  } else if (mouseX>255 && mouseX < 415 && mouseY > 315 && mouseY < 345){
    overScore = true;
    textSize(33);
    fill(11, 189, 54);
    text('Highscore: '+ highScore, 255, 340) 
    fill(12, 112, 36);
    textSize(32);
    text('New game', 255, 275);
    text('Help', 299, 405)
    overPlay = false;
    overHelp = false;
  //checks if mouse is over help button
    } else if (mouseX>299 && mouseX < 367 && mouseY > 380 && mouseY < 413){
    overHelp = true;
    textSize(33);
    fill(11, 189, 54);
    text('Help', 299, 405)
    fill(12, 112, 36);
    textSize(32);
    text('New game', 255, 275);
    text('Highscore', 255, 340)
    overPlay = false;
    overScore = false;
  //checks if mouse is over everything else
    } else { 
    fill(12, 112, 36);
    textSize(32);
    text('New game', 255, 275);
    text('Highscore', 255, 340)
    text('Help', 299, 405)
    overPlay = false;
    overScore = false;
    overHelp = false;
  }
  //draw space invaders logo
  image(logo, width/9.5, 0, logo.width/2, logo.height/2);
}

function dataKeep(){
  //draw the player lives and the score (if the game is being played)
  textSize(35);
  fill(11, 189, 54);
  text(score, 535, 50) 
  if (playerLife == 3){
    image(myShip, 30, 20, myShip.width / 5.5, myShip.height /5.5)
    image(myShip, 80, 20, myShip.width / 5.5, myShip.height /5.5)
    image(myShip, 130, 20, myShip.width / 5.5, myShip.height /5.5)
  } else if (playerLife == 2){
    image(myShip, 30, 20, myShip.width / 5.5, myShip.height /5.5)
    image(myShip, 80, 20, myShip.width / 5.5, myShip.height /5.5)
  } else if (playerLife == 1) {
    image(myShip, 30, 20, myShip.width / 5.5, myShip.height /5.5)
  }  
}

function randomRows(){
  //decides what aliens to draw depending on a randomized array
  if (allAliensDead){
    if (round < 4){
      alienRow1 = random(alienType);
      alienRow2 = random(alienType);
    } else if (round < 7){
      alienRow1 = random(alienType);
      alienRow2 = random(alienType);
      alienRow3 = random(alienType);
    } else {
      alienRow1 = random(alienType);
      alienRow2 = random(alienType);
      alienRow3 = random(alienType);
    }
  }
}

function randomEasyAlien(){
  //creates the easy difficulty of aliens
  if (alienRow1 == 1){
    alien1Row1();
  } else if (alienRow1 == 2){
    alien2Row1();
  } 
  if (alienRow2 == 1){
    alien1Row2();
  } else if (alienRow2 == 2){
    alien2Row2();
  }
}

function randomMediumAlien(){
  //creates the medium difficulty of aliens
  if (alienRow1 == 1){
    alien1Row1();
  } else if (alienRow1 == 2){
    alien2Row1();
  }
  if (alienRow2 == 1){
    alien1Row2();
  } else if (alienRow2 == 2){
    alien2Row2();
  } 
  if (alienRow3 == 1){
    alien1Row3();
  } else if (alienRow3 == 2){
    alien2Row3();
  }
  //if score is a multiple of 1000, draw the red alien
  if (score % 1000 == 0 || score == 1010 || score == 2010 || score == 3010 || score == 4010 || score == 5010){
    redAlien = true;
  }
  if (redAlien == true){
    alien3Row1();
  }
}

function randomHardAlien(){
  //creates the hard difficulty of aliens
  if (alienRow1 == 1){
    alien1Row1();
  } else if (alienRow1 == 2){
    alien2Row1();
  }
  if (alienRow2 == 1){
    alien1Row2();
  } else if (alienRow2 == 2){
    alien2Row2();
  } 
  if (alienRow3 == 1){
    alien1Row3();
  } else if (alienRow3 == 2){
    alien2Row3();
  }
  //if the score is a multiple of 1000, draw the red alien
  if (score % 1000 == 0 || score == 1010 || score == 2010 || score == 3010 || score == 4010 || score == 5010){
    redAlien = true;
  }
  if (redAlien == true){
    alien3Row1();
  }
}

function alienYMoveDown() {
  //Draws new aliens when they reach the edge of the screen
  //get rid of old alienY position
  alienY.splice(0, alienY.length);
  
  alienY2.splice(0, alienY2.length);
  
  alienY3.splice(0, alienY3.length);

  //draw new aliens with new Y position
  alienY.push(newAlienY);
  alienY.push(newAlienY);
  alienY.push(newAlienY);
  alienY.push(newAlienY);
  alienY.push(newAlienY);
  alienY.push(newAlienY);
  alienY.push(newAlienY);
  alienY.push(newAlienY);
  alienY.push(newAlienY);

  alienY2.push(newAlienY2);
  alienY2.push(newAlienY2);
  alienY2.push(newAlienY2);
  alienY2.push(newAlienY2);
  alienY2.push(newAlienY2);
  alienY2.push(newAlienY2);
  alienY2.push(newAlienY2);
  alienY2.push(newAlienY2);
  alienY2.push(newAlienY2);
  
  alienY3.push(newAlienY3);
  alienY3.push(newAlienY3);
  alienY3.push(newAlienY3);
  alienY3.push(newAlienY3);
  alienY3.push(newAlienY3);
  alienY3.push(newAlienY3);
  alienY3.push(newAlienY3);
  alienY3.push(newAlienY3);
  alienY3.push(newAlienY3);
}
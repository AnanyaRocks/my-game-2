var player,playerImage,groundImage,obstacleGroup,score;
var PLAY = 1;
var END=0;
var gameState=PLAY;
function preload (){
 playerImage=loadImage("fur.png") 
 groundImage=loadImage("planet3.png")
 backgroundImage=loadImage("nebula.jpg")
 obstacleImage=loadImage("pink.png")
 
}
function setup() {
  score=0
  createCanvas(800,400);
  player=createSprite(100,80, 40, 40);
  player.addImage(playerImage);
  player.scale=0.18;
ground = createSprite(400,380,800,20);
ground.addImage(groundImage);
ground.x = ground.width/2;
ground.velocityX=-4
ground.scale=1.5;

 invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;
obstaclesGroup=new Group();
}

function draw() {
  background(backgroundImage); 
  background.velocityX=-8
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
  
    player.velocityY = player.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    player.collide(ground);
    spawnObstacles();
  
    if(obstacleGroup.isTouching(player)){
        gameState = END;
   }
  }
  else if (gameState === END) {
  
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    player.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    //cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
   // trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    //cloudsGroup.setLifetimeEach(-1);
    
   // if(mousePressedOver(restart)) {
    //  reset();
   // }
  }
  
  
  drawSprites();
}

//function spawnClouds() {
  //write code here to spawn the clouds
 // drawSprites();
//}
function spawnObstacles(){
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(800,215,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -6;
   // obstacle.y = Math.round(random(80,));
    obstacle.addImage(obstacleImage);
 
    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}
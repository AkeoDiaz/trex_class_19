var trex, trex_running, trex_collided, cloud_costume;
var ground, invisibleGround, groundImage;
var cactus_costume1, cactus_costume2, cactus_costume3, cactus_costume4, cactus_costume5, cactus_costume6;
var GroupClouds, GroupCacti;
var GameOver, restart,GameOver_img,restart_img;
var score = 0;

//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloud_costume = loadImage("cloud.png");
  cactus_costume1 = loadImage("obstacle1.png");
  cactus_costume2 = loadImage("obstacle2.png");
  cactus_costume3 = loadImage("obstacle3.png");
  cactus_costume4 = loadImage("obstacle4.png");
  cactus_costume5 = loadImage("obstacle5.png");
  cactus_costume6 = loadImage("obstacle6.png");
  
  GameOver_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");
  

  groundImage = loadImage("ground2.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  GroupClouds = new Group();
  GroupCacti = new Group();

  GameOver = createSprite(300,100);
  GameOver.addImage(GameOver_img);
  GameOver.scale = 0.5
  restart = createSprite(300,125);
  restart.addImage(restart_img);
  restart.scale = 0.5
}

function draw() {
  background(255);
  
  text("Score: "+ score, 500, 50);
  
  if(gameState===PLAY){
    
    score = score+Math.round(getFrameRate()/60);
    
    restart.visible = false
    GameOver.visible = false
    
    ground.velocityX = -(6+3*score/100);
    
    if(keyDown("space") && trex.y > 161) {
    trex.velocityY = -10;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
    ground.x = ground.width/2;
    }
  
    spawnClouds();
    spawnCacti();
    
    if(GroupCacti.isTouching(trex)){
      gameState = END;
    }
    
  }else if(gameState===END){
   //reset to zero
    ground.velocityX = 0;
    trex.velocityY = 0;
    GroupCacti.setVelocityXEach(0);
    GroupClouds.setVelocityXEach(0);

    trex.changeAnimation("collided",trex_collided);
    
    GameOver.visible = true
    restart.visible = true
    
    GroupCacti.setLifetimeEach();
    GroupClouds.setLifetimeEach();
    
    if(mousePressedOver(restart)) {
    reset();
    }
  }
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds() {
  if(frameCount%60===0){
    var cloud = createSprite(600,125,10,10);
    GroupClouds.add(cloud);
    cloud.addImage(cloud_costume);
    cloud.velocityX = -(3+3*score/100);
    cloud.scale = 0.5;
    cloud.y = Math.round(random(100,125));
    cloud.lifetime = 200;
  }
}

function spawnCacti() {
  if(frameCount%60===0){
    var rand = Math.round(random(1,6));
    var cactus = createSprite(600,170,10,10);
    GroupCacti.add(cactus);
    switch(rand){
      case 1:cactus.addImage(cactus_costume1);
      break;
      case 2:cactus.addImage(cactus_costume2);
      break;
      case 3:cactus.addImage(cactus_costume3);
      break;
      case 4:cactus.addImage(cactus_costume4);
      break;
      case 5:cactus.addImage(cactus_costume5);
      break;
      case 6:cactus.addImage(cactus_costume6);
      break;      
      default: break;
      
    }
    cactus.velocityX = -(6+3*score/100);
    cactus.scale = 0.5;
    cactus.lifetime = 100;
  }
}
function reset(){
  gameState = PLAY;
  
  GameOver.visible = false;
  restart.visible = false;

  GroupCacti.setLifetimeEach(0);
  GroupClouds.setLifetimeEach(0);
  
  trex.changeAnimation("running",trex_running);
  
  score=0;
}
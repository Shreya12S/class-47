var bg,bgImg;
var shooter,shooterImg
var shootingImg;
var zombie,zombieImg;
var zombieGroup;
var bullet;
var bulletGroup;
var bullets=70;
var heart1,heart2,heart3;
var heart1Img,heart2Img,heart3Img;

function preload(){
  bgImg= loadImage("assets/bg.jpeg")
  shooterImg= loadImage("assets/shooter_2.png")
  shootingImg= loadImage("assets/shooter_3.png")
  zombieImg= loadImage("assets/zombie.png")
  heart1Img= loadImage("assets/heart_1.png")
  heart2Img= loadImage("assets/heart_2.png")
  heart3Img= loadImage("assets/heart_3.png")
}
function setup(){
  createCanvas(windowWidth,windowHeight)
  //adding the background and its image
  bg=createSprite(displayWidth/2,displayHeight/2)
  bg.addImage(bgImg)
  shooter=createSprite(70,470,50,50)
  shooter.scale=0.3
  shooter.addImage(shooterImg)
  //creating zombieGroup
  zombieGroup=new Group()
  shooter.debug=true;
  shooter.setCollider("rectangle",0,0,300,300)
  //creating bulletGroup
  bulletGroup= new Group()
  heart1=createSprite(displayWidth-150,40,20,20)
  heart1.visible=false;
  heart1.addImage("heart1",heart1Img)
  heart1.scale=0.4
  heart2=createSprite(displayWidth-100,40,20,20)
  heart2.visible=false;
  heart2.addImage("heart2",heart2Img)
  heart2.scale=0.4
  heart3=createSprite(displayWidth-170,40,20,20)
  heart3.addImage("heart3",heart3Img)
  heart3.scale=0.4

}
function draw(){
  background("black")
  //to release bullets and change image of shooter to shooting position when space is pressed
  if(keyWentDown("space")){
    shooter.addImage(shootingImg)
    bullet=createSprite(displayWidth-1150,shooter.y-30,20,10)
    bulletGroup.add(bullet)
    bullet.velocityX=20;
    shooter.depth=bullet.depth
    shooter.depth= shooter.depth+1   
    bullets=bullets-1
  }
  if(keyWentUp("space")){
    shooter.addImage(shooterImg)
  }
  if(keyDown("left")&& shooter.x>25){
    shooter.x -= 5

  }
  if(keyDown("right")){
    shooter.x += 5
  }
  if(keyDown("up")&& shooter.y>70){
    shooter.y -= 5
  }
  if(keyDown("down")&& shooter.y<500){
    shooter.y += 5
  }

  enemy();
  //destroy zombie when player touches it
  if(zombieGroup.isTouching(shooter)){
    for(var i=0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(shooter)){
        zombieGroup[i].destroy()
      }
    }
  }
  
  //destroy zombie when bullet touches it
  if(zombieGroup.isTouching(bulletGroup)){
      for(var i=0;i<zombieGroup.length;i++){
        if(zombieGroup[i].isTouching(bulletGroup)){
          zombieGroup[i].destroy()
          bulletGroup.destroyEach();
        }
      }
    }
  


  
  drawSprites()
}

function enemy(){
  if(frameCount%50==0){
    zombie= createSprite(random(500,1100),random(100,500),50,50)
    zombie.addImage(zombieImg)
    zombie.scale=0.15
    zombie.velocityX= -3;
    zombie.lifetime=width/3;
    zombieGroup.add(zombie)
    zombie.debug=true;
    zombie.setCollider("rectangle",0,0,400,400)
  }
  
}
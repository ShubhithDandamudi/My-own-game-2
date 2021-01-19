
var Ground,InvisibleGround,GroundImg
var Hero,HeroImg,HeroTurnedImg;
var HeroHit,HealthImg;
var CityImg,ForestImg,CountrysideImg;
var MalariaImg,CovidImg,CholeraImg;
var FlyImg,MosquitoImg,MosquitoInjImg,Mosquito2Img;




var attackerGroup;
var gameState = 1;

function preload()
{
  //heros different poses
  HeroImg = loadImage("Images/Hero/Hero.png");
  HeroTurnedImg = loadImage("Images/Hero/Hero turned.png");
  HeroHit = loadAnimation("Images/Hero/Hero1.png","Images/Hero/Hero2.png","Images/Hero/Hero3.png","Images/Hero/Hero4.png","Images/Hero/Hero5.png","Images/Hero/Hero6.png","Images/Hero/Hero7.png","Images/Hero/Hero8.png");
  
  //background Images for the stages
  GroundImg = loadImage("Images/Background/Mountains.png");
  CityImg = loadImage("Images/Background/City.png");
  ForestImg = loadImage("Images/Background/Forest.png");

  //Final Villain
  MalariaImg = loadImage("Images/Villains/Malaria man.png");

  //Attacker Images
  FlyImg = loadImage("Images/Minions/Fly.png");
  MosquitoImg = loadImage("Images/Minions/Mosquito1.png");
  Mosquito2Img = loadImage("Images/Minions/Mosquito2.png");

 
  //Injured Attackers
  MosquitoInjImg = loadImage("Images/Minions/MosquitoInjured.png");

  //Hero's health
  HealthImg = loadImage("Images/Hero/Life.png");


  
  
}

function setup() {
	createCanvas(displayWidth - 50,displayHeight - 50);
	
 // Ground = createSprite(width/2,height/2);
 // Ground.addImage(GroundImg);


  InvisibleGround = createSprite(width/2,height - 100,width,10);
  InvisibleGround.visible = false;
	
 // Ground.velocityX = -3;

	Hero = createSprite(50,height/2);
  Hero.addImage("main",HeroImg);
  Hero.addImage("mainturned",HeroTurnedImg);
  Hero.addAnimation("jump",HeroHit);
  Hero.scale = 0.5;
  ////Hero.setCollider("circle",0,0,60);
  //Hero.debug = true;

  attackerGroup = new Group();
  
}


function draw() {
  rectMode(CENTER);
  
  if(gameState ===1){
    background(GroundImg);
    Attackers();
    for(var i = 0; i<attackerGroup.length;i++){
      if(attackerGroup.get(i).isTouching(Hero)){
        attackerGroup.get(i).velocityX = 0;
        attackerGroup.get(i).velocityY = 7;
        attackerGroup.get(i).changeImage(MosquitoInjImg);
      }
    }

    

  }
  else if(gameState ===2){}
  else if(gameState ===3){}


  Hero.velocityY = Hero.velocityY + 0.5
  Hero.collide(InvisibleGround);

  /*if(Ground.x<0){
    Ground.x = Ground.width/2;
  }

*/

if(Hero.x <0){
  Hero.x = width-10;
}

if(Hero.x > width){
  Hero.x = 10;
}


  if(keyDown(UP_ARROW) && Hero.y > height - 175){

    Hero.velocityY = -15
  }

  if(keyDown("Space")){
   Hero.changeAnimation("jump",HeroHit);

 }
else{
 
  if(keyDown(LEFT_ARROW)){
    Hero.x = Hero.x - 3;
    Hero.changeImage("mainturned",HeroTurnedImg);
  }

  if(keyDown(RIGHT_ARROW)){
    Hero.x = Hero.x + 3;
    Hero.changeImage("main",HeroImg);
  }
 
  }
  
 

  drawSprites();
 
}




function Attackers(){
    if(frameCount % 200 ===0){
      attacker = createSprite(width,random(height/2,height-150));
      attacker.velocityX = (-1)*random(4,10);
      
      attacker.lifetime = width/attacker.velocityX;
      var rand = Math.round(random(1,3));
      switch(rand){
        case 1: attacker.addImage(FlyImg);break;
        case 2: attacker.addImage(MosquitoImg);break;
        case 3 : attacker.addImage(Mosquito2Img);break;
        default : break;

      }

      attackerGroup.add(attacker);
    }
}

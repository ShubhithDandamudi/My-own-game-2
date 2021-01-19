
var Ground,InvisibleGround,GroundImg
var Hero,HeroImg,HeroTurnedImg;
var HeroHit,HealthImg;
var CityImg,ForestImg,CountrysideImg;
var MalariaImg,CovidImg,CholeraImg,MalariaImg1;
var FlyImg,MosquitoImg,MosquitoInjImg,Mosquito2Img;
var FlyMinionImg,RunMinionImg

var life1,life2,life3;

var life = 3;
var score = 0;
var attackerGroup,minionsGroup;
var gameState = 0;
var level = 1;

var form;

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
  MalariaImg1 = loadImage("Images/Villains/Malaria man1.png");

  //Attacker Images
  FlyImg = loadImage("Images/Minions/Fly.png");
  MosquitoImg = loadImage("Images/Minions/Mosquito1.png");
  Mosquito2Img = loadImage("Images/Minions/Mosquito2.png");
  FlyMinionImg = loadImage("Images/Minions/Fly minion.png");
  RunMinionImg = loadImage("Images/Minions/Run minion.png");

 
  //Injured Attackers
  MosquitoInjImg = loadImage("Images/Minions/MosquitoInjured.png");

  //Hero's health
  HealthImg = loadImage("Images/Hero/Life.png");

  
}

function setup() {
	createCanvas(displayWidth - 50,displayHeight - 50);
	
 // Ground = createSprite(width/2,height/2);
 // Ground.addImage(GroundImg);


  InvisibleGround = createSprite(width/2,height - 70,width,10);
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
  minionsGroup = new Group();


  Malariaman = createSprite(width-100,height-100);
  Malariaman.addImage(MalariaImg);
  Malariaman.scale = 0.5;
  Malariaman.visible = false;
  

  life1 = createSprite(20,50)
  life2 = createSprite(50,50)
  life3 = createSprite(80,50)
  life1.addImage(HealthImg);
  life2.addImage(HealthImg);
  life3.addImage(HealthImg);
  life1.scale = 0.5;
  life2.scale = 0.5;
  life3.scale = 0.5;
   form = new Form();
}


function draw() {
  rectMode(CENTER);

  if(gameState === 0){form.display()}

  else {
  form.hide();
//movements of the Hero
//1. out of the screen
if(Hero.x <0)Hero.x = width-10;
if(Hero.x > width)Hero.x = 10;

//2.jumping action
if(touches.length > 0 ||(keyDown(UP_ARROW)) && Hero.y > height - 175){
    Hero.velocityY = -15;
    touches =[];
}

//3.attacking action
if(keyDown("Space")||touches.length > 0){
   Hero.changeAnimation("jump",HeroHit);
   touches = [];
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

//4. gravity and support ground
Hero.velocityY = Hero.velocityY + 0.5
Hero.collide(InvisibleGround);

if(level === 1){
  background(GroundImg);
  textSize(20);
  fill("red");
  stroke("black");
  text("Score : "+ score,10,80);
  text("Life : "+ life,10,150);

  if(gameState ===1){
    
    Attackers();

    if(score > 10)gameState = 2;
   
    //level 1 action
    for(var i = 0; i<attackerGroup.length;i++){
      if(attackerGroup.get(i).isTouching(Hero)){
        attackerGroup.get(i).velocityX = 0;
        attackerGroup.get(i).velocityY = 10;
        attackerGroup.get(i).changeImage(MosquitoInjImg);
        if(frameCount%5 === 0)score = score +3;
      }

      if(attackerGroup.get(i).x<=10){
       life = life -1;
       attackerGroup.get(i).destroy();
      }
    }


    //make the life hearts invisible as the life reduces
    if(life === 2){
      life3.visible = false;
    }
    if(life === 1){
      life3.visible = false;
      life2.visible = false;
    }
    else if(life === 0)gameState = 3;    

  }
  else if(gameState === 2){
    Malariaman.visible = true;
    var Vx = (Hero.x - Malariaman.x)/50;
    var Vy = (Hero.y - Malariaman.y)/50;
     Malariaman.velocityX = Vx;
     Malariaman.velocityY = Vy;

    Minions();

    for(var i = 0; i<minionsGroup.length;i++){
      if(minionsGroup.get(i).isTouching(Hero)){
        minionsGroup.get(i).destroy();
	      life = life - 1;
      }
    }

    if(life === 2){
      life3.visible = false;
    }
    if(life === 1){
      life3.visible = false;
      life2.visible = false;
    }
    else if(life === 0)gameState = 3;
  
  }
  else if(gameState === 3){

    background(255);
    textSize(40);
    fill("black");
    stroke("black");
    text("Game Over You let our hopes! down",width/2-75,height/2);

  }

}

else if(level === 2){
  
  

}
else if(level === 3){}

drawSprites();
}
}




function Attackers(){
    if(frameCount % 200 ===0){
      attacker = createSprite(width,random(height/2,height-150));
      attacker.velocityX = (-1)*random(8,15);
      
      attacker.lifetime = width/attacker.velocityX;
      var rand = Math.round(random(1,3));
      switch(rand){
        case 1: attacker.addImage(FlyImg);attacker.scale = 0.7;break;
        case 2: attacker.addImage(MosquitoImg);break;
        case 3 : attacker.addImage(Mosquito2Img);attacker.scale = 0.7;break;
        default : break;
      }

     //  attacker.scale = 1;

      attackerGroup.add(attacker);
    }
}


function Minions(){
  if(frameCount % 200 ===0){
    minions = createSprite(width,random(height/2,height-75));
    minions.velocityX = (-1)*random(8,15);
    
    minions.lifetime = width/minions.velocityX;
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1: minions.addImage(FlyMinionImg);minions.scale = 0.5;break;
      case 2: minions.addImage(RunMinionImg);minions.scale = 0.5;break;
      default : break;
    }

   //  minions.scale = 1;

    minionsGroup.add(minions);
  }
}

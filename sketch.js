//Create variables here
var dog,happyDog,database,foodS,foodStock;

function preload()
{
  //load images here
  dogimg=loadImage("images/dogImg.png")
  dogimg1=loadImage("images/dogImg1.png")
  dogimg2=loadImage("happydog.png")
}

function setup() {
  createCanvas(500,500);
  database=firebase.database();
  dog=createSprite(250,250,10,10)
  dog.addImage(dogimg)
  dog.scale=0.5;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogimg2)
  }

  drawSprites();
  //add styles here
  fill("white")
  text("Food Remaining:"+ foodS,250,50)

}

function readStock(data){
  foodS=data.val();
  console.log(foodS)
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}


//Create variables here
var dog,happyDog,database,foodS,foodStock;
var feed, addFoood;
var fedTime, lastFed;
var foodObj;
function preload()
{
  //load images here
  doggo = loadImage("Dog.png");
  dogHappy = loadImage("happydog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();

  foodObj = new Food()

  dog=createSprite(850,250)
  dog.addImage(doggo)
  dog.scale = 0.2

  feed = createButton("Feed doggo");
  feed.position(700,95)
  feed.mousePressed(feedDog);
  feed.mouseReleased(doggoSit)

  addFoood = createButton("Add Food")
  addFoood.position(800,95)
  addFoood.mousePressed(addFood)


  foodStock = 20;
  foodS = 20;

  foodStock = database.ref('Food')
  foodStock.on("value", function(readStock){
    readstock = database.foodStock
  })

}


function draw() {  
  background(46,139,87)

  fedTime = database.ref("FeedTime")
  fedTime.on('value',function(data){
    lastFed = data.val();
  })

  fill("white")
  textSize(20)
  if(lastFed>=12){
    text("Doggo was last fed at:"+lastFed % 12 + "PM", 350, 30)
  }
  else if(lastFed ==0){
    text("Doggo was last fed at: 12 AM", 350 ,30)
  }
  else{
    text("Doggo was last fed at:"+lastFed + "AM",350,30)
  }

  foodObj.display();
  drawSprites();
  
  //add styles here
textSize(20);
  fill("white");
  text("Food Left:"+foodS,390,30)
}

function readStock(database){
  foodS = database.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(dogHappy)
  foodS--
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

  function addFood(){
    foodS++
    foodObj.foodStock = foodS
    database.ref('/').update({
      Food:foodS
    })
  }

function doggoSit(){
  dog.addImage(doggo)
}

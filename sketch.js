//Create variables here
var dog,happyDog,foodS,foodStock;
var database,dogImg,happyDogImg;
var a,foodObj,fedTime,lastFed
 var x ,y



function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png")
  happyDogImg = loadImage("images/dogImg1.png")

}

function setup() {
	createCanvas(1000, 400 );

  database = firebase.database()

  feed = createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood = createButton("Add food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

  foodObj = new Food()

  dog = createSprite(800,200,150,150)
  dog.addImage(dogImg)
  dog.scale = 0.25



  foodStock=database.ref('food')
  foodStock.on("value",readStock)

 
  
}


function draw() {  
  textSize(20)
  fill(rgb(12,12,12))
  

  //add styles here
  background(46,139,87)

  fedTime = database.ref("feedTime")
  fedTime.on("value",function(data){
    lastFed = data.val()
  })

foodObj.display()


fill("white")
textSize(15)
if(lastFed>= 12){

  text("Last feed : "+lastFed%12+" PM",350,30)
}
else if(lastFed == 0 ){
  text("Last feed : 12 AM",350,30)
}
else{
  text("Last feed : "+lastFed+" AM",350,30)
}


  drawSprites();











}


function readStock(data){
foodS = data.val()
foodObj.updateFoodStock(foodS)


}


function writeStock(x){
  if(x<= 0){
    x = 0}
  else{
    x -= 1
  }
  database.ref('/').update({
    food : x
  })




}

function feedDog(){

  dog.addImage(happyDogImg)
 
  food = foodObj.getFoodStock()

  if (food <= 0 ){

foodObj.updateFoodStock(0)

  }

  else{

    foodObj.updateFoodStock(food-1)
  }

  database.ref("/").update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  })


}

function addFoods(){

foodS++

database.ref("/").update({
  food:foodS
})

}
var bgImg;
var balloon;
var balloonImg;
var db;
var position;
var balloonPosition;

function preload(){
  bgImg = loadImage("bg.png")
  balloonImg = loadAnimation("balloon1.png","balloon2.png","balloon3.png");
}


function setup() {
  db=firebase.database();
  console.log(db);
  createCanvas(1200,600);

  balloon = createSprite(200,200,50,50);
  balloon.addAnimation("balloonFly",balloonImg);
  balloon.scale = 0.5;

  
  balloonPosition = db.ref('Balloon/Position');
  balloonPosition.on("value",readPosition);


  
}

function draw() {
  background(bgImg);  
  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
}
else if(keyDown(RIGHT_ARROW)){
  writePosition(1,0);
}
else if(keyDown(UP_ARROW)){
  writePosition(0,-1);
  balloon.scale = balloon.scale-0.002;

    }
else if(keyDown(DOWN_ARROW)){
  writePosition(0,1);
  balloon.scale = balloon.scale+0.002;

}
fill("black");
textSize(20);
text("Use the arrow keys to move the Balloon.",10,23);

  drawSprites();
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}
function writePosition(x,y){
  db.ref('Balloon/Position').set({
      'x':position.x + x,
      'y': position.y + y
  })
}

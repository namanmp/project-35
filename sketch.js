var database,backgroundImage;
var balloon,balloon2,balloon1
var position;


function preload(){
 backgroundImage=loadImage("sprites/background.png")
 balloon1=loadAnimation("sprites/Hot Air Ballon-02.png")
 balloon2=loadAnimation("sprites/Hot Air Ballon-02.png","sprites/Hot Air Ballon-02.png","sprites/Hot Air Ballon-02.png","sprites/Hot Air Ballon-02.png",
 "sprites/Hot Air Ballon-03.png","sprites/Hot Air Ballon-03.png","sprites/Hot Air Ballon-04.png","sprites/Hot Air Ballon-04.png","sprites/Hot Air Ballon-04.png","sprites/Hot Air Ballon-04.png")
}



function setup() {
    createCanvas(1300,600);
    database = firebase.database();
    balloon = createSprite(400, 450, 50, 50);
    balloon.addAnimation("HotAirBalloon",balloon1);
    balloon.scale=0.5;
  
    var getinfo = database.ref("balloon/position")
    getinfo.on("value",readop,showError)
  }
  
  function draw() {
    background(backgroundImage);
    textSize(20);
    fill("black");
    text("Use Arrow keys to move the Hot Air Balloon",50,50);
  
    if(keyDown(LEFT_ARROW)){
      updateHeight(-10,0)
      balloon.addAnimation("HotAirBalloon",balloon2);
    }
    else if(keyDown(RIGHT_ARROW)){
      updateHeight(+10,0)
    }
    else if(keyDown(UP_ARROW)){
      updateHeight(0,-10)
      balloon.addAnimation("HotAirBalloon",balloon2);
      balloon.scale=balloon.scale-0.005;
    }
    else if(keyDown(DOWN_ARROW)){
      updateHeight(0,+10)
      balloon.addAnimation("HotAirBalloon",balloon2);
      balloon.scale=balloon.scale+0.005;
    }
    drawSprites();
  }
  
  function updateHeight(x,y){
    database.ref("balloon/position").update({
        x:position.x+x,
        y:position.y+y
    })
  }
  
  function readop(data){
    position = data.val();
    balloon.x = position.x
    balloon.y = position.y
  }
  
  function showError(){
    console.log("error");
  }
  
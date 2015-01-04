
var totalTime = 20;
var frameRate = 29.97;
var totalFrame = totalTime * frameRate;
var height = 360;
var width = 640;

//setup
var mainComp = app.project.items.addComp("chap1", width, height, 1.0, totalTime ,frameRate);
mainComp.layers.addSolid([1.0,1.0,1.0], "background",width,height,1.0,totalTime);
var target = CircleShape(mainComp, 50);

var location = new PVector({
    x: 100,
    y: 100
});

var velocity = new PVector({
    x: 2,
    y: 5.3
});

//draw
for(i = 0; i <= totalFrame; i++){
    location.add(velocity);
    
    if ((location.x > width) || (location.x < 0)){
        velocity.x = velocity.x * -1;
    } 
  
    if ((location.y > height) || (location.y < 0)){
        velocity.y = velocity.y * -1;
    }
    
    target.position.setValueAtTime(i / frameRate, [location.x, location.y]);
};

function PVector(param) {

    this.x = param.x;
    this.y = param.y;

    this.add = function(vector) {
        this.x += vector.x;
        this.y += vector.y;
    };
};

function CircleShape(comp, size){
    var EllipseSize = [size, size];
    var FillColor = [0, 0, 0]; 
    var shapeLayer = comp.layers.addShape();
    var shapeLayerContents = shapeLayer.property("ADBE Root Vectors Group");
    var shapeGroup = shapeLayerContents.addProperty("ADBE Vector Group");
    var ellipse = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
    ellipse.property("ADBE Vector Ellipse Size").setValue(EllipseSize);
    var shapeFill = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
    shapeFill.property("ADBE Vector Fill Color").setValue(FillColor);
    return shapeLayer
};


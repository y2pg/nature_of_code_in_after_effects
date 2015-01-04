var totalTime = 20;
var frameRate = 29.97;
var totalFrame = totalTime * frameRate;
var height = 360;
var width = 640;

var x = 100;
var y = 100;
var xspeed = 2;
var yspeed = 5.3;

//setup
var mainComp = app.project.items.addComp("chap1", width, height, 1.0, totalTime ,frameRate);
mainComp.layers.addSolid([1.0,1.0,1.0], "background",width,height,1.0,totalTime);
var target = CircleShape(mainComp, 50);

//draw
for(i = 0; i <= totalFrame; i++){
    x = x + xspeed;
    y= y + yspeed;
  
    if ((x > width) || (x < 0)){
        xspeed = xspeed * -1;
    } 
  
    if ((y > height) || (y < 0)){
        yspeed = yspeed * -1;
    }
    
    target.position.setValueAtTime(i / frameRate, [x,y]);
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











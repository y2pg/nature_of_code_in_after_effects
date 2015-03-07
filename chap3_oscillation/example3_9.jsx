#include "processing.jsx"

var totalTime = 60;
var frameRate = 16;
var totalFrame = totalTime * frameRate;
var height = 360;
var width = 640;

//setup
var mainComp = app.project.items.addComp("chap3", width, height, 1.0, totalTime ,frameRate);
mainComp.layers.addSolid([1.0,1.0,1.0], "background",width,height,1.0,totalTime);

var startAngle = 0;
var angleVel = 0.23;
var shapeList = []
var shapeIndex = 0

for(x = 0; x <= width; x += 24){
    shapeList[shapeIndex] = CircleShape (mainComp, 40);
    shapeList[shapeIndex].opacity.setValue(50);
    shapeIndex += 1;
};

//draw
for(i = 0; i <= totalFrame; i++){
    startAngle += 0.015;
    var angle = startAngle;
    
    shapeIndex = 0;
    for(x = 0; x <= width; x += 24){
        var y = (Math.sin(angle) * height /2) + (height / 2);
        shapeList[shapeIndex].position.setValueAtTime(i / frameRate,[x, y]);
        angle += angleVel;
        shapeIndex += 1;
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
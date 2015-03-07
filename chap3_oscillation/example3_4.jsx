#include "processing.jsx"

var totalTime = 60;
var frameRate = 16;
var totalFrame = totalTime * frameRate;
var height = 360;
var width = 640;

//setup
var mainComp = app.project.items.addComp("chap3", width, height, 1.0, totalTime ,frameRate);
mainComp.layers.addSolid([1.0,1.0,1.0], "background",width,height,1.0,totalTime);

var r = height * 0.45;
var theta = 0;
var target = CircleShape (mainComp, 50);

//draw
for(i = 0; i <= totalFrame; i++){
    var x = r * Math.cos(theta) + width / 2;
    var y = r * Math.sin(theta) + height /2;
    target.position.setValueAtTime(i / frameRate,[x, y]);
    theta += 0.02;
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
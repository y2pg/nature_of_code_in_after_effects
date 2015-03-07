#include "processing.jsx"
#include "pendulum.jsx"

var totalTime = 60;
var frameRate = 16;
var totalFrame = totalTime * frameRate;
var height = 360;
var width = 640;

//setup
var mainComp = app.project.items.addComp("chap3", width, height, 1.0, totalTime ,frameRate);
mainComp.layers.addSolid([1.0,1.0,1.0], "background",width,height,1.0,totalTime);

var genten = new PVector({
        x: width /2 ,
        y: 0
    });

var p = pendulum(
    {
        target: CircleShape (mainComp, 50),
        line: mainComp.layers.addSolid([0,0,0], "line",width,height,1.0,totalTime),
        origin: new PVector({x: width /2 , y:0 }),
        r: 250
     }
);

//draw
for(i = 0; i <= totalFrame; i++){
    p.update();
    p.target.position.setValueAtTime(i / frameRate,p.position());
    p.laser["開始点"].setValueAtTime(i / frameRate, p.originPosition());
    p.laser["終了点"].setValueAtTime(i / frameRate, p.position());
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
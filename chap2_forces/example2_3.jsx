#include "processing.jsx"

var totalTime = 20;
var frameRate = 29.97;
var totalFrame = totalTime * frameRate;
var height = 360;
var width = 640;

//setup
var mainComp = app.project.items.addComp("chap2", width, height, 1.0, totalTime ,frameRate);
mainComp.layers.addSolid([1.0,1.0,1.0], "background",width,height,1.0,totalTime);

var movers = new Array(5);

for (i = 0; i < movers.length; i++) {
    movers[i] = new Mover(Math.random() * 3, 0,0);
};

//draw
for(i = 0; i <= totalFrame; i++){
    
   
    for (j = 0; j < movers.length; j++) {
        var wind = new PVector({
            x: 0.003,
            y: 0
        });
        var gravity = new PVector({
            x: 0,
            y: 0.1 * movers[j].mass
        });        
        
        movers[j].applyForce(wind);
        movers[j].applyForce(gravity);
        movers[j].update();
        movers[j].checkEdges ();
        movers[j].display(i);
    };
};

function Mover(m, _x, _y) {
    this.target = CircleShape (mainComp, m * 16);
    
    this.location = new PVector({
        x: _x,
        y: _y
    });

    this.velocity = new PVector({
        x: 0,
        y: 0
    });

    this.acceleration = new PVector({
        x: 0,
        y: 0
    });
    
    this.mass = m;
    
    this.applyForce = function(force) {
        f = PVector.div(force, this.mass);
        this.acceleration.add(f);
    };

    this.update = function() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    };
    
    this.checkEdges = function() {
        if ((this.location.x > width) || (this.location.x < 0)){
            this.velocity.x = this.velocity.x * -1;
        } 
      
        if ((this.location.y > height) || (this.location.y < 0)){
            this.velocity.y = this.velocity.y * -1;
        }
    };

    this.postition = function() {
        return [this.location.x, this.location.y];
    };

    this.display = function(i) {
        this.target.position.setValueAtTime(i / frameRate,this.postition());
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
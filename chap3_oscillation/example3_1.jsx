#include "processing.jsx"

var totalTime = 60;
var frameRate = 16;
var totalFrame = totalTime * frameRate;
var height = 360;
var width = 640;

//setup
var mainComp = app.project.items.addComp("chap3", width, height, 1.0, totalTime ,frameRate);
mainComp.layers.addSolid([1.0,1.0,1.0], "background",width,height,1.0,totalTime);

var movers = new Array(5);

for (i = 0; i < movers.length; i++) {
    movers[i] = new Mover(Math.random() * 3 , Math.random() * width,Math.random() * height);
};


//draw
for(i = 0; i <= totalFrame; i++){
         
    for (j = 0; j < movers.length; j++) {
        for(k = 0;k < movers.length; k++){
            if(j == k){
                continue;
            };
            var force = movers[k].attract(movers[j]);
            movers[j].applyForce(force);
        };

        movers[j].update();
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
    
    this.G = 0.4;
    
    this.applyForce = function(force) {
        f = PVector.div(force, this.mass);
        this.acceleration.add(f);
    };

    this.update = function() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    };

    this.attract = function(mover){
        var force = PVector.sub(this.location, mover.location);
        var distance = force.mag();
        distance = constrain(distance ,5.0, 25.0);
        force.normalize();
        
        var strength = (this.G * this.mass * mover.mass) / (distance * distance);
        force.mult(strength);
        return force;
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
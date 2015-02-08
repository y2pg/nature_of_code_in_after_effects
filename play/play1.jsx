//Chapter1とChapter2の内容をふまえて、ちょっとした映像を作る
//赤い丸が複数の白い丸を追いかけて、赤い丸と白い丸がぶつかると、白い丸は爆発する

#include "processing.jsx"

myInherit = function(o) {
    var F = function(){};
    F.prototype = o;
    return new F();
};

function CircleShape(comp, size, color){
    var EllipseSize = [size, size];
    var FillColor = color; 
    var shapeLayer = comp.layers.addShape();
    var shapeLayerContents = shapeLayer.property("ADBE Root Vectors Group");
    var shapeGroup = shapeLayerContents.addProperty("ADBE Vector Group");
    var ellipse = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
    ellipse.property("ADBE Vector Ellipse Size").setValue(EllipseSize);
    var shapeFill = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
    shapeFill.property("ADBE Vector Fill Color").setValue(FillColor);
    return shapeLayer
}

var Mover = function(m, _x, _y) {
    this.target = CircleShape (mainComp, m * 16, [0, 0, 0.7]);
    
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
    
    this.G = 1.5;
};

Mover.prototype.applyForce = function(force) {
    f = PVector.div(force, this.mass);
    this.acceleration.add(f);
};

Mover.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
};

Mover.prototype.attract = function(mover){
    var force = PVector.sub(this.location, mover.location);
    var distance = force.mag();
    distance = constrain(distance ,5.0, 25.0);
    force.normalize();
    
    var strength = (this.G * this.mass * mover.mass) / (distance * distance);
    force.mult(strength);
    return force;
};
    
Mover.prototype.checkEdges = function() {
    if ((this.location.x > width - 10) || (this.location.x < 0 + 10)){
        var repulsion = this.velocity.x * -1 * 0.1;
        this.velocity.x += repulsion;
    } 
  
    if ((this.location.y > height) || (this.location.y < 0)){
        var repulsion = this.velocity.y * -1 * 0.1;
        this.velocity.y + repulsion;
    }
};

Mover.prototype.postition = function() {
    return [this.location.x, this.location.y];
};

Mover.prototype.display = function(i) {
    this.target.position.setValueAtTime(i / frameRate,this.postition());
}; 

Mover.prototype.isCollision = function(mover){
    var force = PVector.sub(this.location, mover.location);
    var distance = force.mag();
    if(distance < (this.mass * 16 + mover.mass * 16) / 2){
        return true;
    }
    return false;
};

var Destroyer = function(m, _x, _y){
    this.target = CircleShape (mainComp, m * 16, [0.9, 0, 0]);
    
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
    
    this.G = 3;
};

Destroyer.prototype = myInherit(Mover.prototype);

Destroyer.prototype.attracted = function(mover){
    var force = PVector.sub(mover.location, this.location);
    var distance = force.mag();
    distance = constrain(distance ,2.0, 25.0);
    force.normalize();
    
    var strength = (this.G * this.mass * mover.mass) / (distance * distance);
    if (distance < 10){
        force.mult(strength * 30);
    }else{
        force.mult(strength * 0.3);
    }
    return force;
};

    


var totalTime = 30;
var frameRate = 16;
var totalFrame = totalTime * frameRate;
var height = 360;
var width = 640;

//setup
var mainComp = app.project.items.addComp("play1", width, height, 1.0, totalTime ,frameRate);
mainComp.layers.addSolid([1.0,1.0,1.0], "background",width,height,1.0,totalTime);

var movers = new Array(10);

for (i = 0; i < movers.length; i++) {
    movers[i] = new Mover(Math.random() * 3 + 0.5 , Math.random() * width,Math.random() * height);
};

var destroyer = new Destroyer(1.5, 0, 0);

//draw
for(i = 0; i <= totalFrame; i++){
         
    for (j = movers.length-1; j >= 0; j--) {
        for(k = movers.length-1;k >=0; k--){
            if(j == k){
                continue;
            };
            var force = movers[k].attract(movers[j]);
            movers[j].applyForce(force);
        };
    
        var d_force = destroyer.attracted(movers[j]);
        destroyer.applyForce(d_force);
        
        movers[j].checkEdges();
        movers[j].update();
        movers[j].display(i);

        if(movers[j].isCollision(destroyer)){
            var collisionEffect = "CC Ball Action";
            var scatter = "CC Ball Action-0001";
            var compOp = "ADBE Effect Built In Params";
            var effectVisible = "ADBE Effect Mask Opacity";
            var gridSpacing = "CC Ball Action-0006";
            
            var colEf = movers[j].target.property("エフェクト").addProperty(collisionEffect);
            colEf[gridSpacing].setValue(movers[j].mass /2);
            colEf[scatter].setValueAtTime(i / frameRate,0);
            colEf[scatter].setValueAtTime(i / frameRate + 2,100);
            colEf[compOp][effectVisible].setValueAtTime(0 ,0);
            colEf[compOp][effectVisible].setValueAtTime(i / frameRate -0.1 ,0);
            colEf[compOp][effectVisible].setValueAtTime(i / frameRate ,100);
            
            movers[j].target.transform.opacity.setValueAtTime(0,100);
            movers[j].target.transform.opacity.setValueAtTime(i / frameRate + 1 ,100);
            movers[j].target.transform.opacity.setValueAtTime(i / frameRate  + 2,0);
            movers.splice (j, 1);
        }
        
        destroyer.checkEdges();
        destroyer.update();
        destroyer.display(i);
    };
};

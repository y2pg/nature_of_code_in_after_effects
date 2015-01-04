
var totalTime = 20;
var frameRate = 29.97;
var totalFrame = totalTime * frameRate;
var height = 360;
var width = 640;

//setup
var mainComp = app.project.items.addComp("chap1", width, height, 1.0, totalTime ,frameRate);
mainComp.layers.addSolid([1.0,1.0,1.0], "background",width,height,1.0,totalTime);
var target = CircleShape(mainComp, 50);

var mover = new Mover();


//draw
for(i = 0; i <= totalFrame; i++){
    mover.update();
    mover.checkEdges ();

    target.position.setValueAtTime(i / frameRate,mover.postition());
};

function Mover() {
    this.location = new PVector({
        x: Math.random() * width,
        y: Math.random() * height
    });

    this.velocity = new PVector({
        x: (Math.random() * 4) - 2,
        y: (Math.random() * 4) - 2
    });

    this.update = function() {
        this.location.add(this.velocity);
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
    }
 }

function PVector(param) {

    this.x = param.x;
    this.y = param.y;

    this.add = function(vector) {
        this.x += vector.x;
        this.y += vector.y;
    };

    this.sub = function(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    };

    this.mult = function(n) {
        this.x *= n;
        this.y *= n;
    };

    this.div = function(n) {
        this.x /= n;
        this.y /= n;
    };

    this.mag = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    this.normalize = function() {
        var m = this.mag();
        if (m != 0) {
            this.div(m);
        }
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


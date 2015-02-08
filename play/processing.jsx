var PVector = (function () {
    function PVector(param) {
        this.x = param.x;
        this.y = param.y;
    }

    PVector.prototype.add = function(vector){
        this.x += vector.x;
        this.y += vector.y;
    };

    PVector.prototype.sub = function(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    };

    PVector.prototype.mult = function(n) {
        this.x *= n;
        this.y *= n;
    };

    PVector.prototype.div = function(n) {
        this.x /= n;
        this.y /= n;
    };

    PVector.prototype.mag = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    PVector.prototype.normalize = function() {
        var m = this.mag();
        if (m != 0) {
            this.div(m);
        }
    };

    PVector.prototype.limit = function(max) {
        if(this.mag() > max) {
            this.normalize();
            this.mult(max);
        }
    };

    PVector.prototype.get = function() {
        var v = new PVector({
            x: this.x,
            y: this.y
        });
        return v;
    };

    PVector.random2D = function () {
        var vector = new PVector({
            x: Math.random() * 2 -1,
            y: Math.random() * 2 -1
        });
        vector.normalize();
        return vector;
    };
    PVector.add = function(vector1, vector2) {
        var v = new PVector({
            x: vector1.x + vector2.x,
            y: vector1.y + vector2.y
        });
        return v;
    };
    PVector.sub = function(vector1, vector2) {
        var v = new PVector({
            x: vector1.x - vector2.x,
            y: vector1.y - vector2.y
        });
        return v;
    };
    PVector.mult = function(vector, n) {
        var v = new PVector({
            x: vector.x * n,
            y: vector.y * n
        });
        return v;
    };
    PVector.div = function(vector, n) {
        var v = new PVector({
            x: vector.x / n,
            y: vector.y / n
        });
        return v;
    };
    return PVector;
})();

function constrain(n ,min ,max){
    if(n < min){
        return min;
    };
    if(n > max){
        return max;
    };
    return n;
};

Object.create = function(parent) {
    var F = function() {};
    F .prototype = parent;
    return new F();
};
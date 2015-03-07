#include "processing.jsx"

var pendulum= function ( spec, my ){

    var that = {};
    
    that.target = spec.target;
    that.origin = spec.origin.get();
    that.line = spec.line;
    that.laser = that.line.property("エフェクト").addProperty("レーザー");
    that.laser["長さ"].setValue(1);
    that.laser["時間設定"].setValue(0.5);
    that.laser["柔らかさ"].setValue(0);
    that.laser["内側のカラー"].setValue([0,0,0]);
    that.laser["外側のカラー"].setValue([0,0,0]);
    
    my = my || {};
    
    my.r = spec.r;
    my.angle = Math.PI /3;
    my.aVelocity = 0;
    my.aAcceleration = 0;
    my.damping = 0.998;
    my.gravity = 0.4;
    

    
    that.update = function(){
        my.aAcceleration = (-1 * my.gravity / my.r) * Math.sin(my.angle);
        
        my.aVelocity += my.aAcceleration;
        my.angle += my.aVelocity;
        
        my.aVelocity *= my.damping;
        
        my.location = new PVector({x: my.r * Math.sin(my.angle), y: my.r * Math.cos(my.angle)});
        my.location.add(that.origin);
    }

    that.position = function(){
        return [my.location.x, my.location.y];
    }

    that.originPosition = function(){
        return [that.origin.x, that.origin.y];
    }    
    return that;
};


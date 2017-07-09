var randomInRange = require("./helpers").randomInRange;

function Dot(x, y, size) {
	this.x = x;
	this.y = y;
	this.size = size;
}

//  Speed of moving forward
Dot.prototype.calculateSpeed = function(maxSize, acceleration) {
	this.speed = (this.size / maxSize) * acceleration;
};

//  Speed on mouse movement
Dot.prototype.parallaxSpeed = function(maxSize) {
	return this.size / maxSize;
};

//  Increase size and speed
Dot.prototype.increase = function(increment, maxSize, acceleration) {
	if (this.size < maxSize) {
		this.size += increment;
		this.calculateSpeed(maxSize, acceleration);
	}
};

//  Calculate and return new dot
Dot.calculate = function (minX, minY, maxX, maxY, minSize, maxSize) {
	var x = randomInRange(minX, maxX),
			y = randomInRange(minY, maxY),
			size;

	if (maxSize || maxSize === 0) {
		size = randomInRange(minSize, maxSize);
	} else {
		size = minSize;
	}

	return new Dot(x, y, size);
}



module.exports = Dot;

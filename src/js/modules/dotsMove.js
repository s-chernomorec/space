var helpers = require("./helpers");
var Dot = require("./dotConstructor");

module.exports = function (pageWidth, pageHeight, sizeMin, sizeMax, dotSizeIncrement, dotAcceleration, ticksPerSecond, lastMousePosition, firstMousePosition) {
  "use strict";

  function dotOutOfRange(dot) {
		var lastX = lastMousePosition.getX(),
				lastY = lastMousePosition.getY();
		if ((dot.x > (pageWidth - lastX) + pageWidth || dot.x < -lastX) || (dot.y > (pageHeight - lastY) + pageHeight || dot.y < -lastY)) {
			return true;
		} else {
			return false;
		}
	}

	function recalculateOutOfRangeDot(arr, item, i) {
		if (dotOutOfRange(item)) {
			arr.splice(i, 1, Dot.calculate(-firstMousePosition.getX(), -firstMousePosition.getY(), pageWidth + firstMousePosition.getX(), pageHeight + firstMousePosition.getY(), sizeMin));
		}
	}

	function moveDots(arr) {
		arr.forEach(function(item, i, arr) {
			item.increase(dotSizeIncrement, sizeMax, dotAcceleration);
			item.x += (item.x - lastMousePosition.getX()) * item.speed / ticksPerSecond;
			item.y += (item.y - lastMousePosition.getY()) * item.speed / ticksPerSecond;
			recalculateOutOfRangeDot(arr, item, i);
		});

    return arr;
	}

  return {
    moveDots: moveDots
  };
}

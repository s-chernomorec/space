module.exports = (function() {
	"use strict";

	function initCanvas(canvas, ctx, w, h) {
		canvas.width = w;
		canvas.height = h;

		ctx.strokeStyle = '#fff';
		ctx.fillStyle = '#fff';
	}

	function randomInRange(min, max) {
		return Math.random() * (max - min) + min;
	}

	function detectLeftButton(e) {
    if ('buttons' in e) {
        return e.buttons === 1;
    } else if ('which' in e) {
        return e.which === 1;
    } else {
        return e.button === 1;
    }
	}

	function clearPage(ctx, w, h) {
		return function () {
			ctx.clearRect(0, 0, w, h);
		}
	}

	function drawDots(ctx){
		return function(arr) {
			arr.forEach(function (item, i, arr) {
				ctx.fillRect(item.x, item.y, item.size, item.size);
			});
		}
	}

	function mousePosition() {
		var x = 0, y = 0;

		function getX() { return x; }
		function getY() { return y; }

		function setX(newX) { x = newX; }
		function setY(newY) { y = newY; }

		return {
			getX: getX,
			getY: getY,
			setX: setX,
			setY: setY
		};
	}

	function saveMousePosition(positionObject) {
		return function (e) {
			positionObject.setX(e.clientX);
			positionObject.setY(e.clientY);
		}
	}

	return {
		initCanvas: initCanvas,
		randomInRange: randomInRange,
		detectLeftButton: detectLeftButton,
		clearPage: clearPage,
		drawDots: drawDots,
		mousePosition: mousePosition,
		saveMousePosition: saveMousePosition,
	}
})();

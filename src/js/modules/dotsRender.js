var helpers = require("./helpers");
var Dot = require("./dotConstructor");

module.exports = function (pageWidth, pageHeight, sizeMin, sizeMax, dotsCount, arrOfDots) {

	function calculateVisible () {
		var arr = [],
				dots = dotsCount;
		for (dots; dots--; ) {
			arr.push(Dot.calculate(0, 0, pageWidth, pageHeight, sizeMin, sizeMax));
		}
		return arr;
	}

	function calculateHidden (e) {

		var clientX = e.clientX,
				clientY = e.clientY,
				arr = [];

		var sides = {
			leftSide: {
				ratioX: clientX / pageWidth,
				ratioY: 2,
				dotRangeX: { start: -clientX, end: 0 },
				dotRangeY: { start: -clientY, end: pageHeight * 2 - clientY }
			},
			rightSide: {
				ratioX: (pageWidth - clientX) / pageWidth,
				ratioY: 2,
				dotRangeX: { start: pageWidth, end: pageWidth * 2 - clientX },
				dotRangeY: { start: -clientY, end: pageHeight * 2 - clientY }
			},
			topSide: {
				ratioX: 1,
				ratioY: clientY / pageHeight,
				dotRangeX: { start: 0, end: pageWidth },
				dotRangeY: { start: -clientY, end: 0 }
			},
			bottomSide: {
				ratioX: 1,
				ratioY: (pageHeight - clientY) / pageHeight,
				dotRangeX: { start: 0, end: pageWidth },
				dotRangeY: { start: pageHeight, end: pageHeight * 2 - clientY }
			}
		};



		for (var s in sides) {

			var dotsOnSide = Math.floor(sides[s].ratioX * sides[s].ratioY * dotsCount);
			for (dotsOnSide; dotsOnSide--; ) {
				arr.push(Dot.calculate(sides[s].dotRangeX.start, sides[s].dotRangeY.start, sides[s].dotRangeX.end, sides[s].dotRangeY.end, sizeMin, sizeMax));
			}

		}

		return arr;

	}

	return {
		calculateVisible: calculateVisible,
		calculateHidden: calculateHidden
	}
};

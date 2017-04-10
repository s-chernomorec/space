var helpers = require("./helpers");


var pageW = document.documentElement.clientWidth;
var pageH = document.documentElement.clientHeight;

module.exports = {
	drawVisible: function (dotsCount, dotsSize, min, max) {
		
		var arrOfDots = [];
		
		// шаблон цикла for из книги Стояна Стефанова "Javacript Шаблоны"
		for (dotsCount; dotsCount--; ) {
			
//			var randDotX = Math.ceil(Math.random() * pageW),
//					randDotY = Math.ceil(Math.random() * pageH);
			var randDotX = helpers.randomInRange(0, pageW),
					randDotY = helpers.randomInRange(0, pageH),
					speed = helpers.randomDotSpeed(min, max),
					size = helpers.randomDotSize(dotsSize, speed);
			
			
			// В массив arrOfDots попадают данные для точек: 
			//   под индексом 0 записывается позиция по х - randDotX
			//   под индексом 1 записывается позиция по у - randDotY
			//   под индексом 2 записывается коэфициент speed, который отображает множитель скорости движения точки, а так же множитель размера точки, так как мы принимаем что если точка(звезда) быстро двигается, значит она находится близко к наблюдателю, следовательно кажется ему большей
			arrOfDots.push([randDotX, randDotY, speed, size]);
		}
		
		return arrOfDots;
		
	},
	
	drawHidden: function(e, dotsCount, dotsSize, min, max) {
		
		var clientX = e.clientX;
		var clientY = e.clientY;
		var arrOfDots = [];
		
//		var sides = {
//			leftSide: {
//				ratioX: (pageW - clientX) / pageW,
//				ratioY: 2,
//				dotRangeX: { start: clientX - pageW, end: 0 },
//				dotRangeY: { start: clientY - pageH, end: pageH + clientY }
//			}, 
//			rightSide: {
//				ratioX: clientX / pageW,
//				ratioY: 2,
//				dotRangeX: { start: pageW, end: pageW + clientX },
//				dotRangeY: { start: clientY - pageH, end: pageH + clientY }
//			},
//			topSide: {
//				ratioX: 1,
//				ratioY: (pageH - clientY) / pageH,
//				dotRangeX: { start: 0, end: pageW },
//				dotRangeY: { start: clientY - pageH, end: 0 }
//			},
//			bottomSide: {
//				ratioX: 1,
//				ratioY: clientY / pageH,
//				dotRangeX: { start: 0, end: pageW },
//				dotRangeY: { start: pageH, end: pageH + clientY }
//			}
//		};

		var sides = {
			leftSide: {
				ratioX: clientX / pageW,
				ratioY: 2,
				dotRangeX: { start: -clientX, end: 0 },
				dotRangeY: { start: -clientY, end: pageH + (pageH - clientY) }
			}, 
			rightSide: {
				ratioX: (pageW - clientX) / pageW,
				ratioY: 2,
				dotRangeX: { start: pageW, end: pageW + (pageW - clientX) },
				dotRangeY: { start: -clientY, end: pageH + (pageH - clientY) }
			},
			topSide: {
				ratioX: 1,
				ratioY: clientY / pageH,
				dotRangeX: { start: 0, end: pageW },
				dotRangeY: { start: -clientY, end: 0 }
			},
			bottomSide: {
				ratioX: 1,
				ratioY: (pageH - clientY) / pageH,
				dotRangeX: { start: 0, end: pageW },
				dotRangeY: { start: pageH, end: pageH + (pageH - clientY) }
			}
		};
		
		function calculateDotsCount(dotsCount) {
			
			var arrOfDots = [];
			for (var side in sides) {
				
				var dots = Math.floor(sides[side].ratioX * sides[side].ratioY * dotsCount);
				console.log(side, " : ", dots);
				for (dots; dots--; ) {
//					var randDotX = Math.ceil(Math.random() * pageW),
//							randDotY = Math.ceil(Math.random() * pageH);
						var randDotX = helpers.randomInRange(sides[side].dotRangeX.start, sides[side].dotRangeX.end),
								randDotY = helpers.randomInRange(sides[side].dotRangeY.start, sides[side].dotRangeY.end),
								speed = helpers.randomDotSpeed(min, max),
								size = helpers.randomDotSize(dotsSize, speed);
			
//					arrOfDots.push([1,2,3,4]);
					arrOfDots.push([randDotX, randDotY, speed, size]);
				}
				
			}
			return arrOfDots;
		}
		
		return calculateDotsCount(dotsCount);
		
//		var leftSide = {
//			ratioX: (pageW - clientX) / pageW,
//			ratioY: 2
//		};
//	
//		var rightSide = {
//			ratioX: clientX / pageW,
//			ratioY: 2
//		};
//
//		var topSide = {
//			ratioX: 1,
//			ratioY: (pageH - clientY) / pageH
//		};
//
//		var bottomSide = {
//			ratioX: 1,
//			ratioY: clientY / pageH
//		};
	
//	      left
//		var ratioX = clientX / pageW;
//		var ratioY = 2;
//		
//	
//	      right
//		var ratioX = (pageW - clientX) / pageW;
//		var ratioY = 2;
//		var dotsNumber = dotsCount * ratioX * ratioY;
//	
//	      top
//		var ratioX = 1;
//		var ratioY = (pageH - clientY) / pageH;
//		var dotsNumber = dotsCount * ratioX * ratioY;
//	
//	      bottom
//		var ratioX = 1;
//		var ratioY = clientY / pageH;
//		var dotsNumber = dotsCount * ratioX * ratioY;
//	
//	
//	
//	
//			  left
//		var leftX = helpers.randomInRange(pageW, pageW + clientX);
//		var leftY = helpers.randomInRange(clientY - pageH, pageH + clientY);
//	
//			  right
//		var rightX = helpers.randomInRange(clientX - pageW, 0);
//		var rightY = helpers.randomInRange(clientY - pageH, pageH + clientY);
//			
//			  top
//		var topX = helpers.randomInRange(0, pageW);
//		var topY = helpers.randomInRange(clientY - pageH, 0);
//	
//			  bottom
//		var bottomX = helpers.randomInRange(0, pageW);
//		var bottomY = helpers.randomInRange(pageH, pageH + clientY);
	}
};


//module.exports = function (ctx, arrOfDots, pageWidthOverall, pageHeightOverall, dotsCount, dotsSize, min, max) {
//	
//}
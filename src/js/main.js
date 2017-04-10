var animateLettersBlock = require("./letterAnimation");
var helpers = require("./helpers");
var dotsRender = require("./dotsRender");



(function () {
	
	var canvasEl = document.getElementById('canvas-app'),
			ctx = canvasEl.getContext('2d'),
			// -------- Доработать взятие размеров экрана у IE 8- ----------------
			pageWidth = document.documentElement.clientWidth,
			pageHeight = document.documentElement.clientHeight,
			centerX = pageWidth / 2,
			centerY = pageHeight / 2,
			arrOfDots = [],
			interv,
			randomMin = 50,
			randomMax = 250,
			dotsCount = 2000,
			dotsSize = 70,
			mouseCoordX,
			mouseCoordY, 
			state = false,
			parallaxSize = 2,
			parallaxMultiplier = randomMin * parallaxSize;
	
	canvasEl.width = pageWidth;
	canvasEl.height = pageHeight;
	
	ctx.strokeStyle = '#fff';
	ctx.fillStyle = '#fff';
	
	function clearPage(){
		ctx.clearRect(0, 0, pageWidth, pageHeight);
	}
	
	
	// --- REMOVE THIS ---
	function showCoords(){
		var min1 = 0, min2 = 0, max1 = 0, max2 = 0;
		arrOfDots.forEach(function(item, i) {
			min1 = item[0] < min1 ? item[0] : min1;
			min2 = item[1] < min2 ? item[1] : min2;
			max1 = item[0] > max1 ? item[0] : max1;
			max2 = item[1] > max2 ? item[1] : max2;
		});
		console.log("x min: " + Math.floor(min1) + " | y min: " + Math.floor(min2) + " pageX :" + pageWidth + " | pageY :" + pageHeight);
		console.log("x max: " + Math.floor(max1) + " | y max: " + Math.floor(max2));
	}
	// ------------------
	
	
	// ----- Отрисовка точек ----
	
	
	arrOfDots = arrOfDots.concat(dotsRender.drawVisible(dotsCount, dotsSize, randomMin, randomMax));
	
	arrOfDots.forEach(function(item, i){
		ctx.fillRect(item[0],item[1], item[3], item[3]);
	});
	
	
	// ------------ Анимация блока букв ----------------
	
	animateLettersBlock(500, 800, 7, 16);
	
	// -------------------------------------------------
	function moveDots() {
		ctx.clearRect(0, 0, pageWidth, pageHeight);
		arrOfDots.forEach(function(item, i) {
			
			item[0] += (item[0] - mouseCoordX) * item[2];
			item[1] += (item[1] - mouseCoordY) * item[2];
			
			if (item[0] > pageWidth * 2 || item[1] > pageHeight * 2) {
				// Доделать генерацию точек с учётом уменьшьшения области просмотра
				arrOfDots.splice(i, 1, [Math.floor(Math.random() * pageWidth), Math.floor(Math.random() * pageHeight), helpers.randomDotSpeed(randomMin, randomMax)]);
			}
			
			ctx.fillRect(item[0],item[1], dotsSize * item[2], dotsSize * item[2]);
				
		});
	}
	
	function movingForward() {
		interv = setInterval(moveDots, 16);
	};
	
	function stopMoving() { 
		clearInterval(interv); 
	};
	
	function parallax(e) {
		console.log("bla");
		if (!state) {
			state = true;
		} else {
			ctx.clearRect(0, 0, pageWidth, pageHeight);
			arrOfDots.forEach(function(item, i) {
				item[0] = item[0] - (e.clientX - mouseCoordX) * item[2] * parallaxMultiplier;
				item[1] = item[1] - (e.clientY - mouseCoordY) * item[2] * parallaxMultiplier;
				
//				item[0] = item[0] - (e.clientX - mouseCoordX);
//				item[1] = item[1] - (e.clientY - mouseCoordY);
				
				ctx.fillRect(item[0], item[1], dotsSize * item[2], dotsSize * item[2]);
			});
		}
		
		// -- lastCoords --
		mouseCoordX = e.clientX;
		mouseCoordY = e.clientY;
//		console.log("X:", mouseCoordX, "| Y:", mouseCoordY);
		
	}
	
	
//	var parallax = function(e) {
//		
//		mouseCoordX = e.clientX;
//		mouseCoordY = e.clientY;
//		
//		parallax = function(e) {
	
//			ctx.clearRect(0, 0, pageWidth, pageHeight);
//			
//			arrOfDots.forEach(function(item, i) {
//				item[0] = item[0] - (e.clientX - mouseCoordX) * item[2] * parallaxMultiplier;
//				item[1] = item[1] - (e.clientY - mouseCoordY) * item[2] * parallaxMultiplier;
//				
//				ctx.fillRect(item[0], item[1], dotsSize * item[2], dotsSize * item[2]);
//			});
//			
//			mouseCoordX = e.clientX;
//			mouseCoordY = e.clientY;
//		};
//	}
	
	
	
	function drawHidden(e) {
		
		mouseCoordX = e.clientX;
		mouseCoordY = e.clientY;
		
		arrOfDots = arrOfDots.concat(dotsRender.drawHidden(e, dotsCount, dotsSize, randomMin, randomMax));
		
		canvasEl.removeEventListener('mouseenter', drawHidden, false);
	}
	
	
	
	
	
	canvasEl.addEventListener('mouseenter', drawHidden, false);
	
	canvasEl.addEventListener('mousedown', movingForward, false);
	
	canvasEl.addEventListener('mouseup', stopMoving, false);
	
	canvasEl.addEventListener('mousemove', parallax, false);
	
	
})();
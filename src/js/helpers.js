module.exports = (function() {
	
	function randomInRange(min, max) { 
		return Math.random() * (max - min) + min; 
	}
	
	function randomDotSpeed(min, max) {
		return 1 / randomInRange(min, max);
	}
	
	function randomDotSize(dotsSize, speed) {
		return dotsSize * speed;
	}
	
	function dotSize(dotsSizeMin, dotsSizeMax) {
		return randomInRange(dotsSizeMin, dotsSizeMax);
	}
	
	function dotsRatio(pageWidth, pageHeight) {
		return pageWidth * pageHeight;
	}
	
	function calculateDot(){
		
	}
	
	return {
		randomInRange: randomInRange,
		randomDotSpeed: randomDotSpeed,
		randomDotSize: randomDotSize
	}
})();
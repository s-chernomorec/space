// Args :
//   delayLines    -  Delay of horizontal lines animation
//   delayLetters  -  Delay of letters animation
//   speed         -  Number of intervals needed for letter to appear
//   step          -  Interval of animation

function animateLettersBlock(delayLines, delayLetters, speed, step) {
	
	var welcomeTextContainer = document.getElementById('letters-block'),
			hrFirst = document.getElementById('hr-header'),
			hrLast = document.getElementById('hr-header-last'),
			letters = document.getElementsByClassName('header-letter'),
			timeline = 0,
			interv;
	
	welcomeTextContainer.style.display = 'block';
	welcomeTextContainer.className = 'letters-block-animation';
	
	setTimeout(animateLines, delayLines);
	setTimeout(animateLetters, delayLetters);
	
	
	function animateLines() {
		
		hrLast.style.display = hrFirst.style.display = 'block';
		hrFirst.className = 'hr-header-expand';
		hrLast.className = 'hr-header-last-expand';
		
	}
	
	function animateLetters() {
		var letterCounter = 0;
		
		interv = setInterval(function(){
				
				if (timeline % speed === 0) {
					rotateLetter(letterCounter);
					letterCounter++;
				}
				timeline++;
			
			}, step)
		
	}
	
	function rotateLetter(num){
		if (letters[num]) {
			letters[num].className += ' rotate-letter';
			letters[num].style.visibility = 'visible';
		} else {
			clearInterval(interv);
		}
		
	}
	
}










module.exports = animateLettersBlock;
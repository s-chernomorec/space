(function() {
  "use strict";

  var helpers = require("./modules/helpers"),
    Dot = require("./modules/dotConstructor"),
    animateLetters = require("./modules/lettersAnimation"),
    dotsRender = require("./modules/dotsRender"),
    dotsMove = require("./modules/dotsMove"),
    dotsParallax = require("./modules/dotsParallax"),
    fadeOut = require("./modules/fadeOut");

  var canvasEl = document.getElementById('canvas-app'),
    ctx = canvasEl.getContext('2d'),
    pageWidth = document.documentElement.clientWidth,
    pageHeight = document.documentElement.clientHeight,
    // -------- Dots config --------
    sizeMin = 0.4, //  minimal size of dot
    sizeMax = 1.6, //  maximal size of dot
    dotSizeIncrement = 0.01, //  value by which dot size increases on each tick on mouse move
    dotAcceleration = 2.5, //  multiplier of dot speed on mouse move
    dotsCount = pageHeight, //  count of dots which will be rendered in drawVisible()
    hiddenDotsIsDrawn = false,
    // -------- Letters animation --------
    fadeOutDuration = 800, //  fadeout of letters block
    delayOfLines = 500, //  delay of horizontal lines animation
    delayOfLetters = 800, //  delay of letters animation
    speed = 7, //  number of intervals needed for letter to appear
    step = 16, //  interval of animation
    // -------- Timers/Intervals --------
    intervTime = 16, //  interval of movingForward()
    ticksPerSecond = 1000 / intervTime, //  number of intervals per second

    arrOfDots = [],
    interv = null,
    // -------- fadeOut elements --------
    lettersBlock = document.getElementById('letters-block'),
    hintsBlock = document.getElementById('footer-hint-wrapper');

  helpers.initCanvas(canvasEl, ctx, pageWidth, pageHeight);

  // ---------- Init helpers ----------

  var lastMousePosition = helpers.mousePosition(),
    firstMousePosition = helpers.mousePosition(),
    saveLastPosition = helpers.saveMousePosition(lastMousePosition),
    saveFirstPosition = helpers.saveMousePosition(firstMousePosition);

  var clearPage = helpers.clearPage(ctx, pageWidth, pageHeight),
    drawDots = helpers.drawDots(ctx);

  // ---------- Init main modules ----------

  dotsRender = dotsRender(pageWidth, pageHeight, sizeMin, sizeMax, dotsCount, arrOfDots);
  dotsMove = dotsMove(pageWidth, pageHeight, sizeMin, sizeMax, dotSizeIncrement, dotAcceleration, ticksPerSecond, lastMousePosition, firstMousePosition);
  dotsParallax = dotsParallax(sizeMax, lastMousePosition, saveLastPosition);

  // ---------- Rendering dots ----------

  (function drawVisible() {
    arrOfDots = arrOfDots.concat(dotsRender.calculateVisible());
    drawDots(arrOfDots);
  })();

  function drawHidden(e) {
    hiddenDotsIsDrawn = true;
    saveFirstPosition(e);
    saveLastPosition(e);
    arrOfDots = arrOfDots.concat(dotsRender.calculateHidden(e));

    document.documentElement.removeEventListener('mouseenter', drawHidden, false);
  }

  // ---------- Letters animation ----------

  animateLetters(delayOfLines, delayOfLetters, speed, step);

  // ---------- Moving when holding mouse button ----------

  function moveDots(e) {
    clearPage();
    arrOfDots = dotsMove.moveDots(arrOfDots);
    drawDots(arrOfDots);
  }

  function movingForward(e) {
    if (helpers.detectLeftButton(e)) {
      interv = setInterval(moveDots, intervTime);
    }
  };

  function stopMoving() {
    clearInterval(interv);
  };

  // ---------- Parallax on mouse move ----------

  var parallaxInterv;
  function parallaxFunc(e) {
    if (hiddenDotsIsDrawn === false) {
      drawHidden(e)
    }
    clearPage();
    arrOfDots = dotsParallax.parallax(e, arrOfDots);
    drawDots(arrOfDots);

    document.documentElement.removeEventListener('mousemove', parallaxFunc, false);

    parallaxInterv = setTimeout(function() {
      document.documentElement.addEventListener('mousemove', parallaxFunc, false);
    }, 10);
  }

  // ---------- Handlers ----------

  function exposeMoving(e) {
    fadeOut(fadeOutDuration, [lettersBlock, hintsBlock]);

    document.documentElement.addEventListener('mousedown', movingForward, false);

    document.documentElement.addEventListener('mouseup', stopMoving, false);

    document.documentElement.removeEventListener('mousedown', exposeMoving, false);
  }

  document.documentElement.addEventListener('mouseenter', drawHidden, false);

  document.documentElement.addEventListener('mousemove', parallaxFunc, false);

  document.documentElement.addEventListener('mousedown', exposeMoving, false);

})();

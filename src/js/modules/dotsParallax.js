module.exports = function (sizeMax, lastMousePosition, saveLastPosition) {
  "use strict";
  
  var firstCalled = true;

  function parallax (e, arr) {
    if (!firstCalled) {
      arr.forEach(function(item, i) {
        item.x -= (e.clientX - lastMousePosition.getX()) * item.parallaxSpeed(sizeMax);
        item.y -= (e.clientY - lastMousePosition.getY()) * item.parallaxSpeed(sizeMax);
      });
    } else { firstCalled = false; }

    saveLastPosition(e);
    return arr;
  }

  return {
    parallax: parallax
  };

};

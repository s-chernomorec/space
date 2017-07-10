module.exports = function fadeOut(fadeOutDuration, elements) {
  var i = 100,
      fadeInterv;

  fadeInterv = setInterval(function() {

    elements.forEach(function(el) {
      el.style.opacity = i / 100;
    });

    if (i === 0) {
      elements.forEach(function(el) {
        el.style.display = "none";
      });

      clearInterval(fadeInterv);
    }

    i -= 1
  }, fadeOutDuration / i);
}

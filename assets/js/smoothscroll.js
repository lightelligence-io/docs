// query selector targets Hugo TOC 
(function() {

  'use strict';

  // Feature Test
  if ('querySelector' in document && 'addEventListener' in window && Array.prototype.forEach) {

    // Function to animate the scroll
    var smoothScroll = function(anchor, duration) {

      // Calculate how far and how fast to scroll
      var startLocation = window.pageYOffset;
      var endLocation = anchor.offsetTop;
      var distance = endLocation - startLocation;
      var increments = distance / (duration / 16);
      var stopAnimation;

      // Scroll the page by an increment, and check if it's time to stop
      var animateScroll = function() {
        window.scrollBy(0, increments);
        stopAnimation();
      };

      // If scrolling down
      if (increments >= 0) {
        // Stop animation when you reach the anchor OR the bottom of the page
        stopAnimation = function() {
          var travelled = window.pageYOffset;
          if ((travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight)) {
            clearInterval(runAnimation);
          }
        };
      }
      // If scrolling up
      else {
        // Stop animation when you reach the anchor OR the top of the page
        stopAnimation = function() {
          var travelled = window.pageYOffset;
          if (travelled <= (endLocation || 0)) {
            clearInterval(runAnimation);
          }
        };
      }

      // Loop the animation function
      var runAnimation = setInterval(animateScroll, 16);

    };

    // Define smooth scroll links
    var scrollToggle = document.querySelectorAll('#TableOfContents ul li a');

    // For each smooth scroll link
    [].forEach.call(scrollToggle, function(toggle) {

      // When the smooth scroll link is clicked
      toggle.addEventListener('click', function(e) {

        // Prevent the default link behavior
        e.preventDefault();

        // Get anchor link and calculate distance from the top
        var dataID = toggle.getAttribute('href');
        var dataTarget = document.querySelector(dataID);
        var dataSpeed = toggle.getAttribute('data-speed');

        // If the anchor exists
        if (dataTarget) {
          // Scroll to the anchor
          smoothScroll(dataTarget, dataSpeed || 500);
        }

      }, false);

    });

  }

})();

window.addEventListener('DOMContentLoaded', () => {
  const titles = document.querySelectorAll('div#prose > h2, div#prose > h3, div#prose > h4, div#prose > h5, div#prose > h6')
  
  titles.forEach(title => {
    const anchor = document.createElement('a')
    anchor.classList.add('anchor')
    anchor.href = '#' + title.id;
    anchor.innerHTML = '  <svg class="fill-current o-60 hover-accent-color-light" height="22px" viewBox="0 0 24 24" width="22px" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>';
    title.appendChild(anchor)
  })
})

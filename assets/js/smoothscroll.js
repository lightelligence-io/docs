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
    anchor.innerHTML = '  <svg class="fill-current hover-accent-color-light" height="16px" viewBox="0 0 16 16" width="16px" xmlns="http://www.w3.org/2000/svg"><path style="fill:#ff6600" d="M 5,15.080026 C 4.6037391,15.082308 4.2226641,14.927721 3.94,14.65 L 1.35,12.06 C 0.77054249,11.47212 0.77054249,10.52788 1.35,9.94 L 6.44,4.85 c 0.5878798,-0.5794575 1.5321202,-0.5794575 2.12,0 l 2.29,2.3 -0.7,0.7 -2.3,-2.29 C 7.6555782,5.3694285 7.3444218,5.3694285 7.15,5.56 l -5.09,5.09 c -0.1905715,0.194422 -0.1905715,0.505578 0,0.7 l 2.59,2.59 c 0.1944217,0.190572 0.5055782,0.190572 0.7,0 l 1.8,-1.79 0.7,0.7 -1.79,1.8 C 5.7773358,14.927721 5.3962609,15.082308 5,15.080026 Z m 3.5,-3.5 C 8.1037391,11.582308 7.7226642,11.427721 7.44,11.15 l -2.29,-2.3 0.7,-0.7 2.3,2.29 c 0.1944218,0.190572 0.5055783,0.190572 0.7,0 l 5.09,-5.09 c 0.190572,-0.1944218 0.190572,-0.5055783 0,-0.7 L 11.35,2.06 c -0.194422,-0.1905715 -0.505578,-0.1905715 -0.7,0 l -1.8,1.79 -0.7,-0.7 1.79,-1.8 c 0.58788,-0.57945751 1.53212,-0.57945751 2.12,0 l 2.59,2.59 c 0.579458,0.5878798 0.579458,1.5321202 0,2.12 L 9.56,11.15 C 9.2773358,11.427721 8.8962609,11.582308 8.5,11.580026 Z" id="Color" /></svg>';
    title.appendChild(anchor)
  })
})

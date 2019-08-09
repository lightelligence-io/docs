// Grab any element that has the 'js-toggle' class and add an event listner for the toggleClass function
  var toggleBtns = document.getElementsByClassName('js-toggle');
  for (var i = 0; i < toggleBtns.length; i++) {
    toggleBtns[i].addEventListener('click', toggleClass, false);
  }

var toggleMenuBtn = document.getElementsByClassName('menu-toggle');
for (var i = 0; i < toggleMenuBtn.length; i++) {
  toggleMenuBtn[i].addEventListener('click', toggleClass, false);
}

function toggleClass() {
  // Define the data target via the dataset "target" (e.g. data-target=".docsmenu")
  var content = this.dataset.target.split(' ');
  // Find any menu items that are open
  var mobileCurrentlyOpen = document.querySelector('.mobilemenu:not(.dn)');
  var desktopCurrentlyOpen = document.querySelector('.desktopmenu:not(.dn)');
  var desktopActive = document.querySelector('.desktopmenu:not(.dn)');

  // Loop through the targets' divs
  for (var i = 0; i < content.length; i++) {
    var matches = document.querySelectorAll(content[i]);
       //for each, if the div has the 'dn' class (which is "display:none;"), remove it, otherwise, add that class
        [].forEach.call(matches, function(dom) {
        dom.classList.contains("dn") ?  dom.classList.remove("dn") :  dom.classList.add("dn");
         return false;
       });
        // close the currently open menu items
      if (mobileCurrentlyOpen) mobileCurrentlyOpen.classList.add('dn');
      if (desktopCurrentlyOpen) desktopCurrentlyOpen.classList.add('dn');
      if (desktopActive) desktopActive.classList.remove('db');
    }
}

$('#hamburg-icon').click(function(){
  $(this).toggleClass('open');

  var open = $(this).hasClass('open');
  if(open) {
    $('main#bg-blur, .header-bg-image, #search-input').addClass('bg-blur');
    $('main#bg-blur, .header-bg-image, #search-input').addClass('transform');
    $('.header-logo').addClass('bg-none');
    $('body').addClass('no-scroll');
    $('.docsmenu').addClass('scroll-y');
  }
  else {
    $('main#bg-blur, .header-bg-image, #search-input').removeClass('bg-blur');
    $('main#bg-blur, .header-bg-image, #search-input').removeClass('transform');
    $('.header-logo').removeClass('bg-none');
    $('body').removeClass('no-scroll');
  }
});

$('.scroll-nav p').on('click', () => {
  var ul = $('.scroll-nav ul');
  ul.addClass('open');
});

$('.scroll-nav ul li a').on('click', () => {
  var ul = $('.scroll-nav ul');
  setTimeout(function() {
    ul.removeClass('open');
  }, 500);
});

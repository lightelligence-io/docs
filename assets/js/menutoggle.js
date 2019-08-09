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
    $('main#bg-blur, .header-bg-image, #search-input, .container, .header-detail').addClass('bg-blur');
    $('body').addClass('no-scroll');
    $('.docsmenu').addClass('scroll-y');
});

window.addEventListener('mouseup',function(event){
  var docsmenu = document.getElementById('docsmenu');
  if(!docsmenu.classList.contains('dn')){
    if(event.target.id !== 'docsmenu' && !event.target.parentNode.classList.contains('mm')){
      docsmenu.classList.add(['dn']);
      $('main#bg-blur, .header-bg-image, #search-input, .container, .header-detail').removeClass('bg-blur');
      $('body').removeClass('no-scroll');
    }
  }
});

const tableOfContents = $('nav#TableOfContents');

$('.scroll-nav').on('click', () => {
  console.log('test');
  tableOfContents.toggleClass('open');
});

$('nav#TableOfContents a').on('click', () => {
  setTimeout(function() {
    tableOfContents.removeClass('open');
  }, 300);
});
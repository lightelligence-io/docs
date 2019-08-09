// Grab any element that has the 'js-m-toggle' class and add an event listner for the toggleClass function
var toggleBtns = document.getElementsByClassName('js-m-toggle')
for (var i = 0; i < toggleBtns.length; i++) {
    toggleBtns[i].addEventListener('click', toggleClass, false)
}

var toggleMenuBtn = document.getElementsByClassName('menu-toggle');
for (var i = 0; i < toggleMenuBtn.length; i++) {
  toggleMenuBtn[i].addEventListener('click', toggleClass, false);
}

function toggleClass() {

    // Define the data target via the dataset "target" (e.g. data-target=".docsmenu")
    var content = this.dataset.target.split(' ')
    // Find any menu items that are open
    var mobileCurrentlyOpen = document.querySelector('.mobilemenu:not(.dn)')
    var mobileActive = document.querySelector('.mobilemenu:not(.dn)')

    // Loop through the targets' divs
    for (var i = 0; i < content.length; i++) {
        var matches = document.querySelectorAll(content[i]);
        //for each, if the div has the 'dn' class (which is "display:none;"), remove it, otherwise, add that class
        [].forEach.call(matches, function(dom) {
            dom.classList.contains('dn') ?
                dom.classList.remove('dn') :
                dom.classList.add('dn');
            return false;
        });
        // close the currently open menu items
        if (mobileCurrentlyOpen) mobileCurrentlyOpen.classList.add('dn')
        if (mobileActive) mobileActive.classList.remove('db')
    }
}

$('#hamburg-icon').click(function(){
    var docsmenu = document.querySelector('.docsmenu');
    docsmenu.classList.remove('dn');
    $('main#bg-blur, .header-bg-image, #search-input, .container, .header-detail, nav.relative-l').addClass('bg-blur');
    $('body').addClass('no-scroll');
    $('.docsmenu').addClass('scroll-y');
    $('#bg-blur a, .header-bar a').css('pointer-events', 'none');
    $('.scroll-nav').off();
});

window.addEventListener('mouseup',function(event){
  var docsmenu = document.getElementById('docsmenu');
  if(!docsmenu.classList.contains('dn')){
    if(event.target.id !== 'docsmenu' && !event.target.parentNode.classList.contains('mm')){
      docsmenu.classList.add(['dn']);
      $('main#bg-blur, .header-bg-image, #search-input, .container, .header-detail, nav.relative-l').removeClass('bg-blur');
      $('body').removeClass('no-scroll');
      $('#bg-blur a, .header-bar a').css('pointer-events', 'auto');
      $('.scroll-nav').on();
    }
  }
});

const tableOfContents = $('nav#TableOfContents');

$('.scroll-nav').on('click', () => {
  tableOfContents.toggleClass('open');
});

$('nav#TableOfContents a').on('click', () => {
  setTimeout(function() {
    tableOfContents.removeClass('open');
  }, 300);
});

window.onload = function () {
  var tabelOfCont = $('#TableOfContents');
  console.log(tabelOfCont.length);
  tabelOfCont.length == 0 ?  $('.main-content').removeClass('top-large') : $('.main-content').addClass('top-large');

}

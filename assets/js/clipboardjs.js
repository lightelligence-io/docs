<<<<<<< HEAD
var Clipboard = require("clipboard/dist/clipboard.js");
const copyButtons = document.querySelectorAll(".copy");

new Clipboard(copyButtons, {
  target: function(trigger) {
    if (trigger.classList.contains("copy-toggle")) {
=======
var Clipboard = require('clipboard/dist/clipboard.js');
new Clipboard('.copy', {
  target: function(trigger) {
    if(trigger.classList.contains('copy-toggle')){
>>>>>>> beta
      return trigger.previousElementSibling;
    }
    return trigger.nextElementSibling;
  }
<<<<<<< HEAD
})
  .on("success", function(e) {
    e.clearSelection();
  })
  .on("error", function(e) {
    successMessage(e.trigger, fallbackMessage(e.action));
  });

function fallbackMessage(elem, action) {
  var actionMsg = "";
  var actionKey = action === "cut" ? "X" : "C";
  if (isMac) {
    actionMsg = "Press ⌘-" + actionKey;
  } else {
    actionMsg = "Press Ctrl-" + actionKey;
=======
  }).on('success', function(e) {
    successMessage(e.trigger, 'Copied!');
    e.clearSelection();
  }).on('error', function(e) {
    successMessage(e.trigger, fallbackMessage(e.action));
});

function successMessage(elem, msg) {
  elem.setAttribute('class', 'copied bg-primary-color-dark f6 absolute top-0 right-0 lh-solid hover-bg-primary-color-dark bn white ph3 pv2');
  elem.setAttribute('aria-label', msg);
}

function fallbackMessage(elem, action) {
  var actionMsg = '';
  var actionKey = (action === 'cut' ? 'X' : 'C');
  if (isMac) {
      actionMsg = 'Press ⌘-' + actionKey;
  } else {
      actionMsg = 'Press Ctrl-' + actionKey;
>>>>>>> beta
  }
  return actionMsg;
}

<<<<<<< HEAD
copyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.remove("copy");
    button.classList.add("copied");

    setTimeout(() => {
      button.classList.remove("copied");
      button.classList.add("copy");
    }, 3000);
  });
});
=======


const copyButtons = document.querySelectorAll('.copy')

copyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.remove('copy')
    button.classList.add('copied')
  
    setTimeout(()=> {
    button.classList.remove('copied')
    button.classList.add('copy')
    }, 3000) 
  })
})
>>>>>>> beta

var Clipboard = require("clipboard/dist/clipboard.js");
const copyButtons = document.querySelectorAll(".copy");

new Clipboard(copyButtons, {
  target: function(trigger) {
    if (trigger.classList.contains("copy-toggle")) {
      return trigger.previousElementSibling;
    }
    return trigger.nextElementSibling;
  }
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
  }
  return actionMsg;
}

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

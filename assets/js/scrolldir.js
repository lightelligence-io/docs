var scrollDir = require("scrolldir/dist/scrolldir.auto.min.js");

const footerEl = document.querySelector("footer");
const navEl = document.querySelector('div.order-0 > [role="navigation"]');

let pageHeightOffset = window.innerHeight;

window.addEventListener("scroll", (ev) => {
  let footerElPos = footerEl.getBoundingClientRect().y;
  console.log("scroll");
  if (footerElPos < pageHeightOffset) {
    console.log("asdo");
    navEl.style.height = "calc(90vh - 120px)";
  } else {
    navEl.style.height = "calc(100vh - 120px)";
  }
});

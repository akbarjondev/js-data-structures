import { bind } from "./eventBinder.js";
const button = document.getElementById("button");

let counter = 0;
function handleClick(event) {
  console.log("click", counter++);
}

// button.addEventListener("click", handleClick, {
//   // capture: true,
//   once: true,
//   // passive: false
// });

// console.log(handleClick.toString());

const unbind = bind(button, {
  type: "click",
  listerner: handleClick,
  options: { capture: true },
});

unbind();

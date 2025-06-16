document.getElementById("year").textContent = new Date().getFullYear();
const form = document.querySelector("form");
const formInput = document.querySelectorAll("input");
const playIcon = document.querySelector(".play-icon");

const hourInput = document.querySelector("#hours");
const minuteInput = document.querySelector("#minutes");
const secondsInput = document.querySelector("#seconds");

form.addEventListener("keypress", runEvent);

function runEvent(event) {
  const inputValue = event.target.value;

  if (inputValue !== "") {
    playIcon.style.display = "flex";
  } else {
    playIcon.style.display = "none";
  }

  if (inputValue.length > 3) {
    const newInputArray = inputValue.split("");
    newInputArray.pop();
    const newInputRegulated = newInputArray.join("");
    event.target.value = newInputRegulated;
  }
  hourInput.style.width = inputValue.length > 3 ? "5rem" : "7rem";
}

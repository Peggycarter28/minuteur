const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const playIcon = document.querySelector(".play-icon");
const allInputs = [hoursInput, minutesInput, secondsInput];
const yearText = document.getElementById("year");

yearText.textContent = new Date().getFullYear();

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    const total =
      Number(hoursInput.value) +
      Number(minutesInput.value) +
      Number(secondsInput.value);

    playIcon.style.display = total > 0 ? "flex" : "none";

    if (input.id !== "hours" && Number(input.value) > 59) {
      input.value = 59;
    }

    if (input.value.length > 3) {
      input.value = input.value.slice(0, 3);
    }
  });

  input.addEventListener("blur", () => {
    if (input.value) {
      input.value = input.value.padStart(2, "0");
      if (input.value === "00") input.value = "";
    }
  });
});

playIcon.addEventListener("click", () => {
  let h = parseInt(hoursInput.value) || 0;
  let m = parseInt(minutesInput.value) || 0;
  let s = parseInt(secondsInput.value) || 0;

  let totalSeconds = h * 3600 + m * 60 + s;

  if (totalSeconds <= 0) return;

  allInputs.forEach((input) => {
    input.disabled = true;
  });

  const countdown = setInterval(() => {
    totalSeconds--;

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    hoursInput.value = hrs.toString().padStart(2, "0");
    minutesInput.value = mins.toString().padStart(2, "0");
    secondsInput.value = secs.toString().padStart(2, "0");

    if (totalSeconds <= 0) {
      clearInterval(countdown);

      allInputs.forEach((input) => {
        input.disabled = false;
        input.style.fontWeight = "normal";
      });

      playIcon.style.display = "none";

      const wrapper = document.querySelector(".wrapper-content");
      allInputs.forEach((input) => {
        input.addEventListener("focus", () => {
          wrapper.classList.remove("timeout-shake");
        });
      });
      setTimeout(() => {
        wrapper.classList.add("timeout-shake");
      }, totalSeconds * 1000);
    }
  }, 1000);
});
const reload = document.querySelector(".reload-page");
reload.addEventListener("click", () => {
  location.reload();
});

const totalSteps = 5;
const completeButtons = [...document.querySelectorAll("[data-complete-step]")];
const progressTrack = document.querySelector("#progress-track");
const progressFill = document.querySelector("#progress-fill");
const progressLabel = document.querySelector("#progress-label");
const celebration = document.querySelector("#celebration");

function updateProgress() {
  const completed = completeButtons.filter((button) => button.getAttribute("aria-pressed") === "true").length;

  progressFill.style.transform = `scaleX(${completed / totalSteps})`;
  progressTrack.setAttribute("aria-valuenow", String(completed));
  progressTrack.setAttribute("aria-valuetext", `${completed} из ${totalSteps} шагов`);
  progressLabel.textContent = `${completed} из ${totalSteps} шагов`;
  celebration.hidden = completed !== totalSteps;
}

for (const button of completeButtons) {
  button.addEventListener("click", () => {
    const isComplete = button.getAttribute("aria-pressed") !== "true";
    const step = button.closest(".step");

    button.setAttribute("aria-pressed", String(isComplete));
    button.querySelector("span").textContent = isComplete ? "Выполнено!" : "Шаг сделан";
    step.classList.toggle("is-complete", isComplete);
    updateProgress();
  });
}

const dialog = document.querySelector("#photo-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogCaption = document.querySelector("#dialog-caption");
const dialogClose = document.querySelector("#dialog-close");
let photoTrigger = null;

for (const button of document.querySelectorAll(".photo-button")) {
  button.addEventListener("click", () => {
    photoTrigger = button;
    dialogImage.src = button.dataset.full;
    dialogImage.alt = button.dataset.caption;
    dialogCaption.textContent = button.dataset.caption;

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    dialogClose.focus();
  });
}

dialogClose.addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) return;

  const bounds = dialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
    event.clientY < bounds.top || event.clientY > bounds.bottom;

  if (outside) dialog.close();
});

dialog.addEventListener("close", () => {
  if (photoTrigger) photoTrigger.focus();
});

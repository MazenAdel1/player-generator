let pages = document.querySelectorAll(`.page`),
  nextButtons = document.querySelectorAll(`.next-button`),
  backButtons = document.querySelectorAll(`.back-button`),
  stepsContainer = document.querySelector(`.step-container`),
  stepNumber = document.querySelectorAll(`.step-number`);

let currentIndex = 0;

let playerData = {
  name: "",
  age: "",
  nationality: "",
  height: "",
  weight: "",
  position: "",
};

nextButtons.forEach((el) => {
  el.addEventListener(`click`, (event) => {
    event.preventDefault();
    increaseTheProgressBar();
    goToNextPage();
  });
});

nextButtons[0].onclick = () => {
  for (let i = 0; i < 2; i++) {
    if (document.querySelectorAll(`form input`)[i].value == ``) {
      document.querySelectorAll(`.required-text`)[i].classList.remove(`hidden`);
      document
        .querySelectorAll(`form input`)
        [i].classList.add(`border-red-600`);
      decreaseTheProgressBar();
      goToPerviousPage();
      document.querySelectorAll(`form input`)[i].oninput = () => {
        document.querySelectorAll(`.required-text`)[i].classList.add(`hidden`);
        document
          .querySelectorAll(`form input`)
          [i].classList.remove(`border-red-600`);
      };
    }
  }
};

nextButtons[1].onclick = () => {
  for (let i = 2; i < 8; i++) {
    if (document.querySelectorAll(`form input`)[i].value == ``) {
      document.querySelectorAll(`.required-text`)[i].classList.remove(`hidden`);
      document
        .querySelectorAll(`form input`)
        [i].classList.add(`border-red-600`);

      if (currentIndex > 1) {
        decreaseTheProgressBar();
        goToPerviousPage();
      }
      document.querySelectorAll(`form input`)[i].oninput = () => {
        document.querySelectorAll(`.required-text`)[i].classList.add(`hidden`);
        document
          .querySelectorAll(`form input`)
          [i].classList.remove(`border-red-600`);
      };
    }
  }
  playerData.name = document.querySelectorAll(`form input`)[2].value;
  playerData.age = document.querySelectorAll(`form input`)[3].value;
  playerData.nationality = document.querySelectorAll(`form input`)[4].value;
  playerData.height = document.querySelectorAll(`form input`)[5].value;
  playerData.weight = document.querySelectorAll(`form input`)[6].value;
  playerData.position = document
    .querySelectorAll(`form input`)[7]
    .value.toUpperCase();
};

nextButtons[2].onclick = () => {
  pages[3].children[0].children[0].innerHTML = `
<span>Player name: <span class='text-blue font-bold'>${playerData.name}</span></span>
<span>Player age: <span class='text-blue font-bold'>${playerData.age}</span></span>
<span>Player nationality: <span class='text-blue font-bold'>${playerData.nationality}</span></span>
<span>Player height: <span class='text-blue font-bold'>${playerData.height}</span></span>
<span>Player weight: <span class='text-blue font-bold'>${playerData.weight}</span></span>
<span>Player Position: <span class='text-blue font-bold'>${playerData.position}</span></span>
`;
};

backButtons.forEach((el) => {
  el.addEventListener(`click`, (event) => {
    event.preventDefault();
    decreaseTheProgressBar();
    goToPerviousPage();
  });
});

document.querySelector(`.start-again`).onclick = () => {
  decreaseTheProgressBar();
  goToPerviousPage();
  goToPerviousPage();
  for (let i = 2; i < 8; i++) {
    document.querySelectorAll(`form input`)[i].value = ``;
  }
};

function increaseTheProgressBar() {
  if (currentIndex == 0) stepsContainer.classList.add(`before:w-1/3`);
  if (currentIndex == 1) stepsContainer.classList.add(`before:w-2/3`);
  if (currentIndex == 2) stepsContainer.classList.add(`before:w-full`);

  stepNumber[currentIndex + 1].classList.add(`bg-blue`);
  stepNumber[currentIndex + 1].classList.remove(`border-black`);
  stepNumber[currentIndex + 1].classList.add(`border-blue`);
}

function decreaseTheProgressBar() {
  if (currentIndex == 1) {
    stepsContainer.classList.add(`before:w-0`);
    stepsContainer.classList.remove(`before:w-1/3`);
  }
  if (currentIndex == 2 || currentIndex == 3) {
    if (currentIndex == 3) {
      stepsContainer.classList.remove(`before:w-full`);
    }
    stepsContainer.classList.add(`before:w-1/3`);
    stepsContainer.classList.remove(`before:w-2/3`);
  }

  if (currentIndex > 0) {
    if (currentIndex == 3) {
      stepNumber[currentIndex - 1].classList.remove(`bg-blue`);
      stepNumber[currentIndex - 1].classList.add(`border-black`);
      stepNumber[currentIndex - 1].classList.remove(`border-blue`);
    }
    stepNumber[currentIndex].classList.remove(`bg-blue`);
    stepNumber[currentIndex].classList.add(`border-black`);
    stepNumber[currentIndex].classList.remove(`border-blue`);
  }
}

function goToNextPage() {
  if (currentIndex < 3) {
    pages[currentIndex].classList.remove(`flex`);
    pages[currentIndex].classList.add(`hidden`);
    currentIndex++;
    pages[currentIndex].classList.remove(`hidden`);
    pages[currentIndex].classList.add(`flex`);
  } else {
    pages[currentIndex].classList.remove(`flex`);
    pages[currentIndex].classList.add(`hidden`);
    currentIndex++;
  }
}

function goToPerviousPage() {
  if (currentIndex > 0) {
    pages[currentIndex].classList.remove(`flex`);
    pages[currentIndex].classList.add(`hidden`);
    currentIndex--;
    pages[currentIndex].classList.remove(`hidden`);
    pages[currentIndex].classList.add(`flex`);
  }
}

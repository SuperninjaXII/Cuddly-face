document
  .querySelector(".profile-container")
  .addEventListener("click", function() {
    // Remove any existing effect classes
    this.classList.remove("glitch", "pixelate", "glow");

    // Randomly select one of the effects to apply
    const effects = ["glitch", "pixelate"];
    const effect = effects[Math.floor(Math.random() * effects.length)];
    this.classList.add(effect);

    // Remove the effect after a few seconds (e.g., 3 seconds)
    setTimeout(() => {
      this.classList.remove(effect);
    }, 3000);
  });

//gsap loading animation
const animateLoadingBar = (levelElement, labelElement, level, time) => {

  let Lel = document.querySelector(`${labelElement}`);
  let counter = 0;

  const updateCounter = () => {
    if (counter <= level) {
      counter += 1;
      Lel.innerText = counter;
    } else {
      clearInterval(interval); // Stop the interval when the level is reached
    }
  };

  const interval = setInterval(updateCounter, time);

  gsap.to(levelElement, {

    duration: 6,
    width: `${level * (60 / 100)}svw`,

  })
}

animateLoadingBar("#goLevel", "#goLevelNum", 70, 100);
animateLoadingBar("#js", "#jsLevel", 98, 99)
animateLoadingBar("#py", "#pyLevel", 55, 120)

//mechanics for movement for main menu {
const button = document.getElementById('movableButton');
let isHeld = false;
let holdTimer;
let isMoving = false;
let initialX, initialY;
let buttonX = window.innerWidth / 2 - 25;
let buttonY = window.innerHeight / 2 - 25;

button.style.left = `${buttonX}px`;
button.style.top = `${buttonY}px`;

button.addEventListener('mousedown', startHold);
button.addEventListener('touchstart', startHold);

button.addEventListener('mouseup', endHold);
button.addEventListener('touchend', endHold);

document.addEventListener('mousemove', moveButton);
document.addEventListener('touchmove', moveButton);

function startHold(event) {
  event.preventDefault();
  initialX = event.clientX || event.touches[0].clientX;
  initialY = event.clientY || event.touches[0].clientY;
  holdTimer = setTimeout(() => {
    isHeld = true;
    isMoving = true;
    button.style.cursor = 'grabbing';
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }, 1000);
}

function endHold(event) {
  event.preventDefault();
  clearTimeout(holdTimer);
  if (isMoving) {
    isHeld = false;
    isMoving = false;
    button.style.cursor = 'pointer';
    const deltaX = (event.clientX || event.changedTouches[0].clientX) - initialX;
    const deltaY = (event.clientY || event.changedTouches[0].clientY) - initialY;
    buttonX += deltaX;
    buttonY += deltaY;
    button.style.left = `${buttonX}px`;
    button.style.top = `${buttonY}px`;
  }
}

function moveButton(event) {
  if (!isHeld) return;

  let x, y;
  if (event.touches) {
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
  } else {
    x = event.clientX;
    y = event.clientY;
  }

  const deltaX = x - initialX;
  const deltaY = y - initialY;

  button.style.left = `${buttonX + deltaX}px`;
  button.style.top = `${buttonY + deltaY}px`;
}
//end of movement mechanic }

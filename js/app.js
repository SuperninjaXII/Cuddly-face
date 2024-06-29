gsap.registerPlugin(ScrollTrigger)

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
  gsap.registerPlugin(ScrollTrigger);

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
  gsap.fromTo(".skills-container", { opacity: 0 }, {
    scrollTrigger: '.skills-container',
    duration: 1.2,
    opacity: 1,
  });
}

animateLoadingBar("#goLevel", "#goLevelNum", 70, 100);
animateLoadingBar("#js", "#jsLevel", 98, 99)
animateLoadingBar("#py", "#pyLevel", 55, 120)



/*the feature of the movable btn {*/
// script.js

document.getElementById('movableButton').addEventListener('click', function() {
  document.getElementById('settingsIframe').src = '../components/menu/setting.html'; // Replace with your actual settings file path
  document.getElementById('popup').style.display = 'block';
});

document.getElementById('closePopup').addEventListener('click', function() {
  document.getElementById('popup').style.display = 'none';
  document.getElementById('settingsIframe').src = ''; // Clear iframe source when closing
});

window.onclick = function(event) {
  if (event.target === document.getElementById('popup')) {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('settingsIframe').src = ''; // Clear iframe source when clicking outside
  }
};
//end of movement mechanic }

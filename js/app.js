document 
  .querySelector(".profile-container")
  .addEventListener("click", function () {
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
const animateLoadingBar = (levelElement,labelElement, level,time) => {
  
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
    
    gsap.to(levelElement,{

    duration:6,
    width:`${level/2}svw`,

    })
}

animateLoadingBar("#goLevel","#goLevelNum", 70,100);

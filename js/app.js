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
//
const animateLoadingBar = (element, level) => {
    // Select the element to animate
    let el = document.querySelector(element);
    
    // Check if the element exists
    if (!el) {
        console.error(`Element ${element} not found`);
        return;
    }
    
    // Select the element where the level will be displayed
    let domLevel = document.querySelector(".levelNum");
    
    // Loop to update the level
    for (let i = 0; i < level; i++) {
        domLevel.innerHTML = `${i + 1}`;
    }

    // Animate the element using GSAP
    gsap.to(el, {
        width: `calc(var(--level-container)*(${level}/100))`, 
        background: "#537484",
        duration: 3,
    });
};

// Call the function with the target element and the desired level

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
animateLoadingBar = () => {
  gsap.to(".level", {
    width: "70svw",
    background: "#537484",
    duration: 2,
  });
};
animateLoadingBar();

const $ = (id) => document.getElementById(id);

// //logic for changing profile.pic {
// window.addEventListener('message', (event) => {
//   if (event.data.type === 'updateProfilePic') {
//     const profilePic = $('profile-pic');
//     profilePic.src = event.data.data;
//   }
// });
// //}

/*Popup utility {*/
const Popup = function(btnid, src) {
  $(`${btnid}`).addEventListener('click', function() {
    $('settingsIframe').src = `${src}`;
    $('popup').style.display = 'block';
  });

  $('closePopup').addEventListener('click', function() {
    $('popup').style.display = 'none';
    $('settingsIframe').src = '';
  });

  window.onclick = function(event) {
    if (event.target === $('popup')) {
      $('popup').style.display = 'none';
      $('settingsIframe').src = '';
    }
  };
}
//end of movement mechanic }
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

Popup(`movableButton`, '../components/menu/setting.html')
Popup(`toggleNoteApp`, `../components/Addnote/note.html`)

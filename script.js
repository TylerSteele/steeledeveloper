const talkingGif = document.getElementById("talking-gif");
const idleImage = "assets/talking/idle.png";

const talkingAnimations = {
  introduction: { src: "assets/talking/introduction.gif", duration: 8000 },
  software: { src: "assets/talking/software.gif", duration: 8170 },
  presentations: { src: "assets/talking/presentations.gif", duration: 9500 },
  fun: { src: "assets/talking/fun.gif", duration: 6170 },
  contact: { src: "assets/talking/contact.gif", duration: 2830 },
};

const transitionDelay = 500; // Delay before returning to idle image

document.querySelectorAll(".dialog-options a").forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("href").substring(1);
    const animation = talkingAnimations[targetId];

    if (animation) {
      talkingGif.src = animation.src + "?" + Date.now(); // Force refresh the GIF

      setTimeout(() => {
        talkingGif.src = idleImage;
      }, animation.duration + transitionDelay); // Wait for GIF duration
    }
  });
});

const clickedImage = "assets/talking/clicked.png";
function resetToIdle() {
  talkingGif.src = idleImage;
  if (resetTimeout) {
    clearTimeout(resetTimeout);
    resetTimeout = null;
  }
}

// Function to set clicked state with backup timer
function setClickedState() {
  talkingGif.src = clickedImage;
  // Backup: reset after 5 seconds maximum
  resetTimeout = setTimeout(resetToIdle, 5000);
}

// Mouse events
talkingGif.addEventListener("mousedown", function (e) {
  // Ignore right-clicks
  if (e.button === 0) {
    // Left mouse button only
    setClickedState();
  }
});

talkingGif.addEventListener("mouseup", resetToIdle);
talkingGif.addEventListener("mouseleave", resetToIdle);

// Handle drag prevention
talkingGif.addEventListener("dragstart", function (e) {
  e.preventDefault();
  resetToIdle();
});

// Handle focus loss
window.addEventListener("blur", resetToIdle);

// Touch events
talkingGif.addEventListener("touchstart", function (e) {
  e.preventDefault();
  setClickedState();
});

talkingGif.addEventListener("touchend", function (e) {
  e.preventDefault();
  resetToIdle();
});

talkingGif.addEventListener("touchcancel", resetToIdle);

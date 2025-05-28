// Talking Head animation
const talkingGif = document.getElementById("talking-gif");
const talkingHeadContainer = document.getElementById("talking-head");
const idleImage = "assets/talking/idle.png";

const talkingAnimations = {
  introduction: { src: "assets/talking/introduction.gif", duration: 8000 },
  software: { src: "assets/talking/software.gif", duration: 8170 },
  presentations: { src: "assets/talking/presentations.gif", duration: 9500 },
  fun: { src: "assets/talking/fun.gif", duration: 6170 },
  contact: { src: "assets/talking/contact.gif", duration: 2830 },
};

const transitionDelay = 500; // Delay before returning to idle image

// Store the timeout ID so we can clear it
let currentTimeout = null;

document.querySelectorAll(".dialog-options a").forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("href").substring(1);
    const animation = talkingAnimations[targetId];

    if (animation) {
      // Clear any existing timeout to prevent conflicts
      if (currentTimeout) {
        clearTimeout(currentTimeout);
        currentTimeout = null;
      }

      talkingGif.src = animation.src + "?" + Date.now(); // Force refresh the GIF

      currentTimeout = setTimeout(() => {
        talkingGif.src = idleImage;
        currentTimeout = null;
      }, animation.duration + transitionDelay);
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
  // Backup: reset after 10 seconds maximum
  resetTimeout = setTimeout(resetToIdle, 5000);
}

// Mouse events
talkingHeadContainer.addEventListener("mousedown", function (e) {
  // Ignore right-clicks
  if (e.button === 0) {
    // Left mouse button only
    setClickedState();
  }
});

talkingHeadContainer.addEventListener("mouseup", resetToIdle);
talkingHeadContainer.addEventListener("mouseleave", resetToIdle);

// Handle drag prevention
talkingHeadContainer.addEventListener("dragstart", function (e) {
  e.preventDefault();
  resetToIdle();
});

// Handle focus loss
window.addEventListener("blur", resetToIdle);

// Touch events
talkingHeadContainer.addEventListener("touchstart", function (e) {
  e.preventDefault();
  setClickedState();
});

talkingHeadContainer.addEventListener("touchend", function (e) {
  e.preventDefault();
  resetToIdle();
});

talkingHeadContainer.addEventListener("touchcancel", resetToIdle);

// Color toggle functionality
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("color-toggle");
  const container = document.getElementById("toggle-wrapper");
  const body = document.body;

  function toggleSwitch() {
    const isAmber = body.getAttribute("data-theme") === "amber";
    body.setAttribute("data-theme", isAmber ? "" : "amber");

    toggle.classList.toggle("on");
    toggle.setAttribute("aria-checked", isAmber ? "false" : "true");
    toggle.setAttribute(
      "aria-label",
      isAmber
        ? "Theme toggle: Green mode active"
        : "Theme toggle: Amber mode active"
    );
  }

  function handleKey(event) {
    if (event.key === "Enter" || event.key === " ") {
      toggleSwitch();
    }
  }

  // Add event listeners
  container.addEventListener("click", toggleSwitch);
  container.addEventListener("keydown", handleKey);
});

// Set years
document.addEventListener("DOMContentLoaded", () => {
  // Years worked calculation
  const startDate = new Date("2018-02-01");
  const currentDate = new Date();

  const diffInMilliseconds = currentDate - startDate;
  const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // Account for leap years

  document.getElementById(
    "years-worked-text"
  ).textContent = `I've been working as a software developer professionally for ${Math.floor(
    diffInYears
  )} years.`;

  // Set current year in footer
  const currentYear = new Date().getFullYear();
  const copyrightElement = document.getElementById("copyright-year");

  if (copyrightElement) {
    copyrightElement.textContent = currentYear;
  }
});

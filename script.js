// Talking Head animation variables
const talkingGif = document.getElementById("talking-gif");
const talkingHeadContainer = document.getElementById("talking-head");
const idleImage = "assets/talking/idle.png";
const clickedImage = "assets/talking/clicked.png";

const talkingAnimations = {
  introduction: { src: "assets/talking/introduction.gif", duration: 8000 },
  software: { src: "assets/talking/software.gif", duration: 8170 },
  presentations: { src: "assets/talking/presentations.gif", duration: 9500 },
  fun: { src: "assets/talking/fun.gif", duration: 6170 },
  contact: { src: "assets/talking/contact.gif", duration: 2830 },
};

const transitionDelay = 500;
let currentTimeout = null;
let resetTimeout = null;

// Utility functions
function resetToIdle() {
  talkingGif.src = idleImage;
  if (resetTimeout) {
    clearTimeout(resetTimeout);
    resetTimeout = null;
  }
}

function setClickedState() {
  talkingGif.src = clickedImage;
  resetTimeout = setTimeout(resetToIdle, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
  // === TALKING HEAD NAVIGATION ===
  document.querySelectorAll(".dialog-options a").forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href").substring(1);
      const animation = talkingAnimations[targetId];

      if (animation) {
        if (currentTimeout) {
          clearTimeout(currentTimeout);
          currentTimeout = null;
        }

        talkingGif.src = animation.src + "?" + Date.now();

        currentTimeout = setTimeout(() => {
          talkingGif.src = idleImage;
          currentTimeout = null;
        }, animation.duration + transitionDelay);
      }
    });
  });

  // === TALKING HEAD INTERACTIONS ===
  // Mouse events
  talkingHeadContainer.addEventListener("mousedown", function (e) {
    if (e.button === 0) {
      setClickedState();
    }
  });

  talkingHeadContainer.addEventListener("mouseup", resetToIdle);
  talkingHeadContainer.addEventListener("mouseleave", resetToIdle);
  talkingHeadContainer.addEventListener("dragstart", function (e) {
    e.preventDefault();
    resetToIdle();
  });

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

  // === COLOR TOGGLE ===
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

  container.addEventListener("click", toggleSwitch);
  container.addEventListener("keydown", handleKey);

  // === DYNAMIC CONTENT ===
  // Years worked calculation
  const startDate = new Date("2018-02-01");
  const currentDate = new Date();
  const diffInMilliseconds = currentDate - startDate;
  const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

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

  // === NAVIGATION LINK TRACKING ===
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      this.classList.add("clicked");
    });
  });
});

// Global event listeners that don't need DOM to be ready
window.addEventListener("blur", resetToIdle);

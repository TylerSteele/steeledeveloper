import idleGif1Url from "./assets/talking/idle.gif";
import idleGif2Url from "./assets/talking/idle-alt.gif";
import idleGif3Url from "./assets/talking/idle-alt.gif";
import clickedGifUrl from "./assets/talking/clicked.gif";
import introGifUrl from "./assets/talking/introduction.gif";
import softwareGifUrl from "./assets/talking/software.gif";
import workshopsGifUrl from "./assets/talking/workshops.gif";
import funGifUrl from "./assets/talking/fun.gif";
import contactGifUrl from "./assets/talking/contact.gif";

// Talking Head animation variables
const talkingGif = document.getElementById("talking-gif");
const talkingHeadContainer = document.getElementById("talking-head");

const talkingAnimations = {
  introduction: { src: introGifUrl, duration: 8000 },
  software: { src: softwareGifUrl, duration: 8170 },
  workshops: { src: workshopsGifUrl, duration: 9500 },
  fun: { src: funGifUrl, duration: 6170 },
  contact: { src: contactGifUrl, duration: 2830 },
};

const idleAnimations = [idleGif1Url, idleGif2Url, idleGif3Url];

function getRandomIdleGif() {
  const index = Math.floor(Math.random() * idleAnimations.length);
  return idleAnimations[index];
}

const transitionDelay = 500;
let currentTimeout = null;
let resetTimeout = null;

// Utility functions
function resetToIdle() {
  talkingGif.src = getRandomIdleGif();
  if (resetTimeout) {
    clearTimeout(resetTimeout);
    resetTimeout = null;
  }
}

function setClickedState() {
  talkingGif.src = clickedGifUrl;
  resetTimeout = setTimeout(resetToIdle, 10000);
}

// Single DOMContentLoaded event listener
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

        // Add transition class for animation effects
        talkingHeadContainer.classList.add("gif-transition");

        // Small delay to allow transition effects to show before changing GIF
        setTimeout(() => {
          talkingGif.src = animation.src + "?" + Date.now();
        }, 100);

        currentTimeout = setTimeout(() => {
          talkingGif.src = idleImage;
          // Remove transition class after animation completes
          talkingHeadContainer.classList.remove("gif-transition");
          currentTimeout = null;
        }, animation.duration + transitionDelay);

        // Remove transition class after initial effect
        setTimeout(() => {
          talkingHeadContainer.classList.remove("gif-transition");
        }, 800);
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
  document.querySelectorAll(".dialog-options li a").forEach((link) => {
    link.addEventListener("click", function () {
      this.classList.add("clicked");
    });
  });
  // === QUOTE ANIMATION ===
  let currentQuote = 0;
  const quoteRoll = document.querySelector(".quote-roll");

  if (quoteRoll) {
    setInterval(() => {
      currentQuote = (currentQuote + 1) % 3;
      quoteRoll.className = `quote-roll slide-${currentQuote}`;
    }, 7000);
  }

  // === SCROLL INDICATOR ===
  function checkScrollbarVisibility() {
    const indicator = document.querySelector(".scroll-indicator");
    if (!indicator) return;

    // Check if content is scrollable
    const hasVerticalScrollbar =
      document.documentElement.scrollHeight > window.innerHeight;

    // Check if scrollbar is actually visible (not hidden by browser/mobile)
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const scrollbarVisible = scrollbarWidth > 0;

    // Check if we're near the bottom
    const scrolled = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const nearBottom = scrolled + windowHeight >= documentHeight - 100;

    // Show indicator if content is scrollable, scrollbar is NOT visible, and not near bottom
    if (hasVerticalScrollbar && !scrollbarVisible && !nearBottom) {
      indicator.classList.add("show");
    } else {
      indicator.classList.remove("show");
    }
  }

  // Check on load and resize
  window.addEventListener("load", checkScrollbarVisibility);
  window.addEventListener("resize", checkScrollbarVisibility);
  window.addEventListener("scroll", checkScrollbarVisibility);

  // Also check when content changes (like when sections are shown)
  document.querySelectorAll(".dialog-options a").forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(checkScrollbarVisibility, 100); // Small delay for content to show
    });
  });

  // === DIALOG SCROLL EFFECT ===
  const dialogOptions = document.querySelector(".dialog-options");
  const dialog = document.querySelector(".dialog");

  if (dialogOptions && dialog) {
    function checkDialogScroll() {
      const isScrolledToBottom =
        dialogOptions.scrollTop + dialogOptions.clientHeight >=
        dialogOptions.scrollHeight - 2;

      if (isScrolledToBottom) {
        dialog.classList.add("scrolled-to-bottom");
      } else {
        dialog.classList.remove("scrolled-to-bottom");
      }
    }

    dialogOptions.addEventListener("scroll", checkDialogScroll);
    checkDialogScroll();
  }
});

// Global event listeners that don't need DOM to be ready
window.addEventListener("blur", resetToIdle);

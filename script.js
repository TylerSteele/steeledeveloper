const gif = document.getElementById("talking-gif");
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
      gif.src = animation.src + "?" + Date.now(); // Force refresh the GIF

      setTimeout(() => {
        gif.src = idleImage;
      }, animation.duration + transitionDelay); // Wait for GIF duration
    }
  });
});

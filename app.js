document.addEventListener("DOMContentLoaded", function () {
  const home = document.getElementById("home-div");
  const cybersecurity = document.getElementById("cybersecurity-div");
  const citylights = document.getElementById("city-lights-div");
  const window = document.getElementById("window-div");
  const face = document.getElementById("face-div");
  const cctv = document.getElementById("cctv-div");

  const cyberTrigger = document.getElementById("cyber-trigger");
  const lightsTrigger = document.getElementById("lights-trigger");
  const windowTrigger = document.getElementById("window-trigger");
  const selfieTrigger = document.getElementById("selfie-trigger");
  const cctvTrigger = document.getElementById("cctv-trigger");

  let currentPage = home;
  let previousPageStack = [];
  let previousPage;

  const back = document.getElementById("back");
  const cs = document.getElementById("cs");
  const bio = document.getElementById("bio");
  const music = document.getElementById("music");

  const csImg = document.getElementById("computer-icon-img");
  const bioImg = document.getElementById("bio-icon-img");
  const musicImg = document.getElementById("music-icon-img");

  const iconImgs = [csImg, bioImg, musicImg];

  const cctvTextContainer = document.getElementById("cctv-textcontainer");
  const cctvTextbox = document.getElementById("cctv-textbox");
  const cctvText = document.getElementById("cctv-text");

  const faceTextContainer = document.getElementById("face-textcontainer");
  const faceTextbox = document.getElementById("face-textbox");
  const faceText = document.getElementById("face-text");

  const lightsTextContainer = document.getElementById("lights-textcontainer");
  const lightsTextbox = document.getElementById("lights-textbox");
  const lightsText = document.getElementById("lights-text");

  let textIDX;
  const textAlert = document.getElementById("text-alert-sound");
  textAlert.volume = 0.2;

  const textAudio = document.getElementById("next-text-sound");
  textAudio.volume = 0.1;

  let txtDelay = 1500;

  //back
  back.addEventListener("click", function () {
    if (previousPageStack.length === 0) {
      previousPageStack.push(home);
    }
    previousPage = previousPageStack.pop();
    GoToPage(currentPage, previousPage);
    currentPage = previousPage;
    CleanupTextContainers([
      cctvTextContainer,
      faceTextContainer,
      lightsTextContainer,
    ]);
    removeAllCharacters();
    clearIcons(iconImgs);
  });

  //computer
  cs.addEventListener("click", function () {
    previousPageStack = [home];
    GoToPage(currentPage, citylights);
    currentPage = citylights;
    CleanupTextContainers([
      cctvTextContainer,
      faceTextContainer,
      lightsTextContainer,
    ]);
    removeAllCharacters();
    clearIcons(iconImgs);
    csImg.classList.add("selectedIcon");

    setTimeout(() => {
      textIDX = 0;
      lightsTextContainer.classList.remove("hide");
      textAlert.play();
      textboxHandler("computer", lightsText, textIDX, lightsTextContainer);
      textIDX += 1;
    }, txtDelay);
  });

  //bio
  bio.addEventListener("click", function () {
    previousPageStack = [home, window];
    GoToPage(currentPage, face);
    currentPage = face;
    CleanupTextContainers([
      cctvTextContainer,
      faceTextContainer,
      lightsTextContainer,
    ]);
    removeAllCharacters();
    clearIcons(iconImgs);
    bioImg.classList.add("selectedIcon");

    setTimeout(() => {
      textIDX = 0;
      faceTextContainer.classList.remove("hide");
      textAlert.play();
      textboxHandler("about", faceText, textIDX, faceTextContainer);
      textIDX += 1;
    }, txtDelay);
  });

  //music
  music.addEventListener("click", function () {
    previousPageStack = [home, cybersecurity];
    GoToPage(currentPage, cctv);
    currentPage = cctv;
    CleanupTextContainers([
      cctvTextContainer,
      faceTextContainer,
      lightsTextContainer,
    ]);
    removeAllCharacters();
    clearIcons(iconImgs);
    musicImg.classList.add("selectedIcon");

    setTimeout(() => {
      textIDX = 0;
      cctvTextContainer.classList.remove("hide");
      textAlert.play();
      textboxHandler("music", cctvText, textIDX, cctvTextContainer);
      textIDX += 1;
    }, txtDelay);
  });

  //cybersecurity
  cyberTrigger.addEventListener("click", function () {
    GoToPage(home, cybersecurity);
    currentPage = cybersecurity;
    previousPageStack.push(home);
  });

  //city lights
  lightsTrigger.addEventListener("click", function () {
    GoToPage(home, citylights);
    currentPage = citylights;
    previousPageStack.push(home);
    csImg.classList.add("selectedIcon");

    setTimeout(() => {
      textIDX = 0;
      lightsTextContainer.classList.remove("hide");
      textAlert.play();
      textboxHandler("computer", lightsText, textIDX, lightsTextContainer);
      textIDX += 1;
    }, txtDelay);
  });

  //window
  windowTrigger.addEventListener("click", function () {
    GoToPage(home, window);
    currentPage = window;
    previousPageStack.push(home);
  });

  //me
  selfieTrigger.addEventListener("click", function () {
    GoToPage(window, face);
    currentPage = face;
    previousPageStack.push(window);
    bioImg.classList.add("selectedIcon");

    setTimeout(() => {
      textIDX = 0;
      faceTextContainer.classList.remove("hide");
      textAlert.play();
      textboxHandler("about", faceText, textIDX, faceTextContainer);
      textIDX += 1;
    }, txtDelay);
  });

  //cctv
  cctvTrigger.addEventListener("click", function () {
    GoToPage(cybersecurity, cctv);
    currentPage = cctv;
    previousPageStack.push(cybersecurity);
    musicImg.classList.add("selectedIcon");

    setTimeout(() => {
      textIDX = 0;
      cctvTextContainer.classList.remove("hide");
      textAlert.play();
      textboxHandler("music", cctvText, textIDX, cctvTextContainer);
      textIDX += 1;
    }, txtDelay);
  });

  cctvTextbox.addEventListener("click", function (event) {
    if (event.target.tagName.toLowerCase() !== "a") {
      textAudio.play();
      removeAllCharacters();
      textboxHandler("music", cctvText, textIDX, cctvTextContainer);
      textIDX += 1;
    }
    event.stopPropagation();
  });

  faceTextbox.addEventListener("click", function (event) {
    if (event.target.tagName.toLowerCase() !== "a") {
      textAudio.play();
      removeAllCharacters();
      textboxHandler("about", faceText, textIDX, faceTextContainer);
      textIDX += 1;
    }
    event.stopPropagation();
  });

  lightsTextbox.addEventListener("click", function (event) {
    if (event.target.tagName.toLowerCase() !== "a") {
      textAudio.play();
      removeAllCharacters();
      textboxHandler("computer", lightsText, textIDX, lightsTextContainer);
      textIDX += 1;
    }
    event.stopPropagation();
  });
});

function FadeIn(newImg) {
  opacity = 0;
  function fade() {
    if (opacity < 1) {
      opacity += 0.05;
      newImg.style.opacity = opacity;
      setTimeout(fade, 15);
    }
  }
  fade();
}

function FadeOut(newImg) {
  opacity = 1;
  function fade() {
    if (opacity > 0) {
      opacity -= 0.05;
      newImg.style.opacity = opacity;
      setTimeout(fade, 15);
    }
  }
  fade();
}

function GoToPage(currentPage, destinationPage) {
  FadeOut(currentPage);
  setTimeout(() => {
    currentPage.classList.add("hide");
    destinationPage.classList.remove("hide");
    FadeIn(destinationPage);
  }, 500);
}

function clearIcons(icons) {
  icons.forEach((element) => {
    if (element.classList.contains("selectedIcon")) {
      element.classList.remove("selectedIcon");
    }
  });
}

function CleanupTextContainers(container) {
  container.forEach((element) => {
    if (!element.classList.contains("hide")) {
      element.classList.add("hide");
    }
  });
}

function revealOneCharacter(list) {
  let next = list.splice(0, 1)[0];
  next.span.classList.add("revealed");
  next.classes.forEach((c) => {
    next.span.classList.add(c);
  });

  let delay = next.isSpace ? 0 : next.delayAfter;

  if (list.length > 0) {
    setTimeout(function () {
      revealOneCharacter(list);
    }, delay);
  }
}

function removeAllCharacters() {
  let oldText = document.querySelectorAll(".removeOnExit");
  oldText.forEach((element) => {
    element.remove();
  });
}

function textboxHandler(page, textbox, index, container) {
  const speeds = {
    pause: 300,
    slow: 70,
    normal: 30,
    fast: 15,
  };
  let textLines;

  switch (page) {
    case "music":
      textLines = [
        [
          { string: "FAINTSTT: pssst... ", speed: speeds.slow },
          { string: "Hey!{", speed: speeds.normal },
          { string: "It's still actually me...{", speed: speeds.slow },
          {
            string:
              "I make music though! If you're interested in that sort of thing :)",
            speed: speeds.normal,
          },
        ],
        [
          {
            string:
              "I write stuff that I like -- I wish I could describe it better",
            speed: speeds.normal,
          },
          { string: "...", speed: speeds.pause },
          {
            string: "but if words did the trick, music wouldn't have sounds.{",
            speed: speeds.normal,
          },
          { string: "~Better to be beautiful than good~", speed: speeds.slow },
        ],
        [
          { string: "Find me on ", speed: speeds.normal },
          {
            string: "Spotify",
            speed: speeds.normal,
            classes: ["green"],
            link: "https://open.spotify.com/artist/52TGqMiRRL0hADN0JVdAGW?si=xKDh8szIRKOAtJQ060p-Tg",
          },
          { string: ", ", speed: speeds.normal },
          {
            string: "Apple",
            speed: speeds.normal,
            classes: ["pink"],
            link: "https://music.apple.com/us/artist/faintstt/1670272276",
          },
          { string: ", or ", speed: speeds.normal },
          {
            string: "Soundcloud",
            speed: speeds.normal,
            classes: ["orange"],
            link: "https://soundcloud.com/faintstt",
          },
          { string: ', as "faintstt"!{', speed: speeds.slow },
          { string: "I also put song breakdowns on ", speed: speeds.normal },
          {
            string: "YouTube",
            speed: speeds.normal,
            classes: ["red"],
            link: "https://www.youtube.com/@faintstt",
          },
          { string: "!{Thanks sm <3", speed: speeds.slow },
        ],
      ];
      break;
    case "about":
      textLines = [
        [
          {
            string: "MIKA: I hope you're enjoying your time here! ",
            speed: speeds.normal,
          },
          {
            string:
              "I made this dimension with vanilla html/css/js, and a small bit of artistic taste...",
            speed: speeds.normal,
          },
        ],
        [
          {
            string: "Huge shoutout to 8485+beyondthecrag for their ",
            speed: speeds.normal,
          },
          {
            string: "inspiration/platonic ideal",
            speed: speeds.slow,
            classes: ["blue"],
            link: "https://personalprotocol.net/",
          },
          { string: ", and huge shoutout to ", speed: speeds.normal },
          {
            string: "Matin",
            speed: speeds.slow,
            classes: ["red"],
            link: "https://matinsarahi.com/",
          },
          {
            string: " for putting up with my late night debugging lifelines",
            speed: speeds.normal,
          },
        ],
        [
          {
            string:
              "To any and all site participants, I'm thankful you're here",
            speed: speeds.normal,
          },
          { string: "...", speed: speeds.pause },
          {
            string: "Look around, explore, maximize your clicking, ",
            speed: speeds.slow,
          },
          {
            string: "and I hope to hear from you again soon!",
            speed: speeds.normal,
          },
        ],
      ];
      break;
    case "computer":
      textLines = [
        [
          { string: "MIKA: Hey!{", speed: speeds.normal },
          { string: "...{", speed: speeds.pause },
          {
            string:
              "I really do appreciate you taking the time to get to know me",
            speed: speeds.normal,
          },
        ],
        [
          {
            string: "I love creating things and solving problems. ",
            speed: speeds.normal,
          },
          { string: '"Code" ', speed: speeds.slow },
          {
            string:
              "is the best collection of incantations and magic words that I've found to serve these ambitions. ",
            speed: speeds.normal,
          },
        ],
        [
          { string: "Most of all, I love learning. ", speed: speeds.fast },
          {
            string:
              "I'm really excited to contribute and learn at a cool tech company with cool people --",
            speed: speeds.normal,
          },
          {
            string: "if you know any places like that, please let me know :)",
            speed: speeds.slow,
          },
        ],
        [
          { string: "I don't mean to ramble", speed: speeds.slow },
          { string: "...", speed: speeds.pause },
          {
            string:
              "if you want to get to know me more efficiently, you can always read my ",
            speed: speeds.normal,
          },
          {
            string: "resume",
            speed: speeds.slow,
            classes: ["red"],
            link: "https://drive.google.com/file/d/16SqKb54WzvVk4EtCzEWs8U2GWBTVVqjd/view?usp=sharing",
          },
          {
            string: ". Thank you again for spending your time with me!!",
            speed: speeds.normal,
          },
        ],
      ];
      break;
    default:
      textLines = [
        [
          { string: "MIKA: Something's wrong", speed: speeds.slow },
          { string: "...{", speed: speeds.pause },
          { string: "Try reloading the page please", speed: speeds.normal },
        ],
      ];
  }

  if (index > textLines.length - 1) {
    removeAllCharacters();
    CleanupTextContainers([container]);
  } else {
    let characters = [];
    textLines[index].forEach((line) => {
      line.string.split("").forEach((character) => {
        if (character === "{") {
          let linebreak = document.createElement("br");
          linebreak.classList.add("removeOnExit");
          textbox.appendChild(linebreak);
        } else {
          let span = document.createElement("span");
          if (line.link) {
            let a = document.createElement("a");
            a.href = line.link;
            a.textContent = character;
            a.target = "_blank";

            if (line.classes) {
              line.classes.forEach((c) => {
                a.classList.add(c);
              });
            }

            span.appendChild(a);
          } else {
            span.textContent = character;
          }
          span.classList.add("removeOnExit");
          textbox.appendChild(span);
          characters.push({
            span: span,
            isSpace: character === " ",
            delayAfter: line.speed,
            classes: line.classes || [],
          });
        }
      });
    });
    revealOneCharacter(characters);
  }
}

const clickAudio = document.getElementById("hover-sound");
const highlightElements = document.querySelectorAll(".click");

highlightElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    clickAudio.play();
  });
});

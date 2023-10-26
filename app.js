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

    //back
    back.addEventListener("click", function() {
        if (previousPageStack.length === 0) {previousPageStack.push(home)}
        previousPage = previousPageStack.pop();
        GoToPage(currentPage, previousPage);
        currentPage = previousPage;
    })

    //computer
    cs.addEventListener("click", function() {
        previousPageStack = [home]
        GoToPage(currentPage, citylights);
        currentPage = citylights;
    })

    //bio
    bio.addEventListener("click", function() {
        previousPageStack = [home, window]
        GoToPage(currentPage, face);
        currentPage = face;
    })

    //music
    music.addEventListener("click", function() {
        previousPageStack = [home, cybersecurity]
        GoToPage(currentPage, cctv);
        currentPage = cctv;
    })

    //cybersecurity
    cyberTrigger.addEventListener("click", function () {
        GoToPage(home,cybersecurity);
        currentPage = cybersecurity;
        previousPageStack.push(home);
    });

    //city lights
    lightsTrigger.addEventListener("click", function () {
        GoToPage(home,citylights);
        currentPage = citylights;
        previousPageStack.push(home);
    });

    //window
    windowTrigger.addEventListener("click", function () {
        GoToPage(home,window);
        currentPage = window;
        previousPageStack.push(home);
    });

    //me
    selfieTrigger.addEventListener("click", function () {
        GoToPage(window,face);
        currentPage = face;
        previousPageStack.push(window);
    });

    //cctv
    cctvTrigger.addEventListener("click", function () {
        GoToPage(cybersecurity,cctv);
        currentPage = cctv;
        previousPageStack.push(cybersecurity);
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

function GoToPage(currentPage, destinationPage){
    FadeOut(currentPage);
    setTimeout(() => {
        currentPage.classList.add("hide")
        destinationPage.classList.remove("hide")
        FadeIn(destinationPage)
    }, 500);
}

const audio = document.getElementById("hover-sound");
const highlightElements = document.querySelectorAll(".click");

highlightElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
        audio.play();
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const home = document.getElementById("home");
    const cybersecurity = document.getElementById("cybersecurity");
    const citylights = document.getElementById("city-lights");
    const window = document.getElementById("window");

    const cyberTrigger = document.getElementById("cyber-trigger");
    const lightsTrigger = document.getElementById("lights-trigger");
    const windowTrigger = document.getElementById("window-trigger");

    let currentPage = home;
    let previousPageStack = [];
    let previousPage;

    const back = document.getElementById("back");

    //back
    back.addEventListener("click", function() {
        if (previousPageStack.length === 0) {previousPageStack.push(home)}
        previousPage = previousPageStack.pop();
        console.log(previousPage);
        GoToPage(currentPage, previousPage);
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

function GoToPage(currentPage, destinationPage){
    //fade current
    currentPage.classList.remove("fade-in")
    currentPage.classList.add("fade-out");

    setTimeout(() => {
        currentPage.classList.add("hide")
        destinationPage.classList.remove("hide")
        destinationPage.classList.add("show")
        FadeIn(destinationPage)
    }, 400);

}

const audio = document.getElementById("hover-sound");
const highlightElements = document.querySelectorAll(".click");

highlightElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
        audio.play();
    });
});


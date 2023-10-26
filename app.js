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

    const cctvTextContainer = document.getElementById("cctv-textcontainer");
    const cctvText = document.getElementById("cctv-text");

    //back
    back.addEventListener("click", function() {
        if (previousPageStack.length === 0) {previousPageStack.push(home)}
        previousPage = previousPageStack.pop();
        GoToPage(currentPage, previousPage);
        currentPage = previousPage;
        CleanupTextBoxes([cctvTextContainer]);
        removeAllCharacters();
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

        setTimeout(() => {
            cctvTextContainer.classList.remove("hide");
            textboxHandler("cctv", cctvText);
        }, 1500);
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

function CleanupTextBoxes(textboxes){
    textboxes.forEach((element) => {
        if (!element.classList.contains("hide"))
            {element.classList.add("hide")}
    });
}

function revealOneCharacter(list){
    let next = list.splice(0, 1)[0];
    next.span.classList.add("revealed");

    let delay = next.isSpace ? 0 : next.delayAfter;

    if (list.length>0) {
        setTimeout(function(){
            revealOneCharacter(list);
        }, delay)
    }
}

function removeAllCharacters(){
    let oldText = document.querySelectorAll(".removeOnExit");
    oldText.forEach((element) => {
        element.remove();
    })
}

function textboxHandler(page, textbox){
    const speeds = {
        pause: 200,
        slow: 80,
        normal: 50,
        fast: 20
    }

    if (page === "cctv"){
        console.log("dsafsafdsfda");
        const cctvTextLines = [
            {string: "MIKA: Hey!", speed: speeds.normal},
            {string: "test tes tsetesttse set", speed: speeds.normal},
            {string: "line3line3 dfsafahkb", speed: speeds.slow},
            {string: "line3line3 dfsfsfassaasafahkb", speed: speeds.fast},
        ]
        
        let cctvCharacters = [];
        cctvTextLines.forEach((line, index) => {
    
            if (index !== 0 && index < cctvTextLines.length-1){
                let linebreak = document.createElement("br");
                linebreak.classList.add("removeOnExit")
                textbox.appendChild(linebreak);
            }
        
            line.string.split("").forEach(character =>{
                let span = document.createElement("span");
                span.textContent = character;
                span.classList.add("removeOnExit");
                textbox.appendChild(span);
                cctvCharacters.push({
                    span: span,
                    isSpace: character === " ",
                    delayAfter: line.speed,
                    classes: line.classes || []
                })
            })
        })
        revealOneCharacter(cctvCharacters);

    }
}

const audio = document.getElementById("hover-sound");
const highlightElements = document.querySelectorAll(".click");

highlightElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
        audio.play();
    });
});

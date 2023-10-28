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
    const cctvTextbox = document.getElementById("cctv-textbox");
    const cctvText = document.getElementById("cctv-text");

    let textIDX;
    const textAlert = document.getElementById("text-alert-sound");
    textAlert.volume = 0.2;

    //back
    back.addEventListener("click", function() {
        if (previousPageStack.length === 0) {previousPageStack.push(home)}
        previousPage = previousPageStack.pop();
        GoToPage(currentPage, previousPage);
        currentPage = previousPage;
        CleanupTextContainers([cctvTextContainer]);
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
            textIDX = 0;
            cctvTextContainer.classList.remove("hide");
            textAlert.play();
            textboxHandler("music", cctvText, textIDX, cctvTextContainer);
            textIDX += 1;
        }, 1500);
    });

    const textAudio = document.getElementById("next-text-sound");
    textAudio.volume = 0.1;

    cctvTextbox.addEventListener("click", function(event) {
        if (event.target.tagName.toLowerCase() !== 'a') {
            textAudio.play();
            removeAllCharacters();
            textboxHandler("music", cctvText, textIDX, cctvTextContainer);
            textIDX += 1;}
        event.stopPropagation();
    })
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

function CleanupTextContainers(container){
    container.forEach((element) => {
        if (!element.classList.contains("hide"))
            {element.classList.add("hide")}
    });
}

function revealOneCharacter(list){
    let next = list.splice(0, 1)[0];
    next.span.classList.add("revealed");
    next.classes.forEach((c) => {
        next.span.classList.add(c);
    })

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

function textboxHandler(page, textbox, index, container){
    const speeds = {
        pause: 700,
        slow: 90,
        normal: 40,
        fast: 10
    }
    let textLines;

    switch(page){
        case "music":
            textLines = [
                [
                    {string: "MIKA: Hey!{", speed: speeds.normal},
                    {string: "test tes tsetesttse set{", speed: speeds.normal},
                    {string: "line3line3 dfsafahkb", speed: speeds.slow},
                    {string: "line3line3", speed: speeds.fast, classes: ["red"], link: "https://personalprotocol.net/"},
                    {string: "...", speed: speeds.pause}
                ],
                [
                    {string: "number2{", speed: speeds.normal},
                    {string: "tasdhbadsbhfdabktse set{", speed: speeds.normal},
                    {string: "line3safdjkbfahkb", speed: speeds.slow},
                    {string: "line3fsdabhje3", speed: speeds.fast},
                    {string: "...", speed: speeds.pause}
                ]];
                break;
        case "about":
            textLines = [
                [
                    {string: "MIKA: Hey!{", speed: speeds.normal},
                    {string: "test tes tsetesttse set{", speed: speeds.normal},
                    {string: "line3line3 dfsafahkb", speed: speeds.slow},
                    {string: "line3line3", speed: speeds.fast},
                    {string: "...", speed: speeds.pause}
                ],
                [
                    {string: "number2{", speed: speeds.normal},
                    {string: "tasdhbadsbhfdabktse set{", speed: speeds.normal},
                    {string: "line3safdjkbfahkb", speed: speeds.slow},
                    {string: "line3fsdabhje3", speed: speeds.fast},
                    {string: "...", speed: speeds.pause}
                ]]
                break;
        case "computer":
            textLines = [
                [
                    {string: "MIKA: Hey!{", speed: speeds.normal},
                    {string: "test tes tsetesttse set{", speed: speeds.normal},
                    {string: "line3line3 dfsafahkb", speed: speeds.slow},
                    {string: "line3line3", speed: speeds.fast},
                    {string: "...", speed: speeds.pause}
                ],
                [
                    {string: "number2{", speed: speeds.normal},
                    {string: "tasdhbadsbhfdabktse set{", speed: speeds.normal},
                    {string: "line3safdjkbfahkb", speed: speeds.slow},
                    {string: "line3fsdabhje3", speed: speeds.fast},
                    {string: "...", speed: speeds.pause}
                ]]
                break;
        default:
            textLines = [
                [
                    {string: "MIKA: Something's wrong", speed: speeds.slow},
                    {string: "...{", speed: speeds.pause},
                    {string: "Try reloading the page please", speed: speeds.normal}
                ]]
        }
        
    if (index > textLines.length - 1){
        removeAllCharacters();
        CleanupTextContainers([container]);
    }
        
    else{
        let characters = [];
        textLines[index].forEach(line => {
    
            line.string.split("").forEach(character =>{
                if (character === "{"){
                    let linebreak = document.createElement("br");
                    linebreak.classList.add("removeOnExit")
                    textbox.appendChild(linebreak);
                }
                else{
                    let span = document.createElement("span");
                    if (line.link) {
                        let a = document.createElement("a");
                        a.href = line.link;
                        a.textContent = character;
                        a.target = "_blank"
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
                        classes: line.classes || []
                    })
                }
            })
        })
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
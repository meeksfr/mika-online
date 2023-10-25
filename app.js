document.addEventListener("DOMContentLoaded", function () {
    // Get references to the two SVG images
    const mainImage = document.getElementById("main-image");
    const secondImage = document.getElementById("second-image");
    const switchTrigger = document.getElementById("switch-trigger");

    // Add a click event listener to the trigger area
    switchTrigger.addEventListener("click", function () {
        // Toggle fade-in and fade-out classes
        mainImage.classList.remove("fade-in")
        mainImage.classList.add("fade-out");

        // Delay showing the second image
        setTimeout(() => {
            mainImage.classList.add("hide")
            secondImage.classList.remove("hide")
            secondImage.classList.add("show")
            
            MyFadeFunction(0)
        }, 400); // Adjust the delay to match the transition duration
    });
});

function MyFadeFunction(opacity) {
    function fade() {
        if (opacity < 1) {
            opacity += 0.05;
            document.getElementById('second-image').style.opacity = opacity;
            setTimeout(fade, 15);
        }
    }
    fade();
}


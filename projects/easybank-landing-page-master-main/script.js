const hamburger = document.getElementById("menu-toggle");
const nav = document.querySelector(".header-navbar");

hamburger.addEventListener("click", showMenu);

function showMenu() {
    nav.classList.toggle("active");

    // Change the toggle icon ☰ → ✕
    if (nav.classList.contains("active")) {
        hamburger.textContent = "✕";
    } else {
        hamburger.textContent = "☰";
    }
}



// document.addEventListener("DOMContentLoaded", () => {
//     const hamburger = document.getElementById("menu-toggle");
//     const nav = document.querySelector(".header-navbar");

//     toggle.addEventListener("click", () => {
//         nav.classList.toggle("active");

//         // Change the toggle icon ☰ → ✕
//         if (nav.classList.contains("active")) {
//             hamburger.textContent = "✕";
//         } else {
//             hamburger.textContent = "☰";
//         }
//     });
// });


/* TOAST TO FLOAT ON MY SITE WHEN I CLICK */
const buttons = document.querySelectorAll("button");
const toast = document.getElementById("toast");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", btnClicked);
}

function btnClicked() {
    toast.classList.remove("hidden");
    toast.classList.add("show");

    // Hide toast after 3 seconds
    setTimeout(function () {
        toast.classList.add("hidden");
        toast.classList.remove("show");
    }, 3000);
}


const links = document.querySelectorAll(".my-link");

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", linksScrow);
}

// function linksScrow(event) {
//         event.preventDefault(); // Stop the default instant jump

//     // Get the href of the clicked link, e.g., "#section1"
//     const targetId = this.getAttribute("#");

//     // Find the element on the page that has this ID
//     const targetElement = document.querySelector(targetId);

//     // Scroll smoothly to that element
//     targetElement.scrollIntoView({
//         behavior: "smooth", // Makes scroll smooth
//         block: "start"      // Align element to top of the screen
//     });
// }
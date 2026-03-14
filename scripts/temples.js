const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");

    if (navMenu.classList.contains("open")) {
        menuButton.textContent = "X";
        menuButton.setAttribute("aria-expanded", "true");
    } else {
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
    }
});

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;
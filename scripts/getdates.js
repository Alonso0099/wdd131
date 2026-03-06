const yearSpan = document.querySelector("#currentYear");
yearSpan.textContent = new Date().getFullYear();

const lastMod = document.querySelector("#lastModified");
lastMod.textContent = `Last Modification: ${document.lastModified}`;
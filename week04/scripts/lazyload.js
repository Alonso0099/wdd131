const year = document.querySelector("#currentYear");
year.textContent = new Date().getFullYear();


const lastMod =document.querySelector("#lastModified");
lastMod.textContent = `Last Modified: ${document.lastModified}`;